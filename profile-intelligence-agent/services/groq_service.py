import os
import re
import json

try:
    from groq import Groq
except ImportError:  # pragma: no cover
    Groq = None


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _ensure_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        return [value]
    return list(value)


def _get_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key or Groq is None:
        return None
    return Groq(api_key=api_key)


def _call_llm(client, messages, temperature=0.2):
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=temperature,
        max_tokens=4096,
    )
    return response.choices[0].message.content or "{}"


def _clean_json(content):
    """Strip markdown fences and extract the JSON object/array."""
    cleaned = re.sub(r"```(?:json)?\s*", "", content)
    cleaned = re.sub(r"```\s*", "", cleaned)
    cleaned = cleaned.strip()
    # Find first { or [ to handle preamble text
    start = min(
        (cleaned.find("{") if cleaned.find("{") != -1 else len(cleaned)),
        (cleaned.find("[") if cleaned.find("[") != -1 else len(cleaned)),
    )
    if start < len(cleaned):
        cleaned = cleaned[start:]
    return cleaned


# ---------------------------------------------------------------------------
# Fallback analysis (when Groq is unavailable)
# ---------------------------------------------------------------------------

def _fallback_analysis(text: str) -> dict:
    text = (text or "").strip()
    lower = text.lower()

    name = "Candidate"
    first_line = next(
        (line.strip() for line in text.splitlines() if line.strip()), ""
    )
    if (
        first_line
        and len(first_line.split()) <= 4
        and not any(
            marker in first_line.lower()
            for marker in ["resume", "skills", "experience", "education"]
        )
    ):
        name = first_line

    skills = [
        s for s in [
            "python", "javascript", "react", "fastapi", "sql", "docker",
            "aws", "azure", "java", "c#", "node", "html", "css",
            "machine learning", "tensorflow", "pytorch"
        ]
        if s in lower
    ]
    prog_langs = [
        l for l in ["python", "javascript", "java", "c#", "c++", "go", "ruby", "php", "swift", "kotlin"]
        if l in lower
    ]
    frameworks = [
        f for f in ["react", "fastapi", "django", "flask", "spring", "vue", "angular", "express", "tensorflow", "pytorch", "tailwind"]
        if f in lower
    ]

    education = []
    if re.search(r"(bsc|bs|bachelor|master|msc|phd|university|college|b\.tech|m\.tech)", lower):
        education.append({"degree": "Higher Education (detected)", "institution": "See resume", "year": "", "gpa": ""})

    projects = []
    if re.search(r"project", lower):
        projects.append({"name": "Project details in resume", "description": "See uploaded resume", "technologies": skills[:3], "impact": ""})

    improvements = [
        "Add a professional summary section at the top of the resume.",
        "Quantify all achievements with metrics and measurable outcomes.",
        "Include direct links to your GitHub repositories.",
        "Add an industry certification (AWS/Google Cloud/Azure).",
        "Expand the skills section to cover DevOps and cloud tools.",
    ]

    return {
        "candidate_name": name,
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "github": "",
        "resume_score": 68,
        "experience_years": 0,
        "skills": skills or ["Communication", "Problem-solving", "Team collaboration"],
        "technical_skills": skills or ["Programming", "Problem-solving"],
        "soft_skills": ["Communication", "Teamwork"],
        "programming_languages": prog_langs,
        "frameworks": frameworks,
        "tools": ["Git"],
        "databases": [],
        "cloud_platforms": [],
        "projects": projects,
        "education": education,
        "experience": [],
        "certifications": [],
        "achievements": [],
        "strengths": [
            "Diverse technical skill set identified in the resume",
            "Educational background demonstrates academic commitment",
        ],
        "weaknesses": [
            "Resume could benefit from quantified achievements",
            "Consider adding more industry-relevant tools and technologies",
        ],
        "skill_gaps": ["Docker", "Cloud Platforms", "System Design", "CI/CD"],
        "improvement_suggestions": improvements,
        "career_readiness": {
            "software_developer": 60,
            "data_scientist": 35,
            "full_stack_developer": 55,
            "ai_engineer": 30,
            "devops_engineer": 20,
        },
        "learning_roadmap": [
            {
                "priority": 1,
                "skill": "Docker & Containerization",
                "reason": "Essential for modern development",
                "resources": ["Docker Docs", "Docker Tutorial on YouTube"],
                "estimated_time": "2-3 weeks",
            },
            {
                "priority": 2,
                "skill": "Cloud Fundamentals (AWS/GCP)",
                "reason": "Highly demanded in industry",
                "resources": ["AWS Free Tier", "Google Cloud Skills Boost"],
                "estimated_time": "4-6 weeks",
            },
        ],
    }


# ---------------------------------------------------------------------------
# Resume Analysis
# ---------------------------------------------------------------------------

def analyze_resume(text: str, prompt: str = None) -> dict:
    if not text or not str(text).strip():
        return _fallback_analysis("")

    # Build prompt
    if prompt:
        prompt_text = prompt.replace("{RESUME_TEXT}", text)
    else:
        prompt_text = f"""You are PathPilot AI — an expert career mentor.
Analyze the resume and return comprehensive JSON with fields:
candidate_name, email, phone, location, linkedin, github, resume_score (int 0-100),
experience_years (int), skills (list), technical_skills (list), soft_skills (list),
programming_languages (list), frameworks (list), tools (list), databases (list),
cloud_platforms (list), projects (list of objects with name/description/technologies/impact),
education (list of objects with degree/institution/year/gpa),
experience (list of objects with role/company/duration/description),
certifications (list), achievements (list),
strengths (list of 3-5 strings), weaknesses (list of 3-5 strings),
skill_gaps (list), improvement_suggestions (list of 5 strings),
career_readiness (object with software_developer/data_scientist/full_stack_developer/ai_engineer/devops_engineer scores 0-100),
learning_roadmap (list of objects with priority/skill/reason/resources/estimated_time).

Resume:
{text}

Return ONLY valid JSON, no markdown."""

    client = _get_client()
    if client is None:
        return _fallback_analysis(text)

    try:
        content = _call_llm(client, [{"role": "user", "content": prompt_text}])
        cleaned = _clean_json(content)
        parsed = json.loads(cleaned)

        if not isinstance(parsed, dict):
            return _fallback_analysis(text)

        # Normalise fields
        return {
            "candidate_name": parsed.get("candidate_name") or parsed.get("name") or "Candidate",
            "email": parsed.get("email") or "",
            "phone": parsed.get("phone") or "",
            "location": parsed.get("location") or "",
            "linkedin": parsed.get("linkedin") or "",
            "github": parsed.get("github") or "",
            "resume_score": int(parsed.get("resume_score") or 70),
            "experience_years": int(parsed.get("experience_years") or 0),
            "skills": _ensure_list(parsed.get("skills") or parsed.get("technical_skills")),
            "technical_skills": _ensure_list(parsed.get("technical_skills") or parsed.get("skills")),
            "soft_skills": _ensure_list(parsed.get("soft_skills")),
            "programming_languages": _ensure_list(parsed.get("programming_languages")),
            "frameworks": _ensure_list(parsed.get("frameworks")),
            "tools": _ensure_list(parsed.get("tools")),
            "databases": _ensure_list(parsed.get("databases")),
            "cloud_platforms": _ensure_list(parsed.get("cloud_platforms")),
            "projects": _ensure_list(parsed.get("projects")),
            "education": _ensure_list(parsed.get("education")),
            "experience": _ensure_list(parsed.get("experience")),
            "certifications": _ensure_list(parsed.get("certifications")),
            "achievements": _ensure_list(parsed.get("achievements")),
            "strengths": _ensure_list(parsed.get("strengths")),
            "weaknesses": _ensure_list(parsed.get("weaknesses")),
            "skill_gaps": _ensure_list(parsed.get("skill_gaps")),
            "improvement_suggestions": _ensure_list(
                parsed.get("improvement_suggestions") or parsed.get("improvements")
            ),
            "career_readiness": parsed.get("career_readiness") or {
                "software_developer": 60,
                "data_scientist": 35,
                "full_stack_developer": 55,
                "ai_engineer": 30,
                "devops_engineer": 20,
            },
            "learning_roadmap": _ensure_list(parsed.get("learning_roadmap")),
        }

    except (json.JSONDecodeError, Exception):
        return _fallback_analysis(text)


# ---------------------------------------------------------------------------
# Skill Gap Analysis (SkillMap AI Agent)
# ---------------------------------------------------------------------------

def _fallback_skill_gap(skills: list, target_role: str) -> dict:
    role_skills_map = {
        "software developer": ["Python", "JavaScript", "Git", "SQL", "REST APIs", "Docker", "System Design", "Testing"],
        "data scientist": ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "SQL", "Statistics", "Matplotlib", "Jupyter"],
        "ai engineer": ["Python", "TensorFlow", "PyTorch", "LLMs", "MLOps", "Docker", "FastAPI", "Prompt Engineering", "Vector DBs"],
        "full stack developer": ["React", "Node.js", "MongoDB", "PostgreSQL", "REST APIs", "Docker", "TypeScript", "CSS", "Git"],
        "devops engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux", "Git", "Prometheus", "Ansible"],
    }
    role_key = target_role.lower()
    required = role_skills_map.get(role_key, role_skills_map["software developer"])
    lower_skills = [s.lower() for s in skills]
    matched = [r for r in required if r.lower() in lower_skills]
    missing = [r for r in required if r.lower() not in lower_skills]
    readiness = int((len(matched) / len(required)) * 100) if required else 50

    return {
        "target_role": target_role,
        "skill_gap_percentage": 100 - readiness,
        "readiness_score": readiness,
        "current_skills_matched": matched,
        "missing_skills": [
            {"skill": s, "priority": "High", "category": "Core", "why_needed": f"Essential for {target_role}", "difficulty": "Medium"}
            for s in missing
        ],
        "required_skills_for_role": required,
        "learning_roadmap": [
            {
                "phase": i + 1,
                "title": f"Learn {skill}",
                "duration": "2-3 weeks",
                "skills": [skill],
                "resources": [{"name": f"{skill} Documentation", "type": "Documentation", "url": "https://google.com"}],
                "milestone": f"Build a project using {skill}",
            }
            for i, skill in enumerate(missing[:4])
        ],
        "recommended_projects": [],
        "certifications_recommended": [],
        "estimated_total_time": f"{len(missing) * 2}-{len(missing) * 3} weeks",
        "job_search_tips": [
            "Build a strong GitHub portfolio",
            "Apply to internships and entry-level roles",
            "Practice LeetCode problems daily",
            "Network on LinkedIn",
        ],
    }


def analyze_skill_gap(skills: list, target_role: str) -> dict:
    prompt_path = "prompts/skill_gap_prompt.txt"
    try:
        with open(prompt_path, encoding="utf-8") as f:
            prompt_template = f.read()
        prompt_text = (
            prompt_template
            .replace("{CURRENT_SKILLS}", ", ".join(skills))
            .replace("{TARGET_ROLE}", target_role)
        )
    except FileNotFoundError:
        prompt_text = f"""You are PathPilot AI career advisor.
Skills: {', '.join(skills)}
Target Role: {target_role}
Analyze skill gaps and return a JSON learning roadmap with fields:
target_role, skill_gap_percentage (0-100), readiness_score (0-100),
current_skills_matched (list), missing_skills (list of objects with skill/priority/category/why_needed/difficulty),
required_skills_for_role (list), learning_roadmap (list of phase objects),
recommended_projects (list), certifications_recommended (list),
estimated_total_time (string), job_search_tips (list).
Return ONLY valid JSON."""

    client = _get_client()
    if client is None:
        return _fallback_skill_gap(skills, target_role)

    try:
        content = _call_llm(client, [{"role": "user", "content": prompt_text}], temperature=0.3)
        cleaned = _clean_json(content)
        parsed = json.loads(cleaned)
        if isinstance(parsed, dict):
            return parsed
    except (json.JSONDecodeError, Exception):
        pass

    return _fallback_skill_gap(skills, target_role)


# ---------------------------------------------------------------------------
# Career Chat Assistant
# ---------------------------------------------------------------------------

def chat_with_assistant(message: str, resume_context: dict, conversation_history: list = None) -> str:
    if conversation_history is None:
        conversation_history = []

    # Load system prompt
    system_prompt_path = "prompts/chat_prompt.txt"
    try:
        with open(system_prompt_path, encoding="utf-8") as f:
            system_template = f.read()
        context_str = json.dumps(resume_context, indent=2) if resume_context else "No resume context available."
        system_content = system_template.replace("{RESUME_CONTEXT}", context_str)
    except FileNotFoundError:
        context_str = json.dumps(resume_context, indent=2) if resume_context else "No resume context."
        system_content = f"""You are PathPilot AI — an expert career mentor.
Resume context: {context_str}
Help the candidate with career advice, resume tips, and skill development. Be specific and encouraging."""

    messages = [{"role": "system", "content": system_content}]

    # Add conversation history (last 10 messages)
    for h in conversation_history[-10:]:
        messages.append({"role": h["role"], "content": h["content"]})

    messages.append({"role": "user", "content": message})

    client = _get_client()
    if client is None:
        return (
            "I'm currently unable to connect to the AI service. "
            "Please make sure your GROQ_API_KEY is configured in the .env file. "
            "In the meantime, I recommend reviewing your resume for quantifiable achievements, "
            "adding project links, and obtaining a cloud certification."
        )

    try:
        return _call_llm(client, messages, temperature=0.7)
    except Exception as e:
        return f"I encountered an error: {str(e)}. Please try again."