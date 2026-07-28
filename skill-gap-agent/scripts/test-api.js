import { analyzeSkillGap } from '../server/skillGapEngine.js';

console.log("--------------------------------------------------");
console.log("TEST 1: Profile + Target Company (Zoho)");
console.log("--------------------------------------------------");

const input1 = {
  "profile": {
    "education": {
      "degree": "B.Tech",
      "branch": "Computer Science & Engineering",
      "cgpa": 8.2
    },
    "technical_skills": {
      "programming_languages": ["Java", "SQL", "C++"],
      "frameworks": ["Spring"],
      "libraries": [],
      "databases": ["MySQL"],
      "tools": ["Git", "VS Code"],
      "cloud": [],
      "others": ["Data Structures", "OOP"]
    },
    "projects": [
      {
        "title": "Inventory Management System",
        "tech_stack": ["Java", "MySQL", "JDBC"]
      }
    ],
    "certifications": ["Java Fundamentals"],
    "internships": [],
    "work_experience": [],
    "achievements": [],
    "preferred_domain": "Backend Development"
  },
  "target_company": "Zoho"
};

const res1 = analyzeSkillGap(input1);
console.log(JSON.stringify(res1, null, 2));

console.log("\n--------------------------------------------------");
console.log("TEST 2: Profile + Target Role (Software Developer)");
console.log("--------------------------------------------------");

const input2 = {
  "profile": {
    "education": {
      "degree": "B.E.",
      "branch": "IT",
      "cgpa": 7.8
    },
    "technical_skills": {
      "programming_languages": ["JavaScript", "Python", "HTML", "CSS"],
      "frameworks": ["React", "Express.js", "Node.js"],
      "libraries": ["Redux"],
      "databases": ["MongoDB"],
      "tools": ["Git", "Postman", "Docker"],
      "cloud": ["AWS"],
      "others": ["REST API"]
    },
    "projects": [
      {
        "title": "E-Commerce Web Application",
        "tech_stack": ["React", "Node.js", "MongoDB", "Express.js"]
      }
    ],
    "certifications": ["Full Stack Web Development"],
    "internships": [],
    "work_experience": [],
    "achievements": [],
    "preferred_domain": "Web Development"
  },
  "target_role": "Software Developer"
};

const res2 = analyzeSkillGap(input2);
console.log(JSON.stringify(res2, null, 2));
