/**
 * Placement Intelligence Knowledge Base
 * Contains target requirements for major tech companies and core engineering roles.
 */

export const COMPANY_REQUIREMENTS = {
  "zoho": {
    "name": "Zoho",
    "required_languages": ["Java", "C", "C++", "JavaScript", "SQL"],
    "required_frameworks": ["Spring Boot", "React", "Node.js"],
    "required_tools": ["Git", "Docker", "Postman", "Linux", "MySQL"],
    "required_certifications": ["Java SE Programmer", "Oracle Database SQL", "Cloud Fundamentals"],
    "required_project_types": ["Full Stack Web Application", "REST API Backend Service", "Database Management System"],
    "min_cgpa": 7.0,
    "core_focus": ["Object-Oriented Programming (OOP)", "Data Structures & Algorithms", "Relational Database Design", "Low-Level System Design"]
  },

  "google": {
    "name": "Google",
    "required_languages": ["C++", "Java", "Python", "Go", "TypeScript"],
    "required_frameworks": ["gRPC", "React", "TensorFlow", "Node.js"],
    "required_tools": ["Git", "Docker", "Kubernetes", "Linux", "Bazel", "GCP"],
    "required_certifications": ["Google Cloud Professional Data Engineer", "AWS Certified Solutions Architect"],
    "required_project_types": ["Distributed Systems Project", "High Performance Backend Service", "Open Source Contribution"],
    "min_cgpa": 8.0,
    "core_focus": ["Advanced DSA", "System Design & Architecture", "Distributed Computing", "Algorithmic Efficiency"]
  },

  "amazon": {
    "name": "Amazon",
    "required_languages": ["Java", "Python", "C++", "JavaScript", "SQL"],
    "required_frameworks": ["Spring Boot", "AWS Cloud Services", "React", "Express.js"],
    "required_tools": ["Git", "Docker", "AWS", "DynamoDB", "Postman", "CI/CD"],
    "required_certifications": ["AWS Certified Developer - Associate", "AWS Certified Solutions Architect"],
    "required_project_types": ["Cloud-Native Web Application", "E-commerce Microservices Backend", "Scalable RESTful API"],
    "min_cgpa": 7.5,
    "core_focus": ["Object-Oriented Design (OOD)", "Scalable Architecture", "Leadership Principles", "Distributed Systems"]
  },

  "microsoft": {
    "name": "Microsoft",
    "required_languages": ["C#", "C++", "Java", "TypeScript", "Python"],
    "required_frameworks": [".NET Core", "React", "Azure Services", "Angular"],
    "required_tools": ["Git", "Azure", "Docker", "VS Code", "SQL Server"],
    "required_certifications": ["Microsoft Certified: Azure Developer Associate", "Azure Fundamentals"],
    "required_project_types": ["Enterprise Cloud Application", "Full Stack Web Service", "System Software / Compiler"],
    "min_cgpa": 7.5,
    "core_focus": ["Data Structures", "System Design", "Cloud Infrastructure", "Asynchronous Programming"]
  },

  "tcs": {
    "name": "TCS (Tata Consultancy Services)",
    "required_languages": ["Java", "Python", "C", "SQL", "HTML/CSS"],
    "required_frameworks": ["Spring Boot", "Angular", "React"],
    "required_tools": ["Git", "Eclipse/IntelliJ", "MySQL", "Postman"],
    "required_certifications": ["TCS NQT Certification", "Java Fundamentals", "SQL Database Certification"],
    "required_project_types": ["Academic Web Application", "Database Management Project"],
    "min_cgpa": 6.0,
    "core_focus": ["Basic Programming Concepts", "Database Queries", "Software Engineering Fundamentals"]
  },

  "infosys": {
    "name": "Infosys",
    "required_languages": ["Java", "Python", "C++", "SQL"],
    "required_frameworks": ["Spring Boot", "React", "Node.js"],
    "required_tools": ["Git", "VS Code", "MySQL", "JIRA"],
    "required_certifications": ["Infosys Springboard Certification", "Python for Data Science"],
    "required_project_types": ["Web Application Project", "Management System"],
    "min_cgpa": 6.0,
    "core_focus": ["Problem Solving", "Object-Oriented Programming", "RDBMS"]
  },

  "wipro": {
    "name": "Wipro",
    "required_languages": ["Java", "C++", "Python", "SQL"],
    "required_frameworks": ["Spring", "React"],
    "required_tools": ["Git", "MySQL", "Eclipse"],
    "required_certifications": ["Java Developer Certification", "Cloud Basics"],
    "required_project_types": ["Academic Software Project", "Web Application"],
    "min_cgpa": 6.0,
    "core_focus": ["Core Java", "SQL Queries", "Software Development Fundamentals"]
  },

  "accenture": {
    "name": "Accenture",
    "required_languages": ["Java", "Python", "JavaScript", "SQL"],
    "required_frameworks": ["Spring Boot", "Node.js", "React"],
    "required_tools": ["Git", "Postman", "MySQL", "AWS"],
    "required_certifications": ["Cloud Associate Certification", "Java Backend Specialist"],
    "required_project_types": ["Cloud-hosted Web Application", "API Service Project"],
    "min_cgpa": 6.5,
    "core_focus": ["Object-Oriented Programming", "Web Development", "Cloud Concepts"]
  },

  "flipkart": {
    "name": "Flipkart",
    "required_languages": ["Java", "Python", "Go", "SQL"],
    "required_frameworks": ["Spring Boot", "Kafka", "React", "Redis"],
    "required_tools": ["Git", "Docker", "Kubernetes", "Postman", "Elasticsearch"],
    "required_certifications": ["Distributed Systems Certification", "AWS Certified Developer"],
    "required_project_types": ["High Throughput E-Commerce Backend", "Real-time Event Processing App"],
    "min_cgpa": 7.5,
    "core_focus": ["Concurrency & Multithreading", "Low-Level System Design", "Microservices Architecture"]
  },

  "swiggy": {
    "name": "Swiggy",
    "required_languages": ["Java", "Go", "Python", "JavaScript"],
    "required_frameworks": ["Spring Boot", "Node.js", "React Native", "Redis"],
    "required_tools": ["Git", "Docker", "Kafka", "PostgreSQL", "AWS"],
    "required_certifications": ["Backend Systems Certification", "Cloud Practitioner"],
    "required_project_types": ["Real-time Geo-location Tracking Service", "Microservices Backend System"],
    "min_cgpa": 7.0,
    "core_focus": ["Microservices", "Event-Driven Architecture", "Caching & DB Optimization"]
  },

  "uber": {
    "name": "Uber",
    "required_languages": ["Go", "Java", "Python", "C++"],
    "required_frameworks": ["gRPC", "Kafka", "React", "Node.js"],
    "required_tools": ["Git", "Docker", "Kubernetes", "PostgreSQL", "Grafana"],
    "required_certifications": ["Cloud Native Computing Certification", "Distributed Computing"],
    "required_project_types": ["Real-Time Distributed System", "High Concurrency API Engine"],
    "min_cgpa": 8.0,
    "core_focus": ["Distributed Algorithms", "High Availability Systems", "Low Latency Architecture"]
  },

  "atlassian": {
    "name": "Atlassian",
    "required_languages": ["Java", "TypeScript", "Kotlin", "Python"],
    "required_frameworks": ["Spring Boot", "React", "GraphQL", "Node.js"],
    "required_tools": ["Git", "Docker", "AWS", "JIRA API", "PostgreSQL"],
    "required_certifications": ["AWS Solutions Architect", "Agile Software Development"],
    "required_project_types": ["Collaborative Full Stack SaaS App", "Microfrontend / REST API Service"],
    "min_cgpa": 7.5,
    "core_focus": ["Clean Code & Refactoring", "System Design", "UI/UX & REST API Best Practices"]
  },

  "razorpay": {
    "name": "Razorpay",
    "required_languages": ["Go", "PHP", "Python", "Java", "JavaScript"],
    "required_frameworks": ["Node.js", "Laravel", "React", "Spring Boot"],
    "required_tools": ["Git", "Docker", "PostgreSQL", "Redis", "Kafka", "AWS"],
    "required_certifications": ["FinTech Systems Certification", "AWS Cloud Practitioner"],
    "required_project_types": ["Financial Payment Integration API", "Secure Transaction Processing Engine"],
    "min_cgpa": 7.0,
    "core_focus": ["API Security & Authentication", "Database ACID Transactions", "Idempotent API Design"]
  }
};

export const ROLE_REQUIREMENTS = {
  "software developer": {
    "name": "Software Developer",
    "required_languages": ["Java", "Python", "C++", "JavaScript", "SQL"],
    "required_frameworks": ["Spring Boot", "React", "Node.js", "Express.js"],
    "required_tools": ["Git", "Docker", "Postman", "Linux", "VS Code"],
    "required_certifications": ["Java SE Programmer", "AWS Certified Cloud Practitioner", "Problem Solving Certification"],
    "required_project_types": ["Full Stack Web Application", "RESTful API Backend", "Data Structures & Algorithms Project"],
    "min_cgpa": 7.0,
    "core_focus": ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Database Management", "Git Version Control"]
  },

  "backend engineer": {
    "name": "Backend Engineer",
    "required_languages": ["Java", "Python", "Go", "Node.js", "SQL"],
    "required_frameworks": ["Spring Boot", "Express.js", "Django", "FastAPI", "NestJS"],
    "required_tools": ["Git", "Docker", "PostgreSQL", "MongoDB", "Redis", "Postman"],
    "required_certifications": ["AWS Certified Developer", "MongoDB Certified Developer", "Backend Systems Specialist"],
    "required_project_types": ["Microservices Backend Architecture", "REST & GraphQL API Service", "Database Optimization Project"],
    "min_cgpa": 7.0,
    "core_focus": ["API Design & Security", "Database Schema Design", "Caching & Query Optimization", "System Architecture"]
  },

  "frontend engineer": {
    "name": "Frontend Engineer",
    "required_languages": ["JavaScript", "TypeScript", "HTML5", "CSS3"],
    "required_frameworks": ["React", "Next.js", "Vue.js", "Tailwind CSS", "Redux"],
    "required_tools": ["Git", "Webpack", "Vite", "npm/yarn", "Chrome DevTools", "Figma"],
    "required_certifications": ["Meta Front-End Developer Certificate", "Responsive Web Design Certification"],
    "required_project_types": ["Responsive Single Page Application (SPA)", "Dashboard with Live Charts", "UI Design System Implementation"],
    "min_cgpa": 6.5,
    "core_focus": ["Component Architecture", "State Management", "Web Performance Optimization", "Cross-browser Compatibility"]
  },

  "full stack developer": {
    "name": "Full Stack Developer",
    "required_languages": ["JavaScript", "TypeScript", "Java", "Python", "SQL"],
    "required_frameworks": ["React", "Node.js", "Express.js", "Spring Boot", "Next.js"],
    "required_tools": ["Git", "Docker", "Postman", "MongoDB", "PostgreSQL", "AWS"],
    "required_certifications": ["Full Stack Web Developer Certification", "AWS Cloud Practitioner"],
    "required_project_types": ["End-to-End Full Stack Application", "E-commerce Platform", "Real-Time Chat & Notification App"],
    "min_cgpa": 7.0,
    "core_focus": ["Frontend & Backend Integration", "RESTful API Development", "Database Operations", "Deployment & Hosting"]
  },

  "data engineer": {
    "name": "Data Engineer",
    "required_languages": ["Python", "SQL", "Scala", "Java", "Bash"],
    "required_frameworks": ["Apache Spark", "Apache Airflow", "Hadoop", "Pandas"],
    "required_tools": ["Git", "Docker", "Snowflake", "PostgreSQL", "Kafka", "AWS Redshift"],
    "required_certifications": ["Google Cloud Professional Data Engineer", "AWS Certified Data Analytics"],
    "required_project_types": ["ETL Data Pipeline Project", "Data Warehousing Architecture", "Big Data Streaming Pipeline"],
    "min_cgpa": 7.0,
    "core_focus": ["Data Modeling", "ETL/ELT Pipeline Orchestration", "SQL Performance Tuning", "Big Data Frameworks"]
  },

  "devops engineer": {
    "name": "DevOps Engineer",
    "required_languages": ["Python", "Bash", "Go", "YAML"],
    "required_frameworks": ["Terraform", "Ansible", "Helm"],
    "required_tools": ["Git", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "AWS", "Prometheus", "Grafana"],
    "required_certifications": ["Certified Kubernetes Administrator (CKA)", "AWS Certified DevOps Engineer", "Docker Certified Associate"],
    "required_project_types": ["CI/CD Automated Deployment Pipeline", "Infrastructure as Code (IaC) Setup", "Kubernetes Cluster Management"],
    "min_cgpa": 6.5,
    "core_focus": ["CI/CD Pipeline Automation", "Containerization & Orchestration", "Cloud Infrastructure", "Monitoring & Logging"]
  },

  "data scientist": {
    "name": "Data Scientist",
    "required_languages": ["Python", "R", "SQL"],
    "required_frameworks": ["Scikit-Learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Matplotlib"],
    "required_tools": ["Git", "Jupyter Notebooks", "Docker", "MLflow", "Tableau"],
    "required_certifications": ["IBM Data Science Professional Certificate", "TensorFlow Developer Certificate"],
    "required_project_types": ["Predictive Machine Learning Model", "Natural Language Processing (NLP) App", "Exploratory Data Analysis & Viz"],
    "min_cgpa": 7.5,
    "core_focus": ["Statistics & Probability", "Machine Learning Algorithms", "Feature Engineering", "Data Visualization"]
  },

  "ml engineer": {
    "name": "ML Engineer",
    "required_languages": ["Python", "C++", "SQL"],
    "required_frameworks": ["PyTorch", "TensorFlow", "OpenCV", "Scikit-Learn", "FastAPI"],
    "required_tools": ["Git", "Docker", "MLflow", "DVC", "CUDA", "AWS SageMaker"],
    "required_certifications": ["AWS Certified Machine Learning - Specialty", "Deep Learning Specialization"],
    "required_project_types": ["End-to-End Machine Learning API", "Computer Vision Inspection System", "Deep Learning Recommendation Engine"],
    "min_cgpa": 7.5,
    "core_focus": ["Deep Learning Architectures", "ML Model Deployment (MLOps)", "Model Optimization & Quantization"]
  },

  "mobile app developer": {
    "name": "Mobile App Developer",
    "required_languages": ["Kotlin", "Swift", "Dart", "JavaScript", "TypeScript"],
    "required_frameworks": ["Flutter", "React Native", "Android Jetpack", "SwiftUI"],
    "required_tools": ["Git", "Android Studio", "Xcode", "Firebase", "Postman"],
    "required_certifications": ["Associate Android Developer", "Meta iOS / Android Developer Certificate"],
    "required_project_types": ["Cross-Platform Mobile Application", "Native Android/iOS App with Offline Sync", "Location-based Mobile App"],
    "min_cgpa": 6.5,
    "core_focus": ["Mobile UI/UX Design", "REST API Integration", "Local Storage & Caching", "App Store / Play Store Deployment"]
  },

  "cyber security analyst": {
    "name": "Cyber Security Analyst",
    "required_languages": ["Python", "Bash", "C", "SQL", "PowerShell"],
    "required_frameworks": ["Metasploit", "Nmap", "Wireshark", "Snort"],
    "required_tools": ["Git", "Burp Suite", "Kali Linux", "Splunk", "Nessus"],
    "required_certifications": ["CompTIA Security+", "Certified Ethical Hacker (CEH)", "CISSP"],
    "required_project_types": ["Vulnerability Assessment & Penetration Testing", "Security Information and Event Management (SIEM) Setup"],
    "min_cgpa": 6.5,
    "core_focus": ["Network Security", "Ethical Hacking & Vulnerability Scanning", "Incident Response", "Security Compliance"]
  }
};
