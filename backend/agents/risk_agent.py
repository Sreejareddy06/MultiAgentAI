from services.llm_service import generate_response

def assess_risk(research_data):

    prompt = f"""
    Assess risks for the following topic.

    Research Report:
    {research_data['summary']}

    Provide:
    1. Technical Risks
    2. Financial Risks
    3. Security Risks
    4. Regulatory Risks
    5. Risk Severity
    6. Recommendations

    Format the response professionally.
    """

    risk = generate_response(prompt)

    return {
        "agent": "Risk Agent",
        "risk": risk
    }