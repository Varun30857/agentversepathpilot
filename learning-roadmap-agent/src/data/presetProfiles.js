export const PRESET_PROFILES = [
  {
    id: "fullstack",
    name: "Full-Stack Web Developer",
    domain: "Full-Stack Development",
    subtitle: "React.js, Node.js, Python, PostgreSQL, REST APIs",
    hoursPerDay: 3,
    badge: "Recommended: 8 Weeks Plan",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Computer Science and Engineering",
        cgpa: 8.85
      },
      technical_skills: {
        programming_languages: ["JavaScript", "TypeScript", "Python", "C++"],
        frameworks: ["React.js", "Node.js", "Express.js", "TailwindCSS"],
        libraries: ["Redux Toolkit", "Axios"],
        databases: ["PostgreSQL", "MongoDB"],
        tools: ["Git", "Postman", "VS Code"],
        cloud: ["AWS", "Vercel"],
        others: ["RESTful APIs", "Data Structures & Algorithms"]
      },
      projects: [
        {
          title: "E-Commerce Web Portal",
          description: "Full-stack online shop with user login and cart persistence.",
          tech_stack: ["React", "Node.js", "MongoDB"]
        }
      ],
      certifications: [
        {
          name: "Meta Front-End Developer Certificate",
          issuer: "Coursera"
        }
      ],
      internships: [
        {
          role: "Web Dev Intern",
          company: "TechNova",
          duration: "3 Months"
        }
      ],
      work_experience: [],
      achievements: ["Hackathon Runner-up 2025"],
      preferred_domain: "Full-Stack Development",
      study_hours_per_day: 3
    }
  },
  {
    id: "aiml",
    name: "AI & Machine Learning Specialist",
    domain: "Artificial Intelligence & Machine Learning",
    subtitle: "Python, PyTorch, Scikit-Learn, TensorFlow, Vector DBs",
    hoursPerDay: 4,
    badge: "Recommended: 8 Weeks Plan",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Artificial Intelligence & Data Science",
        cgpa: 9.15
      },
      technical_skills: {
        programming_languages: ["Python", "SQL", "R", "C++"],
        frameworks: ["PyTorch", "TensorFlow", "FastAPI"],
        libraries: ["NumPy", "Pandas", "Scikit-Learn", "Matplotlib", "HuggingFace"],
        databases: ["PostgreSQL", "Pinecone Vector DB"],
        tools: ["Jupyter Notebooks", "Git", "MLflow"],
        cloud: ["Google Cloud Platform (GCP)"],
        others: ["Deep Learning", "Natural Language Processing (NLP)", "Computer Vision"]
      },
      projects: [
        {
          title: "Medical Image Anomaly Classifier",
          description: "Deep CNN model for automated scan diagnosis with 96% accuracy.",
          tech_stack: ["Python", "PyTorch", "OpenCV"]
        }
      ],
      certifications: [
        {
          name: "Deep Learning Specialization",
          issuer: "DeepLearning.AI"
        }
      ],
      internships: [
        {
          role: "Data Science Intern",
          company: "Analytics AI Lab",
          duration: "4 Months"
        }
      ],
      work_experience: [],
      achievements: ["Kaggle Competition Top 5%"],
      preferred_domain: "Artificial Intelligence & Machine Learning",
      study_hours_per_day: 4
    }
  },
  {
    id: "devops",
    name: "Cloud & DevOps Engineer",
    domain: "Cloud Computing & DevOps",
    subtitle: "Go, Docker, Kubernetes, Terraform, AWS, CI/CD",
    hoursPerDay: 2,
    badge: "Recommended: 6 Weeks Plan",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Information Technology",
        cgpa: 8.40
      },
      technical_skills: {
        programming_languages: ["Go", "Python", "Bash", "Shell"],
        frameworks: ["Gin", "FastAPI"],
        libraries: ["Kubernetes SDK"],
        databases: ["PostgreSQL", "Redis"],
        tools: ["Docker", "Kubernetes", "Terraform", "GitLab CI/CD", "Ansible"],
        cloud: ["AWS", "Azure"],
        others: ["Infrastructure as Code", "Linux Administration", "Networking"]
      },
      projects: [
        {
          title: "Automated EKS GitOps Deployment",
          description: "Zero-downtime microservice infrastructure using ArgoCD & Terraform.",
          tech_stack: ["Kubernetes", "Terraform", "AWS"]
        }
      ],
      certifications: [
        {
          name: "Certified Kubernetes Administrator (CKA)",
          issuer: "Linux Foundation"
        }
      ],
      internships: [
        {
          role: "DevOps Intern",
          company: "CloudScale Systems",
          duration: "6 Months"
        }
      ],
      work_experience: [],
      achievements: ["Red Hat RHCSA Certified"],
      preferred_domain: "Cloud Computing & DevOps",
      study_hours_per_day: 2
    }
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Systems Analyst",
    domain: "Cybersecurity",
    subtitle: "Linux, Python, Wireshark, Metasploit, Security Auditing",
    hoursPerDay: 3,
    badge: "Recommended: 6 Weeks Plan",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Computer Science (Cybersecurity)",
        cgpa: 8.60
      },
      technical_skills: {
        programming_languages: ["Python", "C", "Bash", "Assembly"],
        frameworks: ["Scapy", "Nmap"],
        libraries: ["Cryptography", "Requests"],
        databases: ["PostgreSQL", "SQLite"],
        tools: ["Wireshark", "Burp Suite", "Metasploit", "Nmap", "Linux"],
        cloud: ["AWS IAM"],
        others: ["Network Penetration Testing", "SOC Analysis", "OWASP Top 10"]
      },
      projects: [
        {
          title: "Network Intrusion Detection System",
          description: "Real-time network traffic packet analyzer detecting port scans.",
          tech_stack: ["Python", "Scapy", "Wireshark"]
        }
      ],
      certifications: [
        {
          name: "CompTIA Security+",
          issuer: "CompTIA"
        }
      ],
      internships: [],
      work_experience: [],
      achievements: ["CTF Finalist 2025"],
      preferred_domain: "Cybersecurity",
      study_hours_per_day: 3
    }
  },
  {
    id: "empty",
    name: "Beginner / Zero-State Profile",
    domain: "Software Development",
    subtitle: "Minimal technical skills, basic C++/Python foundation",
    hoursPerDay: 2,
    badge: "Foundational: 4 Weeks Plan",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Computer Science",
        cgpa: 7.20
      },
      technical_skills: {
        programming_languages: ["C++", "Python"],
        frameworks: [],
        libraries: [],
        databases: ["MySQL"],
        tools: ["VS Code", "Git"],
        cloud: [],
        others: ["Basic Problem Solving"]
      },
      projects: [],
      certifications: [],
      internships: [],
      work_experience: [],
      achievements: [],
      preferred_domain: "Software Development",
      study_hours_per_day: 2
    }
  }
];
