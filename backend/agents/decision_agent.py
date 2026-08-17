from services.llm_service import generate_response

def make_decision(research_data, analysis_data, risk_data):

    prompt = f"""
    Based on the following information, make a final decision.

    Research:
    {research_data['summary']}

    Analysis:
    {analysis_data['analysis']}

    Risks:
    {risk_data['risk']}

    Provide:
    1. Final Decision
    2. Recommendation
    3. Confidence Score (0-100)
    4. Justification

    Format the response professionally.
    """

    decision = generate_response(prompt)

    return {
        "agent": "Decision Agent",
        "decision": decision
    }