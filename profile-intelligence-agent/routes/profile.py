from fastapi import APIRouter, UploadFile, File, HTTPException
from services.profile_service import analyze_profile


router = APIRouter(
    tags=["Resume Upload & Analysis"]
)


@router.post("/upload-resume")
@router.post("/profile/analyze")
async def analyze_profile_endpoint(file: UploadFile = File(...)):
    """
    ResumeSense AI Agent — Upload PDF resume, extract text, and run AI analysis.
    Supports POST /upload-resume and POST /profile/analyze.
    """
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a PDF resume file (.pdf only).")

    try:
        result = await analyze_profile(file)
        return result
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Resume analysis failed: {exc}")