export const PRESET_PROFILES = [
  {
    id: "fullstack",
    name: "Full-Stack Web Developer",
    subtitle: "React, Node.js, Python, PostgreSQL, AWS",
    badge: "High Match: Product & Tech Giants",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Computer Science and Engineering",
        cgpa: 8.85
      },
      technical_skills: {
        programming_languages: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
        frameworks: ["React.js", "Node.js", "Express.js", "Django", "TailwindCSS"],
        libraries: ["Redux Toolkit", "Axios", "Pandas"],
        databases: ["PostgreSQL", "MongoDB", "Redis"],
        tools: ["Git", "Postman", "Webpack", "Docker", "VS Code"],
        cloud: ["AWS", "Vercel"],
        others: ["RESTful APIs", "Microservices Architecture", "Agile/Scrum"]
      },
      projects: [
        {
          title: "AI-Powered Placement Intelligence System",
          description: "Multi-agent AI portal using React and Python FastAPI for automated resume scoring and company matching.",
          tech_stack: ["React", "FastAPI", "Python", "PostgreSQL", "Docker"],
          domain: "Artificial Intelligence & Web Applications"
        },
        {
          title: "E-Commerce Microservices Platform",
          description: "Scalable online marketplace backend with JWT auth, payment gateway, and Redis caching.",
          tech_stack: ["Node.js", "Express", "MongoDB", "Redis", "AWS"],
          domain: "Full-Stack Development"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer – Associate",
          issuer: "Amazon Web Services",
          skills: ["AWS Lambda", "DynamoDB", "S3", "CloudFormation"]
        },
        {
          name: "Meta Front-End Developer Professional Certificate",
          issuer: "Coursera / Meta",
          skills: ["React", "JavaScript", "UI/UX", "CSS"]
        }
      ],
      internships: [
        {
          role: "Full Stack Developer Intern",
          company: "TechNova Solutions",
          duration: "6 Months",
          responsibilities: "Developed RESTful APIs in Node.js and built responsive dashboard components using React."
        }
      ],
      work_experience: [],
      achievements: [
        "Winner of National Hackathon 2025 (Smart India Hackathon)",
        "Published 1 open-source npm package with 5k+ downloads"
      ],
      preferred_domain: "Full-Stack Development"
    }
  },
  {
    id: "ai_ds",
    name: "AI & Data Science Specialist",
    subtitle: "Python, PyTorch, Scikit-Learn, TensorFlow, GCP",
    badge: "High Match: Google, Adobe, IBM",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Artificial Intelligence and Data Science",
        cgpa: 9.15
      },
      technical_skills: {
        programming_languages: ["Python", "R", "SQL", "C++"],
        frameworks: ["PyTorch", "TensorFlow", "FastAPI", "Flask"],
        libraries: ["Scikit-Learn", "NumPy", "Pandas", "Matplotlib", "OpenCV", "HuggingFace"],
        databases: ["PostgreSQL", "Pinecone Vector DB", "MongoDB"],
        tools: ["Jupyter Notebooks", "Git", "MLflow", "Docker"],
        cloud: ["Google Cloud Platform (GCP)", "AWS Sagemaker"],
        others: ["Deep Learning", "Natural Language Processing (NLP)", "Computer Vision", "Prompt Engineering"]
      },
      projects: [
        {
          title: "Multimodal Medical Image Classifier",
          description: "Deep convolutional neural network for detecting anomalies in MRI scans with 96.4% accuracy.",
          tech_stack: ["Python", "PyTorch", "OpenCV", "FastAPI"],
          domain: "Artificial Intelligence & Healthcare"
        },
        {
          title: "RAG-Based Enterprise Knowledge Agent",
          description: "LLM agent using HuggingFace models and Pinecone vector database for automated documentation Q&A.",
          tech_stack: ["Python", "HuggingFace", "Pinecone", "LangChain"],
          domain: "Natural Language Processing"
        }
      ],
      certifications: [
        {
          name: "Google Cloud Professional Data Engineer",
          issuer: "Google Cloud",
          skills: ["BigQuery", "Dataflow", "GCP", "ML Engine"]
        },
        {
          name: "Deep Learning Specialization",
          issuer: "DeepLearning.AI",
          skills: ["CNNs", "RNNs", "Transformers", "PyTorch"]
        }
      ],
      internships: [
        {
          role: "Data Science Intern",
          company: "Cognitive Analytics Lab",
          duration: "4 Months",
          responsibilities: "Trained and deployed computer vision models into cloud pipelines."
        }
      ],
      work_experience: [],
      achievements: [
        "Kaggle Competition Expert (Top 5% rank in NLP Challenge)",
        "Co-authored research paper accepted at IEEE Conference"
      ],
      preferred_domain: "Artificial Intelligence & Machine Learning"
    }
  },
  {
    id: "cloud_devops",
    name: "Cloud & DevOps Engineer",
    subtitle: "Go, Kubernetes, Docker, Terraform, AWS, Azure",
    badge: "High Match: Amazon, Cisco, Salesforce",
    profile: {
      education: {
        degree: "B.Tech",
        branch: "Information Technology",
        cgpa: 8.60
      },
      technical_skills: {
        programming_languages: ["Go", "Python", "Bash", "Shell"],
        frameworks: ["Gin", "FastAPI"],
        libraries: ["Kubernetes SDK", "Helm"],
        databases: ["PostgreSQL", "Redis"],
        tools: ["Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitLab CI/CD", "Prometheus", "Grafana"],
        cloud: ["AWS", "Microsoft Azure"],
        others: ["Infrastructure as Code (IaC)", "Site Reliability Engineering", "Linux Administration", "Networking & Security"]
      },
      projects: [
        {
          title: "Automated GitOps Kubernetes Deployment Pipeline",
          description: "Implemented Zero-downtime deployment infrastructure using ArgoCD, Helm, and Terraform on AWS EKS.",
          tech_stack: ["Kubernetes", "Terraform", "ArgoCD", "AWS", "Go"],
          domain: "Cloud & DevOps"
        }
      ],
      certifications: [
        {
          name: "Certified Kubernetes Administrator (CKA)",
          issuer: "Linux Foundation / CNCF",
          skills: ["Kubernetes", "Cluster Architecture", "Troubleshooting"]
        },
        {
          name: "AWS Certified Solutions Architect – Associate",
          issuer: "Amazon Web Services",
          skills: ["AWS Infrastructure", "VPC", "EC2", "IAM"]
        }
      ],
      internships: [
        {
          role: "DevOps Engineer Intern",
          company: "CloudScale Systems",
          duration: "6 Months",
          responsibilities: "Automated CI/CD workflows reducing deployment times by 40%."
        }
      ],
      work_experience: [],
      achievements: [
        "Built automated cloud setup script used by 50+ computer science students",
        "Red Hat System Administration Certification (RHCSA)"
      ],
      preferred_domain: "Cloud Computing & DevOps"
    }
  },
  {
    id: "empty",
    name: "Incomplete / Default Profile (Test Zero State)",
    subtitle: "Empty profile fields to verify zero-state rules",
    badge: "Test Evaluation Rules",
    profile: {
      education: {
        degree: "",
        branch: "",
        cgpa: 0
      },
      technical_skills: {
        programming_languages: [],
        frameworks: [],
        libraries: [],
        databases: [],
        tools: [],
        cloud: [],
        others: []
      },
      projects: [],
      certifications: [],
      internships: [],
      work_experience: [],
      achievements: [],
      preferred_domain: ""
    }
  }
];

export const TARGET_COMPANIES_CATALOG = [
  { name: "Google", category: "Global Tech Giant", coreDomains: ["Artificial Intelligence & Machine Learning", "Cloud Computing & DevOps", "Full-Stack Development", "Systems & Data"], topLanguages: ["Python", "C++", "Java", "Go", "JavaScript"], minCgpa: 8.0 },
  { name: "Microsoft", category: "Enterprise & Cloud Leader", coreDomains: ["Cloud Computing & DevOps", "Full-Stack Development", "Artificial Intelligence & Machine Learning", "Enterprise Software"], topLanguages: ["C#", "C++", "TypeScript", "Python", "Java"], minCgpa: 7.5 },
  { name: "Amazon", category: "Cloud & E-Commerce Leader", coreDomains: ["Cloud Computing & DevOps", "Full-Stack Development", "Distributed Systems", "Data Engineering"], topLanguages: ["Java", "Python", "C++", "JavaScript", "Go"], minCgpa: 7.5 },
  { name: "Zoho", category: "Product SaaS Pioneer", coreDomains: ["Full-Stack Development", "SaaS Development", "Product Engineering"], topLanguages: ["Java", "JavaScript", "Python", "React.js", "C++"], minCgpa: 7.0 },
  { name: "Oracle", category: "Database & Cloud Infrastructure", coreDomains: ["Enterprise Software", "Cloud Computing & DevOps", "Database Systems"], topLanguages: ["Java", "SQL", "C++", "Python", "Go"], minCgpa: 7.5 },
  { name: "IBM", category: "Enterprise Tech & Hybrid Cloud", coreDomains: ["Artificial Intelligence & Machine Learning", "Cloud Computing & DevOps", "Enterprise Software"], topLanguages: ["Python", "Java", "C++", "Go", "SQL"], minCgpa: 7.0 },
  { name: "Cisco", category: "Networking & Cybersecurity", coreDomains: ["Networking & Security", "Cloud Computing & DevOps", "Embedded/IoT"], topLanguages: ["C++", "Python", "C", "Go", "Java"], minCgpa: 7.5 },
  { name: "Intel", category: "Semiconductors & Systems", coreDomains: ["Embedded/IoT", "Systems & Hardware", "Artificial Intelligence & Machine Learning"], topLanguages: ["C++", "C", "Python", "SystemVerilog"], minCgpa: 7.5 },
  { name: "Salesforce", category: "Enterprise Cloud SaaS", coreDomains: ["Enterprise Software", "Cloud Computing & DevOps", "Full-Stack Development"], topLanguages: ["Java", "JavaScript", "Apex", "Python", "TypeScript"], minCgpa: 7.5 },
  { name: "Adobe", category: "Creative & Enterprise Software", coreDomains: ["Full-Stack Development", "Artificial Intelligence & Machine Learning", "Creative Cloud"], topLanguages: ["C++", "JavaScript", "Python", "Java", "React.js"], minCgpa: 8.0 },
  { name: "ServiceNow", category: "Enterprise Workflow Platform", coreDomains: ["Enterprise Software", "Full-Stack Development", "Cloud Computing & DevOps"], topLanguages: ["JavaScript", "Java", "Python", "TypeScript"], minCgpa: 7.5 },
  { name: "SAP", category: "Enterprise Resource Planning", coreDomains: ["Enterprise Software", "Database Systems", "Cloud Computing & DevOps"], topLanguages: ["Java", "ABAP", "JavaScript", "Python", "C++"], minCgpa: 7.0 },
  { name: "Deloitte", category: "Global Tech Consulting", coreDomains: ["Tech Consulting", "Cloud Computing & DevOps", "Full-Stack Development"], topLanguages: ["Java", "Python", "SQL", "JavaScript", "C#"], minCgpa: 6.5 },
  { name: "Accenture", category: "Global Tech Consulting & Services", coreDomains: ["Tech Consulting", "Full-Stack Development", "Cloud Computing & DevOps"], topLanguages: ["Java", "Python", "SQL", "JavaScript", "C#"], minCgpa: 6.5 },
  { name: "Capgemini", category: "IT & Digital Services", coreDomains: ["Tech Consulting", "Full-Stack Development", "Enterprise Software"], topLanguages: ["Java", "Python", "SQL", "JavaScript"], minCgpa: 6.5 },
  { name: "Cognizant", category: "IT Services & Solutions", coreDomains: ["Full-Stack Development", "Tech Consulting", "Data Engineering"], topLanguages: ["Java", "Python", "SQL", "JavaScript", "C#"], minCgpa: 6.5 },
  { name: "Infosys", category: "Global IT Services", coreDomains: ["Full-Stack Development", "Enterprise Software", "Cloud Computing & DevOps"], topLanguages: ["Java", "Python", "SQL", "JavaScript", "C++"], minCgpa: 6.5 },
  { name: "TCS", category: "Global IT Giant", coreDomains: ["Full-Stack Development", "Enterprise Software", "Data Engineering"], topLanguages: ["Java", "Python", "SQL", "C++", "JavaScript"], minCgpa: 6.0 },
  { name: "Wipro", category: "IT Consulting & Digital Solutions", coreDomains: ["Full-Stack Development", "Cloud Computing & DevOps", "Tech Consulting"], topLanguages: ["Java", "Python", "SQL", "JavaScript"], minCgpa: 6.0 },
  { name: "HCLTech", category: "Global Tech Engineering Services", coreDomains: ["Full-Stack Development", "Embedded/IoT", "Cloud Computing & DevOps"], topLanguages: ["C++", "Java", "Python", "SQL"], minCgpa: 6.0 }
];
