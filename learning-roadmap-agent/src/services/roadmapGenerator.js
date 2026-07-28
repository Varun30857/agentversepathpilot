/**
 * Goal-Based AI Agent: Learning Roadmap Generator
 * Analyzes structured student profile and generates a personalized 4-8 week learning roadmap.
 */

export function generateLearningRoadmap(inputPayload) {
  const profile = inputPayload?.profile || inputPayload || {};

  // Extract student profile data safely
  const domain = profile.preferred_domain || "Software Development";
  const hours = Number(profile.study_hours_per_day) || 2;
  const skills = profile.technical_skills || {};
  
  const langs = skills.programming_languages || [];
  const frameworks = skills.frameworks || [];
  const databases = skills.databases || [];
  const tools = skills.tools || [];
  const projects = profile.projects || [];
  const certs = profile.certifications || [];

  // Determine duration based on skill depth and study capacity (4 to 8 weeks)
  let durationWeeks = 8;
  if (langs.length <= 2 && frameworks.length === 0 && projects.length === 0) {
    durationWeeks = 4;
  } else if (hours < 3) {
    durationWeeks = 6;
  } else {
    durationWeeks = 8;
  }

  // Generate customized weekly modules based on domain
  const weeks = [];

  for (let w = 1; w <= durationWeeks; w++) {
    weeks.push(buildWeeklyModule(w, durationWeeks, domain, langs, frameworks, databases, tools, hours));
  }

  return {
    learning_roadmap: {
      duration: `${durationWeeks} Weeks`,
      weeks
    }
  };
}

function buildWeeklyModule(weekNum, totalWeeks, domain, langs, frameworks, databases, tools, hours) {
  const primaryLang = langs[0] || (domain.includes("AI") || domain.includes("Data") ? "Python" : "JavaScript");
  const secondaryLang = langs[1] || "TypeScript";

  // Domain-specific customization maps
  if (domain.includes("AI") || domain.includes("Machine Learning") || domain.includes("Data")) {
    return buildAIMLWeek(weekNum, totalWeeks, primaryLang, hours);
  } else if (domain.includes("Cloud") || domain.includes("DevOps")) {
    return buildDevOpsWeek(weekNum, totalWeeks, primaryLang, hours);
  } else if (domain.includes("Cybersecurity") || domain.includes("Security")) {
    return buildSecurityWeek(weekNum, totalWeeks, primaryLang, hours);
  } else {
    // Default to Full-Stack / Software Development
    return buildFullStackWeek(weekNum, totalWeeks, primaryLang, secondaryLang, hours);
  }
}

/* Domain Generator: Full-Stack / Software Engineering */
function buildFullStackWeek(w, total, primaryLang, secondaryLang, hours) {
  const weekTemplates = [
    {
      week: 1,
      goal: `Master advanced ${primaryLang} Data Structures & Core Problem-Solving Patterns`,
      topics: [
        `${primaryLang} Memory Management, Closures, and Execution Context`,
        "Two-Pointer, Sliding Window, and Fast/Slow Pointers algorithms",
        "Stack, Queue, and Hash Table Time/Space Complexity optimization"
      ],
      tasks: [
        `Implement custom Linked Lists and Stacks in ${primaryLang}.`,
        `Solve 10 LeetCode Medium array & sliding window problems.`,
        `Analyze algorithmic Big-O space and time complexity for custom implementations.`
      ],
      coding_practice: `Solve ${hours * 2} LeetCode / HackerRank problems daily concentrating on Two Pointers & Sliding Window patterns.`,
      mini_project: `Algorithmic Data Structure Visualizer in ${primaryLang}.`,
      resources: [
        {
          title: "NeetCode 150 Roadmap & Data Structures",
          type: "Practice Platform",
          link: "https://neetcode.io/roadmap"
        },
        {
          title: `${primaryLang} Language Specification & Data Structures Guide`,
          type: "Documentation",
          link: "https://developer.mozilla.org/"
        }
      ],
      milestone: `Successfully complete 15 Data Structure coding challenges with optimal space & time complexity.`
    },
    {
      week: 2,
      goal: "Master Advanced Graph Algorithms and Dynamic Programming Patterns",
      topics: [
        "Graph Representation (Adjacency List/Matrix), BFS, and DFS",
        "Shortest Path Algorithms (Dijkstra, Topological Sort)",
        "Dynamic Programming (1D/2D Memoization vs Tabulation)"
      ],
      tasks: [
        "Implement Graph traversal routines in code.",
        "Solve 12 Graph & DP questions on LeetCode.",
        "Refactor recursive solutions to iterative DP with space optimization."
      ],
      coding_practice: `Dedicate ${hours} hours daily solving Graph and 0/1 Knapsack DP problems.`,
      mini_project: "Interactive Maze Pathfinder Visualizer using BFS & Dijkstra.",
      resources: [
        {
          title: "MIT OpenCourseWare - Introduction to Algorithms",
          type: "Course",
          link: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/"
        },
        {
          title: "Grokking Dynamic Programming Patterns",
          type: "Documentation",
          link: "https://leetcode.com/discuss/general-discussion/458695/Dynamic-Programming-Patterns"
        }
      ],
      milestone: "Solve 15 Graph and Dynamic Programming LeetCode Medium questions independently."
    },
    {
      week: 3,
      goal: "Build Scalable RESTful Backend Microservices with Authentication",
      topics: [
        "Asynchronous Execution, Streams, and Event Loop Mechanics",
        "RESTful API Design, Middleware Chaining, and Input Validation",
        "JSON Web Tokens (JWT), Refresh Tokens, and Password Hashing (bcrypt)"
      ],
      tasks: [
        "Construct Express/FastAPI modular REST server.",
        "Implement secure JWT authentication middleware with role-based access control.",
        "Write Postman test suites validating API success & error edge cases."
      ],
      coding_practice: "Write custom middleware for rate limiting and request logging from scratch.",
      mini_project: "Secure Multi-Tenant Auth & Role Authorization Microservice.",
      resources: [
        {
          title: "Node.js Official Documentation & API Reference",
          type: "Documentation",
          link: "https://nodejs.org/en/docs/"
        },
        {
          title: "RESTful Web API Design Handbook",
          type: "Documentation",
          link: "https://restfulapi.net/"
        }
      ],
      milestone: "Deploy a zero-vulnerability authenticated REST backend with complete Swagger/OpenAPI docs."
    },
    {
      week: 4,
      goal: "Master Modern React Frontend Architecture and State Optimization",
      topics: [
        "React Component Lifecycle, Virtual DOM, and Hook Optimizations (useMemo, useCallback)",
        "Centralized State Management using Redux Toolkit & Context API",
        "Frontend Performance Optimization (Code Splitting, Lazy Loading)"
      ],
      tasks: [
        "Refactor UI component trees eliminating redundant re-renders.",
        "Configure Redux Toolkit store with async thunks for asynchronous state synchronization.",
        "Implement route-based code splitting using React.lazy & Suspense."
      ],
      coding_practice: "Build reusable UI hooks for debounced search, infinitescroll, and API caching.",
      mini_project: "Real-Time Interactive Analytics & Data Dashboard UI.",
      resources: [
        {
          title: "React.js Official Documentation",
          type: "Documentation",
          link: "https://react.dev/"
        },
        {
          title: "Redux Toolkit Official Essentials Guide",
          type: "Documentation",
          link: "https://redux-toolkit.js.org/"
        }
      ],
      milestone: "Achieve Google Lighthouse Performance score above 90 on a multi-view React application."
    },
    {
      week: 5,
      goal: "Database Design, Query Optimization, Indexing, and Caching Strategies",
      topics: [
        "Relational Schema Design, 3NF Normalization, and ACID Properties",
        "B-Tree Indexing, Hash Indexes, and EXPLAIN Query Execution Plan Analysis",
        "In-Memory Caching Strategies (Cache-Aside, Write-Through) with Redis"
      ],
      tasks: [
        "Design normalized PostgreSQL schema for high-concurrency workloads.",
        "Profile and optimize slow SQL queries with compound indexing.",
        "Integrate Redis in backend service to cache hot database query results."
      ],
      coding_practice: "Practice writing complex SQL joins, CTEs, and Window functions.",
      mini_project: "High-Performance Redis Caching Layer for Product E-Commerce Catalog.",
      resources: [
        {
          title: "PostgreSQL Official Documentation",
          type: "Documentation",
          link: "https://www.postgresql.org/docs/"
        },
        {
          title: "Redis University - Data Structures & Caching",
          type: "Course",
          link: "https://university.redis.io/"
        }
      ],
      milestone: "Reduce backend API response times by 80% using Redis caching and SQL indexing."
    },
    {
      week: 6,
      goal: "Containerization with Docker, Multi-Stage Builds, and CI/CD Automation",
      topics: [
        "Docker Engine Architecture, Image Layers, and Multi-Stage Dockerfiles",
        "Orchestrating Multi-Container Environments with Docker Compose",
        "Automated CI/CD Workflows using GitHub Actions"
      ],
      tasks: [
        "Write production-optimized Dockerfiles reducing container sizes below 150MB.",
        "Create docker-compose.yml tying Frontend, Backend, PostgreSQL, and Redis together.",
        "Build a GitHub Actions workflow that executes tests and builds Docker containers automatically."
      ],
      coding_practice: "Write bash scripts for automated container health checks and deployment validation.",
      mini_project: "Automated Multi-Container DevOps Pipeline with GitHub Actions.",
      resources: [
        {
          title: "Docker Official Guides & Best Practices",
          type: "Documentation",
          link: "https://docs.docker.com/"
        },
        {
          title: "GitHub Actions Documentation",
          type: "Documentation",
          link: "https://docs.github.com/en/actions"
        }
      ],
      milestone: "Achieve automated zero-touch build, test, and container packaging on git repository push."
    },
    {
      week: 7,
      goal: "High-Level System Design, Load Balancing, and Scalability Architecture",
      topics: [
        "Horizontal vs Vertical Scaling, Reverse Proxies, and Nginx Load Balancing",
        "Database Sharding, Read-Replicas, and CAP Theorem",
        "Distributed System Design Patterns (Rate Limiters, URL Shorteners)"
      ],
      tasks: [
        "Draw high-level system architecture diagrams for high-throughput applications.",
        "Configure Nginx reverse proxy load-balancing requests across server clusters.",
        "Estimate bandwidth, storage, and QPS metrics for system scale requirements."
      ],
      coding_practice: "Practice object-oriented design and distributed system trade-off analysis.",
      mini_project: "Distributed URL Shortener Service with Nginx Load Balancing & Analytics.",
      resources: [
        {
          title: "System Design Primer by Donne Martin",
          type: "Documentation",
          link: "https://github.com/donnemartin/system-design-primer"
        },
        {
          title: "High Scalability Distributed Systems Architecture",
          type: "Documentation",
          link: "http://highscalability.com/"
        }
      ],
      milestone: "Produce complete production architecture docs for a system scaling to 100k daily active users."
    },
    {
      week: 8,
      goal: "Full-Stack Production Capstone Integration, Automated Testing & Cloud Deployment",
      topics: [
        "End-to-End System Integration and Production Architecture",
        "Comprehensive Automated Testing (Unit, Integration, and E2E with Jest/Playwright)",
        "Cloud Hosting (AWS/Vercel/Render) with SSL and Structured Monitoring"
      ],
      tasks: [
        "Integrate React UI, API Microservices, PostgreSQL, and Redis into unified capstone app.",
        "Write Jest test suite targeting >80% statement and branch coverage.",
        "Deploy production application to cloud platform with domain configuration."
      ],
      coding_practice: "Conduct code refactoring according to SOLID and Clean Code standards.",
      mini_project: "Production-Ready Placement Intelligence Platform Capstone.",
      resources: [
        {
          title: "Jest JavaScript Testing Framework Documentation",
          type: "Documentation",
          link: "https://jestjs.io/"
        },
        {
          title: "AWS Cloud Deployment Guides",
          type: "Documentation",
          link: "https://aws.amazon.com/free/"
        }
      ],
      milestone: "Deploy a live full-stack capstone web application with CI/CD, SSL, and automated testing."
    }
  ];

  return weekTemplates[w - 1] || weekTemplates[weekTemplates.length - 1];
}

/* Domain Generator: AI & Machine Learning */
function buildAIMLWeek(w, total, primaryLang, hours) {
  const aiTemplates = [
    {
      week: 1,
      goal: "Master Python Data Science Stack (NumPy, Pandas) & Mathematical Foundations",
      topics: ["Vectorized Matrix Operations in NumPy", "Pandas Data Cleaning & Feature Engineering", "Linear Algebra & Calculus for ML"],
      tasks: ["Perform EDA on structured dataset.", "Clean missing data and encode categorical features."],
      coding_practice: `Spend ${hours} hours daily solving Pandas & NumPy manipulation exercises.`,
      mini_project: "Automated Exploratory Data Analysis (EDA) Pipeline CLI.",
      resources: [
        { title: "Pandas User Guide", type: "Documentation", link: "https://pandas.pydata.org/docs/" },
        { title: "Kaggle Python & Data Science Courses", type: "Practice Platform", link: "https://www.kaggle.com/learn" }
      ],
      milestone: "Complete end-to-end data cleaning & feature processing pipeline."
    },
    {
      week: 2,
      goal: "Supervised & Unsupervised Machine Learning with Scikit-Learn",
      topics: ["Regression & Classification Algorithms", "Decision Trees, Random Forests, XGBoost", "Clustering (K-Means) & PCA"],
      tasks: ["Train baseline classification models.", "Perform hyperparameter tuning with GridSearchCV."],
      coding_practice: "Implement Gradient Descent algorithm from scratch in NumPy.",
      mini_project: "Predictive Analytics Model with Hyperparameter Tuning.",
      resources: [
        { title: "Scikit-Learn Documentation", type: "Documentation", link: "https://scikit-learn.org/stable/" }
      ],
      milestone: "Train a model achieving >92% F1-score on benchmark dataset."
    },
    {
      week: 3,
      goal: "Deep Learning Foundations & Neural Networks with PyTorch",
      topics: ["Tensors, Autograd, and Backpropagation", "Building Custom PyTorch Modules & Loss Functions", "Optimizers (Adam, SGD)"],
      tasks: ["Build 3-layer neural network in PyTorch.", "Implement training loop with validation metrics."],
      coding_practice: "Write custom PyTorch Dataset & DataLoader objects.",
      mini_project: "Deep Neural Network Classifier in PyTorch.",
      resources: [
        { title: "PyTorch Official Tutorials", type: "Documentation", link: "https://pytorch.org/tutorials/" }
      ],
      milestone: "Train a PyTorch neural net avoiding overfitting on test data."
    },
    {
      week: 4,
      goal: "Computer Vision & Convolutional Neural Networks (CNNs)",
      topics: ["CNN Architectures (ResNet, VGG)", "Transfer Learning with Pretrained Weights", "Image Data Augmentation"],
      tasks: ["Fine-tune ResNet-50 on custom image dataset.", "Apply OpenCV preprocessing."],
      coding_practice: "Build image pipeline with albumentations and PyTorch.",
      mini_project: "Image Anomaly Classification Engine.",
      resources: [
        { title: "Fast.ai Practical Deep Learning", type: "Course", link: "https://course.fast.ai/" }
      ],
      milestone: "Deploy fine-tuned vision model with high classification accuracy."
    },
    {
      week: 5,
      goal: "Natural Language Processing (NLP) & Transformer Models",
      topics: ["Text Tokenization & Word Embeddings", "Attention Mechanisms & Transformer Architecture", "HuggingFace Transformers API"],
      tasks: ["Fine-tune BERT model for sentiment analysis.", "Build embeddings pipeline with HuggingFace."],
      coding_practice: "Tokenize and batch text datasets for LLM fine-tuning.",
      mini_project: "Transformer-Based Text Classification Service.",
      resources: [
        { title: "HuggingFace NLP Course", type: "Course", link: "https://huggingface.co/learn/nlp-course" }
      ],
      milestone: "Fine-tune Transformer model achieving state-of-the-art accuracy."
    },
    {
      week: 6,
      goal: "Retrieval-Augmented Generation (RAG) & Vector Databases",
      topics: ["Vector Embeddings & Similarity Metrics", "Pinecone / Chroma Vector DB Indexing", "LangChain / LlamaIndex Orchestration"],
      tasks: ["Ingest PDF documents into vector database.", "Build RAG query system answering user questions with context."],
      coding_practice: "Write custom semantic search query handlers with vector similarity.",
      mini_project: "Enterprise RAG Q&A Assistant.",
      resources: [
        { title: "Pinecone Vector Database Docs", type: "Documentation", link: "https://docs.pinecone.io/" }
      ],
      milestone: "Build functional RAG pipeline with high context retrieval precision."
    },
    {
      week: 7,
      goal: "ML Model Deployment & FastAPI Endpoint Integration",
      topics: ["Model Serialization (ONNX, PyTorch JIT)", "FastAPI REST Endpoints for ML Models", "Dockerizing Machine Learning Apps"],
      tasks: ["Wrap PyTorch model in FastAPI endpoint.", "Package model and dependencies into Docker container."],
      coding_practice: "Optimize model inference speed using batch predictions.",
      mini_project: "Containerized Real-Time Model Inference API.",
      resources: [
        { title: "FastAPI Official Documentation", type: "Documentation", link: "https://fastapi.tiangolo.com/" }
      ],
      milestone: "Deploy low-latency containerized model API serving live REST requests."
    },
    {
      week: 8,
      goal: "MLOps Pipelines, Monitoring & Cloud Deployment",
      topics: ["MLflow Experiment Tracking & Model Registry", "Model Drift Detection", "Deployment on GCP / AWS Sagemaker"],
      tasks: ["Track ML training runs using MLflow.", "Deploy model API to cloud endpoint with monitoring."],
      coding_practice: "Automate model retraining trigger on new dataset upload.",
      mini_project: "Production MLOps End-to-End Pipeline Capstone.",
      resources: [
        { title: "MLflow Documentation", type: "Documentation", link: "https://mlflow.org/docs/latest/index.html" }
      ],
      milestone: "Deploy complete MLOps pipeline with automated tracking and cloud endpoints."
    }
  ];

  return aiTemplates[w - 1] || aiTemplates[aiTemplates.length - 1];
}

/* Domain Generator: DevOps & Cloud */
function buildDevOpsWeek(w, total, primaryLang, hours) {
  const devopsTemplates = [
    {
      week: 1,
      goal: "Linux Administration, Networking Foundations, and Shell Scripting",
      topics: ["Linux OS Kernel & File System", "Bash Scripting & Automation", "Networking Protocols (TCP/IP, DNS, SSH, HTTP)"],
      tasks: ["Write automated system setup shell script.", "Configure SSH keys and Linux user permissions."],
      coding_practice: "Write Bash scripts for log parsing and cron job management.",
      mini_project: "System Health Monitoring Shell Utility.",
      resources: [
        { title: "Linux Command Line Guide", type: "Documentation", link: "https://linuxcommand.org/" }
      ],
      milestone: "Automate server setup using modular Bash scripts."
    },
    {
      week: 2,
      goal: "Containerization with Docker Engine and Multi-Stage Builds",
      topics: ["Docker Containers vs VMs", "Writing Efficient Dockerfiles", "Docker Compose Orchestration"],
      tasks: ["Containerize Python/Node web application.", "Set up local multi-container stack with Postgres & Redis."],
      coding_practice: "Create minimal alpine-based Docker images.",
      mini_project: "Containerized Web Stack Deployment.",
      resources: [
        { title: "Docker Guides", type: "Documentation", link: "https://docs.docker.com/" }
      ],
      milestone: "Package application into lightweight secure Docker container."
    },
    {
      week: 3,
      goal: "Infrastructure as Code (IaC) with Terraform & Cloud Provisioning",
      topics: ["Terraform HCL Syntax & State Management", "Provisioning AWS VPC, Subnets, and EC2", "Modular Terraform Code"],
      tasks: ["Write Terraform code to provision AWS cloud resources.", "Store Terraform state securely in S3 backend."],
      coding_practice: "Define reusable Terraform modules for network infrastructure.",
      mini_project: "Automated AWS Cloud Infrastructure Provisioning.",
      resources: [
        { title: "Terraform Official Documentation", type: "Documentation", link: "https://developer.hashicorp.com/terraform" }
      ],
      milestone: "Provision entire cloud network infrastructure using single Terraform apply command."
    },
    {
      week: 4,
      goal: "Kubernetes Cluster Management & Orchestration",
      topics: ["Kubernetes Architecture (Control Plane, Nodes)", "Pods, Deployments, Services, and Ingress", "ConfigMaps and Secrets"],
      tasks: ["Deploy multi-pod application on local Minikube cluster.", "Configure Ingress controller for domain routing."],
      coding_practice: "Write Kubernetes YAML manifests for rolling updates.",
      mini_project: "Resilient Kubernetes Application Cluster Deployment.",
      resources: [
        { title: "Kubernetes Official Tutorials", type: "Documentation", link: "https://kubernetes.io/docs/tutorials/" }
      ],
      milestone: "Deploy zero-downtime application cluster with auto-scaling rules."
    },
    {
      week: 5,
      goal: "CI/CD Pipelines with GitHub Actions & GitOps with ArgoCD",
      topics: ["Automated Build & Test Pipelines", "Docker Image Push to AWS ECR", "GitOps Deployment with ArgoCD"],
      tasks: ["Set up GitHub Actions CI workflow.", "Configure ArgoCD to sync cluster state with Git repository."],
      coding_practice: "Write pipeline YAML files with secret management.",
      mini_project: "GitOps Automated Continuous Delivery Pipeline.",
      resources: [
        { title: "ArgoCD Official Guide", type: "Documentation", link: "https://argo-cd.readthedocs.io/" }
      ],
      milestone: "Achieve automated deployment to Kubernetes cluster on git push."
    },
    {
      week: 6,
      goal: "Observability, Monitoring & Logging (Prometheus & Grafana)",
      topics: ["Metrics Collection with Prometheus", "Dashboards with Grafana", "Centralized Logging with Loki / ELK"],
      tasks: ["Instrument web application with Prometheus metrics.", "Build custom Grafana dashboard for CPU/Memory metrics."],
      coding_practice: "Create alert manager rules for high CPU usage.",
      mini_project: "Full-Stack Cloud Observability System.",
      resources: [
        { title: "Prometheus Docs", type: "Documentation", link: "https://prometheus.io/docs/" }
      ],
      milestone: "Set up real-time monitoring dashboard with triggered alerts."
    }
  ];

  return devopsTemplates[w - 1] || devopsTemplates[devopsTemplates.length - 1];
}

/* Domain Generator: Cybersecurity */
function buildSecurityWeek(w, total, primaryLang, hours) {
  const securityTemplates = [
    {
      week: 1,
      goal: "Linux Security, File Systems, and Networking Analysis",
      topics: ["Linux Permission Models & Hardening", "Network Protocols (TCP/IP, UDP, ICMP, DNS)", "Packet Analysis with Wireshark"],
      tasks: ["Capture and analyze PCAP files in Wireshark.", "Identify unencrypted passwords in network streams."],
      coding_practice: "Write Python scripts using Scapy for packet sniffing.",
      mini_project: "Network Traffic Packet Sniffer CLI.",
      resources: [
        { title: "Wireshark User Guide", type: "Documentation", link: "https://www.wireshark.org/docs/" }
      ],
      milestone: "Identify network anomalies and cleartext credentials from packet captures."
    },
    {
      week: 2,
      goal: "Web Application Security & OWASP Top 10 Vulnerabilities",
      topics: ["SQL Injection, Cross-Site Scripting (XSS), CSRF", "Authentication & Session Management Attacks", "Burp Suite Proxy Analysis"],
      tasks: ["Test web applications for OWASP Top 10 flaws.", "Use Burp Suite to intercept and modify HTTP requests."],
      coding_practice: "Write Python exploit payloads for SQL injection testing.",
      mini_project: "Automated OWASP Web Vulnerability Scanner.",
      resources: [
        { title: "OWASP Top 10 Web Application Vulnerabilities", type: "Documentation", link: "https://owasp.org/www-project-top-ten/" }
      ],
      milestone: "Conduct full security audit identifying web vulnerabilities."
    },
    {
      week: 3,
      goal: "Network Penetration Testing & Vulnerability Assessment",
      topics: ["Reconnaissance & Port Scanning with Nmap", "Metasploit Framework Exploitation", "Vulnerability Scanning"],
      tasks: ["Perform Nmap scans to detect open ports & service versions.", "Execute controlled exploits in sandbox lab."],
      coding_practice: "Write custom Nmap NSE scripts for vulnerability detection.",
      mini_project: "Automated Port & Service Recon Scanner.",
      resources: [
        { title: "Nmap Network Scanning Book", type: "Documentation", link: "https://nmap.org/book/" }
      ],
      milestone: "Generate comprehensive penetration test report for lab network."
    },
    {
      week: 4,
      goal: "Cryptography, Secure Communications & Key Management",
      topics: ["Symmetric & Asymmetric Encryption (AES, RSA)", "Hashing Functions (SHA-256) & Digital Signatures", "TLS/SSL Certificate Setup"],
      tasks: ["Implement end-to-end encrypted messaging script.", "Generate and manage SSL certificates with OpenSSL."],
      coding_practice: "Write Python script encrypting/decrypting data using AES-256.",
      mini_project: "End-to-End Encrypted File Transfer Tool.",
      resources: [
        { title: "Python Cryptography Library Docs", type: "Documentation", link: "https://cryptography.io/" }
      ],
      milestone: "Build secure file transfer tool with AES-GCM encryption."
    },
    {
      week: 5,
      goal: "Security Operations (SOC), SIEM & Incident Response",
      topics: ["Log Aggregation & SIEM Analysis", "Incident Response Lifecycles", "Malware Analysis Fundamentals"],
      tasks: ["Analyze Windows and Linux security event logs.", "Write YARA rules for malware signature detection."],
      coding_practice: "Create log parser detecting brute-force login attempts.",
      mini_project: "Automated SOC Security Log Audit Tool.",
      resources: [
        { title: "SANS Cyber Defense Guides", type: "Documentation", link: "https://www.sans.org/" }
      ],
      milestone: "Detect and mitigate simulated brute-force security incidents."
    },
    {
      week: 6,
      goal: "Cloud Security, IAM & DevSecOps Integration",
      topics: ["AWS IAM Roles, Policies, and S3 Security", "Static Application Security Testing (SAST)", "Container Vulnerability Scanning with Trivy"],
      tasks: ["Audit AWS IAM policies for least privilege violations.", "Integrate Trivy container security scanner into CI/CD."],
      coding_practice: "Write automated IAM policy compliance checker script.",
      mini_project: "DevSecOps Automated Pipeline Security Audit Capstone.",
      resources: [
        { title: "AWS Security Documentation", type: "Documentation", link: "https://docs.aws.amazon.com/security/" }
      ],
      milestone: "Deploy DevSecOps pipeline enforcing automated security gates."
    }
  ];

  return securityTemplates[w - 1] || securityTemplates[securityTemplates.length - 1];
}
