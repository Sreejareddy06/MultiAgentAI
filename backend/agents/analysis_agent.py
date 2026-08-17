from services.llm_service import generate_response

def analyze(research_data):

    prompt = f"""
    Analyze the following research report.

    Research Report:
    {research_data['summary']}

    Provide:
    1. Key Findings
    2. Strengths
    3. Weaknesses
    4. Opportunities
    5. Conclusion

    Format the response professionally.
    """

    analysis = generate_response(prompt)

    return {
        "agent": "Analysis Agent",
        "analysis": analysis
    }