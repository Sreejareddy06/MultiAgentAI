from services.llm_service import generate_response

def research(query):

    prompt = f"""
    Create a professional research report on: {query}

    Include:
    1. Overview
    2. Key Findings
    3. Benefits
    4. Challenges
    5. Conclusion

    Format the report clearly.
    """

    summary = generate_response(prompt)

    return {
        "agent": "Research Agent",
        "query": query,
        "summary": summary
    }