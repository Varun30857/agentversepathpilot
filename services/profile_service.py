import asyncio
from pathlib import Path

from services.pdf_parser import extract_text
from services.groq_service import analyze_resume


async def analyze_profile(file) -> dict:
    if file is None or getattr(file, "file", None) is None:
        raise ValueError("No file was uploaded.")

    resume_text = await asyncio.to_thread(extract_text, file.file)

    if not resume_text or not str(resume_text).strip():
        raise ValueError("The uploaded PDF could not be read or appears empty.")

    # Load the enhanced system prompt
    prompt_path = Path("prompts/system_prompt.txt")
    prompt = prompt_path.read_text(encoding="utf-8") if prompt_path.exists() else None

    # Replace placeholder with actual resume text
    if prompt and "{RESUME_TEXT}" in prompt:
        prompt_with_text = prompt.replace("{RESUME_TEXT}", resume_text)
        result = await asyncio.to_thread(analyze_resume, resume_text, prompt_with_text)
    else:
        result = await asyncio.to_thread(analyze_resume, resume_text, prompt)

    return {
        "status": "ok",
        "message": "Resume analyzed successfully by PathPilot AI.",
        "analysis": result,
    }