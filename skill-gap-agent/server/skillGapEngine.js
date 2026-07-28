import { COMPANY_REQUIREMENTS, ROLE_REQUIREMENTS } from './knowledgeBase.js';

/**
 * Normalizes strings for loose case-insensitive matching
 */
function normalize(str) {
  if (!str) return '';
  return str.toString().toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

/**
 * Checks if a candidate skill set matches a required target item
 */
function isMatch(userSkillList, requiredItem) {
  const normRequired = normalize(requiredItem);
  return userSkillList.some(userSkill => {
    const normUser = normalize(userSkill);
    return normUser === normRequired || normUser.includes(normRequired) || normRequired.includes(normUser);
  });
}

/**
 * Core Skill Gap Engine
 */
export function analyzeSkillGap(input) {
  const profile = input?.profile || {};
  const targetCompanyInput = input?.target_company || null;
  const targetRoleInput = input?.target_role || null;

  // Resolve target requirements
  let targetName = '';
  let targetType = ''; // 'company' or 'role'
  let targetSpec = null;

  if (targetCompanyInput) {
    targetType = 'company';
    const compKey = targetCompanyInput.toLowerCase().trim();
    targetSpec = COMPANY_REQUIREMENTS[compKey] || null;
    targetName = targetSpec ? targetSpec.name : targetCompanyInput;
  } else if (targetRoleInput) {
    targetType = 'role';
    const roleKey = targetRoleInput.toLowerCase().trim();
    targetSpec = ROLE_REQUIREMENTS[roleKey] || null;
    targetName = targetSpec ? targetSpec.name : targetRoleInput;
  } else {
    targetName = 'General Software Role';
    targetSpec = ROLE_REQUIREMENTS['software developer'];
  }

  // If unknown company/role custom string provided, fall back to standard baseline
  if (!targetSpec) {
    targetSpec = {
      name: targetName,
      required_languages: ["Java", "Python", "SQL", "JavaScript"],
      required_frameworks: ["Spring Boot", "React", "Node.js"],
      required_tools: ["Git", "Docker", "Postman", "MySQL"],
      required_certifications: ["Cloud Fundamentals", "Problem Solving Certification"],
      required_project_types: ["Full Stack Web Application", "REST API Service"],
      min_cgpa: 7.0,
      core_focus: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Design"]
    };
  }

  // Extract student skills across all sections into unified lists
  const techSkills = profile.technical_skills || {};
  const progLangs = techSkills.programming_languages || [];
  const frameworks = techSkills.frameworks || [];
  const libraries = techSkills.libraries || [];
  const databases = techSkills.databases || [];
  const tools = techSkills.tools || [];
  const cloud = techSkills.cloud || [];
  const others = techSkills.others || [];

  const allSkills = [
    ...progLangs,
    ...frameworks,
    ...libraries,
    ...databases,
    ...tools,
    ...cloud,
    ...others
  ];

  const projects = profile.projects || [];
  const projectTechStack = projects.flatMap(p => p.tech_stack || []);
  const projectTitles = projects.map(p => typeof p === 'string' ? p : (p.title || ''));

  const userCertifications = profile.certifications || [];
  const userEducation = profile.education || {};
  const userCgpa = parseFloat(userEducation.cgpa) || 0;

  // Flatten student's total known technical items
  const fullStudentInventory = [
    ...allSkills,
    ...projectTechStack,
    ...projectTitles,
    ...userCertifications
  ];

  // Matching & Missing analysis
  const matchingSkills = [];
  const missingSkills = [];
  const missingFrameworks = [];
  const missingTools = [];
  const missingCertifications = [];
  const missingProjectExperience = [];

  // 1. Language matching
  targetSpec.required_languages.forEach(lang => {
    if (isMatch(fullStudentInventory, lang)) {
      if (!matchingSkills.includes(lang)) matchingSkills.push(lang);
    } else {
      if (!missingSkills.includes(lang)) missingSkills.push(lang);
    }
  });

  // 2. Framework matching
  targetSpec.required_frameworks.forEach(fw => {
    if (isMatch(fullStudentInventory, fw)) {
      if (!matchingSkills.includes(fw)) matchingSkills.push(fw);
    } else {
      if (!missingFrameworks.includes(fw)) missingFrameworks.push(fw);
      if (!missingSkills.includes(fw)) missingSkills.push(fw);
    }
  });

  // 3. Tool matching
  targetSpec.required_tools.forEach(tool => {
    if (isMatch(fullStudentInventory, tool)) {
      if (!matchingSkills.includes(tool)) matchingSkills.push(tool);
    } else {
      if (!missingTools.includes(tool)) missingTools.push(tool);
      if (!missingSkills.includes(tool)) missingSkills.push(tool);
    }
  });

  // 4. Certification matching
  targetSpec.required_certifications.forEach(cert => {
    if (isMatch(userCertifications, cert) || isMatch(fullStudentInventory, cert)) {
      if (!matchingSkills.includes(cert)) matchingSkills.push(cert);
    } else {
      if (!missingCertifications.includes(cert)) missingCertifications.push(cert);
    }
  });

  // 5. Project experience matching
  targetSpec.required_project_types.forEach(pType => {
    const hasProjectMatch = projects.some(p => {
      const title = typeof p === 'string' ? p : (p.title || '');
      const desc = typeof p === 'object' ? (p.description || '') : '';
      return isMatch([title, desc], pType) || isMatch(fullStudentInventory, pType);
    });

    if (!hasProjectMatch) {
      missingProjectExperience.push(pType);
    }
  });

  // Check additional core concepts (DSA, OOP, SQL) for matching skills
  (targetSpec.core_focus || []).forEach(focus => {
    if (isMatch(fullStudentInventory, focus)) {
      if (!matchingSkills.includes(focus)) matchingSkills.push(focus);
    }
  });

  // Strength extraction
  const strengths = [];
  if (userCgpa >= (targetSpec.min_cgpa || 7.0)) {
    strengths.push(`Good CGPA (${userCgpa.toFixed(1)} / 10.0) meeting academic eligibility`);
  }
  if (progLangs.length > 0) {
    strengths.push(`Foundational proficiency in ${progLangs.slice(0, 3).join(', ')}`);
  }
  if (projects.length >= 2) {
    strengths.push(`Demonstrated hands-on experience with ${projects.length} technical project(s)`);
  }
  if (matchingSkills.length > 0) {
    strengths.push(`Core alignment in ${matchingSkills.slice(0, 3).join(', ')}`);
  }
  if (userCertifications.length > 0) {
    strengths.push(`Active learning credentials (${userCertifications.length} certification(s))`);
  }
  if (strengths.length === 0) {
    strengths.push("Enthusiastic beginner with foundational technical background");
  }

  // Priority Learning List calculation (ordered from highest priority to lowest)
  const priorityLearning = [];
  
  // High priority: missing core languages & frameworks required by target
  missingFrameworks.forEach(fw => {
    if (!priorityLearning.includes(fw)) priorityLearning.push(fw);
  });
  missingSkills.forEach(sk => {
    if (!priorityLearning.includes(sk)) priorityLearning.push(sk);
  });
  missingTools.forEach(tl => {
    if (!priorityLearning.includes(tl)) priorityLearning.push(tl);
  });
  missingProjectExperience.forEach(proj => {
    const projSkill = `Build ${proj}`;
    if (!priorityLearning.includes(projSkill)) priorityLearning.push(projSkill);
  });
  missingCertifications.forEach(cert => {
    if (!priorityLearning.includes(cert)) priorityLearning.push(cert);
  });

  // Calculate Readiness Score (0 - 100 Integer)
  let totalPoints = 0;
  let earnedPoints = 0;

  // Language weight: 25 points
  const langWeight = 25;
  totalPoints += langWeight;
  const reqLangs = targetSpec.required_languages;
  const matchedLangsCount = reqLangs.filter(l => isMatch(fullStudentInventory, l)).length;
  earnedPoints += reqLangs.length > 0 ? (matchedLangsCount / reqLangs.length) * langWeight : langWeight;

  // Framework & Tools weight: 30 points
  const fwToolWeight = 30;
  totalPoints += fwToolWeight;
  const reqFwTools = [...targetSpec.required_frameworks, ...targetSpec.required_tools];
  const matchedFwToolsCount = reqFwTools.filter(ft => isMatch(fullStudentInventory, ft)).length;
  earnedPoints += reqFwTools.length > 0 ? (matchedFwToolsCount / reqFwTools.length) * fwToolWeight : fwToolWeight;

  // Project experience weight: 25 points
  const projWeight = 25;
  totalPoints += projWeight;
  const totalReqProjects = targetSpec.required_project_types.length;
  const matchedProjectsCount = totalReqProjects - missingProjectExperience.length;
  earnedPoints += totalReqProjects > 0 ? (Math.max(0, matchedProjectsCount) / totalReqProjects) * projWeight : projWeight;

  // Academic / CGPA & Certifications weight: 20 points
  const academicWeight = 20;
  totalPoints += academicWeight;
  let academicScore = 0;
  if (userCgpa >= targetSpec.min_cgpa) academicScore += 12;
  else if (userCgpa > 0) academicScore += (userCgpa / targetSpec.min_cgpa) * 12;
  else academicScore += 6; // default neutral

  if (userCertifications.length > 0) academicScore += 8;
  earnedPoints += Math.min(academicWeight, academicScore);

  // Compute final integer score bounded between 0 and 100
  let readinessScore = Math.round((earnedPoints / totalPoints) * 100);
  readinessScore = Math.max(0, Math.min(100, readinessScore));

  // Generate concise, objective summary
  let summary = '';
  const targetLabel = targetType === 'company' ? `company '${targetName}'` : `role '${targetName}'`;

  if (readinessScore >= 80) {
    summary = `The student displays a high readiness level for ${targetLabel} with strong matching skills in ${matchingSkills.slice(0, 3).join(', ')}. Minor additions in ${missingSkills.slice(0, 2).join(', ') || 'advanced tools'} will solidify candidate positioning.`;
  } else if (readinessScore >= 50) {
    summary = `The student has a foundational background suitable for ${targetLabel} with key strengths in ${matchingSkills.slice(0, 3).join(', ') || 'core concepts'}. Key gaps include ${missingSkills.slice(0, 3).join(', ')} and project experience in ${missingProjectExperience[0] || 'domain-specific applications'}.`;
  } else {
    summary = `The student requires targeted skill development to meet requirements for ${targetLabel}. Core focus should be on building proficiency in ${missingSkills.slice(0, 3).join(', ')} and completing a ${missingProjectExperience[0] || 'relevant practical project'}.`;
  }

  // Strict output format returning ONLY valid skill_gap JSON object
  return {
    "skill_gap": {
      "target_company": targetType === 'company' ? targetName : null,
      "target_role": targetType === 'role' ? targetName : null,
      "readiness_score": readinessScore,
      "matching_skills": matchingSkills,
      "missing_skills": missingSkills,
      "missing_frameworks": missingFrameworks,
      "missing_tools": missingTools,
      "missing_certifications": missingCertifications,
      "missing_project_experience": missingProjectExperience,
      "strengths": strengths,
      "priority_learning": priorityLearning,
      "summary": summary
    }
  };
}
