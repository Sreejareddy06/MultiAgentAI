from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agents.research_agent import research
from agents.analysis_agent import analyze
from agents.risk_agent import assess_risk
from agents.decision_agent import make_decision

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "project": "Multi-Agent AI Research & Decision Intelligence Platform",
        "status": "Running"
    }

@app.get("/research/{topic}")
def run_research(topic: str):
    return research(topic)

@app.get("/analysis/{topic}")
def run_analysis(topic: str):
    return analyze(topic)

@app.get("/workflow/{topic}")
def run_workflow(topic: str):
    research_result = research(topic)
    analysis_result = analyze(research_result)
    risk_result = assess_risk(research_result)
    decision_result = make_decision(
    research_result,
    analysis_result,
    risk_result
)
    return {
    "research": research_result,
    "analysis": analysis_result,
    "risk": risk_result,
    "decision": decision_result
}