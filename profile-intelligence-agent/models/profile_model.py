from pydantic import BaseModel
from typing import List, Optional


class Education(BaseModel):
    degree: Optional[str]
    college: Optional[str]
    cgpa: Optional[str]


class Project(BaseModel):
    title: Optional[str]
    technologies: List[str] = []


class Experience(BaseModel):
    company: Optional[str]
    role: Optional[str]
    duration: Optional[str]


class Profile(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]

    skills: List[str] = []

    education: List[Education] = []

    projects: List[Project] = []

    experience: List[Experience] = []

    certifications: List[str] = []

    programming_languages: List[str] = []

    frameworks: List[str] = []

    databases: List[str] = []

    tools: List[str] = []

    soft_skills: List[str] = []