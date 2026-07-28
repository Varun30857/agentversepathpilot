from dotenv import load_dotenv

load_dotenv()

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.profile import router as profile_router
from routes.skill_analysis import router as skill_analysis_router
from routes.chat import router as chat_router


app = FastAPI(
    title="PathPilot AI",
    description="AI-powered Career Intelligence Platform — Resume Analysis, Skill Gap Mapping & Career Mentoring",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow React frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(profile_router)
app.include_router(skill_analysis_router)
app.include_router(chat_router)


@app.get("/", tags=["Health"])
def home():
    return {
        "app": "PathPilot AI",
        "version": "2.0.0",
        "status": "running",
        "message": "PathPilot AI Career Intelligence Platform is Running!",
        "endpoints": {
            "resume_upload": "/profile/analyze",
            "skill_analysis": "/skill-analysis",
            "career_chat": "/chat",
            "api_docs": "/docs",
        },
    }


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
