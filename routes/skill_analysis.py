import asyncio
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from services.groq_service import analyze_skill_gap

router = APIRouter(
    prefix="/skill-analysis",
    tags=["Skill Analysis"],
)


class SkillAnalysisRequest(BaseModel):
    skills: List[str]
    target_role: str


@router.post("")
async def skill_analysis_endpoint(request: SkillAnalysisRequest):
    """
    SkillMap AI Agent — compare current skills with target role requirements.
    Returns skill gap report and personalized learning roadmap.
    """
    if not request.target_role or not request.target_role.strip():
        raise HTTPException(status_code=400, detail="Please provide a target role.")

    if not request.skills:
        raise HTTPException(status_code=400, detail="Please provide at least one skill.")

    try:
        result = await asyncio.to_thread(
            analyze_skill_gap,
            request.skills,
            request.target_role.strip(),
        )
        return {
            "status": "ok",
            "message": f"Skill gap analysis complete for {request.target_role}",
            "data": result,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Skill analysis failed: {exc}")
