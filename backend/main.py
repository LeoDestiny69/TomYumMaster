from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/profile")
def get_profile():
    return {
        "name": "Tinna Sael",
        "title": "Fullstack Developer",
        "bio": "Passionate about building scalable web apps with modern tech."
    }

@app.get("/projects")
def get_projects():
    return [
        {"title": "AI Chatbot", "description": "Built with FastAPI and GPT"},
        {"title": "Portfolio Website", "description": "Frontend in React/Vite"}
    ]
