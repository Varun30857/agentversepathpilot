import { TARGET_COMPANIES_CATALOG } from '../data/presetProfiles';

/**
 * Company Recommendation Agent - Utility-Based Engine
 * Calculates candidate compatibility with target tech companies.
 */
export function evaluateCompanyRecommendations(profileData) {
  const profile = profileData?.profile || profileData || {};

  const education = profile.education || {};
  const skillsObj = profile.technical_skills || {};
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  const certs = Array.isArray(profile.certifications) ? profile.certifications : [];
  const internships = Array.isArray(profile.internships) ? profile.internships : [];
  const achievements = Array.isArray(profile.achievements) ? profile.achievements : [];
  const preferredDomain = (profile.preferred_domain || "").trim();

  // Combine all student skills into normalized flat arrays
  const progLangs = (skillsObj.programming_languages || []).map(s => String(s).trim());
  const frameworks = (skillsObj.frameworks || []).map(s => String(s).trim());
  const libraries = (skillsObj.libraries || []).map(s => String(s).trim());
  const databases = (skillsObj.databases || []).map(s => String(s).trim());
  const tools = (skillsObj.tools || []).map(s => String(s).trim());
  const cloud = (skillsObj.cloud || []).map(s => String(s).trim());
  const others = (skillsObj.others || []).map(s => String(s).trim());

  const allSkillsList = [
    ...progLangs,
    ...frameworks,
    ...libraries,
    ...databases,
    ...tools,
    ...cloud,
    ...others
  ];

  const hasSkills = allSkillsList.length > 0;
  const hasProjects = projects.length > 0;
  const hasCerts = certs.length > 0;
  const hasInternships = internships.length > 0;
  const cgpa = Number(education.cgpa || 0);

  const isProfileEmpty = !hasSkills && !hasProjects && !hasCerts && !hasInternships && cgpa === 0 && !preferredDomain && !(education.degree);

  // If profile is completely empty/unavailable
  if (isProfileEmpty) {
    const top10Empty = TARGET_COMPANIES_CATALOG.slice(0, 10).map(c => ({
      company: c.name,
      match_percentage: 0,
      reason: [
        "No technical skills or programming languages are listed in the profile.",
        "No relevant project or internship experience is available for evaluation.",
        "Educational background and CGPA details are missing."
      ],
      matching_skills: [],
      matching_projects: [],
      matching_certifications: []
    }));

    return {
      company_recommendations: top10Empty,
      best_company: {
        company: "None",
        match_percentage: 0,
        reason: "Insufficient profile information provided to determine a matching company."
      }
    };
  }

  // Calculate utility evaluation score for each company
  const evaluations = TARGET_COMPANIES_CATALOG.map(comp => {
    let score = 0;
    const matchingSkills = [];
    const matchingProjects = [];
    const matchingCerts = [];
    const reasons = [];

    // 1. Programming Languages & Technical Skills Matching (Weight: 45 points max)
    const companyTech = comp.topLanguages.map(t => t.toLowerCase());
    allSkillsList.forEach(skill => {
      const skillLower = skill.toLowerCase();
      // direct or substring match
      const matchedTech = comp.topLanguages.find(tl => 
        skillLower === tl.toLowerCase() || 
        skillLower.includes(tl.toLowerCase()) || 
        tl.toLowerCase().includes(skillLower)
      );
      if (matchedTech) {
        if (!matchingSkills.includes(skill)) {
          matchingSkills.push(skill);
        }
      }
    });

    // Score based on skills match count & tech coverage
    const skillScore = Math.min(38, matchingSkills.length * 9);
    score += skillScore;

    // Framework & Cloud bonus
    let cloudBonus = 0;
    if (comp.name === "Amazon" && cloud.some(c => c.toLowerCase().includes("aws"))) {
      cloudBonus += 10;
      if (!matchingSkills.includes("AWS")) matchingSkills.push("AWS");
    }
    if (comp.name === "Google" && (cloud.some(c => c.toLowerCase().includes("gcp") || c.toLowerCase().includes("google")) || progLangs.includes("Python"))) {
      cloudBonus += 8;
    }
    if (comp.name === "Microsoft" && (cloud.some(c => c.toLowerCase().includes("azure")) || progLangs.includes("C#") || progLangs.includes("TypeScript"))) {
      cloudBonus += 8;
    }
    if (comp.name === "Oracle" && databases.some(d => d.toLowerCase().includes("sql") || d.toLowerCase().includes("oracle"))) {
      cloudBonus += 10;
      if (!matchingSkills.includes("PostgreSQL") && databases.length > 0) matchingSkills.push(databases[0]);
    }
    if (comp.name === "Cisco" && (tools.some(t => t.toLowerCase().includes("docker") || t.toLowerCase().includes("kubernetes")) || others.some(o => o.toLowerCase().includes("network")))) {
      cloudBonus += 8;
    }
    if (comp.name === "Intel" && (progLangs.includes("C++") || progLangs.includes("C") || others.some(o => o.toLowerCase().includes("embedded")))) {
      cloudBonus += 10;
    }
    score += cloudBonus;

    // 2. Preferred Domain & Tech Alignment (Weight: 25 points max)
    let domainScore = 0;
    const isDomainMatched = comp.coreDomains.some(d => 
      preferredDomain.toLowerCase().includes(d.toLowerCase()) || 
      d.toLowerCase().includes(preferredDomain.toLowerCase())
    );

    if (preferredDomain && isDomainMatched) {
      domainScore += 22;
    } else if (preferredDomain) {
      domainScore += 8; // partial domain credit
    } else {
      domainScore += 12; // neutral
    }
    score += domainScore;

    // 3. Projects Alignment (Weight: 15 points max)
    projects.forEach(p => {
      const pText = `${p.title} ${p.description || ''} ${p.domain || ''} ${(p.tech_stack || []).join(' ')}`.toLowerCase();
      const companyCore = comp.coreDomains.join(' ').toLowerCase();
      
      const isProjMatch = comp.topLanguages.some(l => pText.includes(l.toLowerCase())) ||
                          comp.coreDomains.some(cd => pText.includes(cd.toLowerCase().split(' ')[0]));
      
      if (isProjMatch) {
        if (!matchingProjects.includes(p.title)) {
          matchingProjects.push(p.title);
        }
      }
    });

    const projectScore = Math.min(15, matchingProjects.length * 8);
    score += projectScore;

    // 4. Certifications & Internships (Weight: 10 points max)
    certs.forEach(cert => {
      const cText = `${cert.name} ${cert.issuer || ''} ${(cert.skills || []).join(' ')}`.toLowerCase();
      if (cText.includes(comp.name.toLowerCase()) || 
          comp.topLanguages.some(l => cText.includes(l.toLowerCase())) ||
          cText.includes("aws") && comp.name === "Amazon" ||
          cText.includes("cloud") || cText.includes("developer")) {
        if (!matchingCertifications.includes(cert.name)) {
          matchingCertifications.push(cert.name);
        }
      }
    });
    const certScore = Math.min(6, matchingCertifications.length * 3);
    score += certScore;

    if (hasInternships) {
      score += 4;
    }

    // 5. CGPA Threshold (Weight: 5 points max)
    if (cgpa >= comp.minCgpa) {
      score += 5;
    } else if (cgpa > 0) {
      score += Math.max(0, 5 - Math.round((comp.minCgpa - cgpa) * 2));
    }

    // Clamp score between 0 and 100
    const finalPercentage = Math.min(99, Math.max(10, Math.round(score)));

    // Generate 3 distinct analytical reason strings
    if (matchingSkills.length > 0) {
      reasons.push(`Strong alignment in core technical skills including ${matchingSkills.slice(0, 3).join(', ')} required for ${comp.name}'s engineering stack.`);
    } else if (progLangs.length > 0) {
      reasons.push(`Foundational programming exposure in ${progLangs.slice(0, 2).join(', ')} adaptable to ${comp.name}'s tech domain.`);
    } else {
      reasons.push(`General profile alignment with ${comp.name}'s entry-level engineering requirements.`);
    }

    if (isDomainMatched && preferredDomain) {
      reasons.push(`Direct alignment between candidate's preferred domain '${preferredDomain}' and ${comp.name}'s core focus on ${comp.coreDomains[0]}.`);
    } else if (matchingProjects.length > 0) {
      reasons.push(`Relevant practical experience demonstrated in project work such as '${matchingProjects[0]}'.`);
    } else {
      reasons.push(`Profile demonstrates technical fundamentals relevant to ${comp.name}'s hiring requirements.`);
    }

    if (cgpa >= comp.minCgpa && cgpa > 0) {
      reasons.push(`Academic performance (CGPA ${cgpa.toFixed(2)}) satisfies ${comp.name}'s eligibility criteria (Min ${comp.minCgpa}).`);
    } else if (matchingCertifications.length > 0) {
      reasons.push(`Verified credentials through certifications like '${matchingCertifications[0]}'.`);
    } else {
      reasons.push(`Good foundation for technical role onboarding and training programs.`);
    }

    return {
      company: comp.name,
      match_percentage: finalPercentage,
      reason: reasons.slice(0, 3),
      matching_skills: matchingSkills,
      matching_projects: matchingProjects,
      matching_certifications: matchingCertifications
    };
  });

  // Sort recommendations by match_percentage descending
  evaluations.sort((a, b) => b.match_percentage - a.match_percentage);

  // Take top 10 companies
  const top10 = evaluations.slice(0, 10);
  const topCompany = top10[0];

  return {
    company_recommendations: top10,
    best_company: {
      company: topCompany ? topCompany.company : "N/A",
      match_percentage: topCompany ? topCompany.match_percentage : 0,
      reason: topCompany 
        ? `${topCompany.company} offers the highest match (${topCompany.match_percentage}%) based on matching skills (${topCompany.matching_skills.slice(0, 3).join(', ') || 'core fundamentals'}) and domain alignment.`
        : "No matching company found."
    }
  };
}
