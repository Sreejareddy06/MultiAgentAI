def assess_risk(research_data):
    topic = research_data["query"]

    return {
        "agent": "Risk Agent",
        "risk": f"""
Risk Assessment Report for {topic}

Potential Risks:
1. Financial risks due to implementation costs.
2. Technical risks due to system failures.
3. Security and privacy concerns.
4. Regulatory and compliance challenges.

Severity:
Medium to High

Recommendation:
Careful planning and monitoring are required before adopting {topic}.
"""
    }