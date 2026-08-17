def make_decision(research_data, analysis_data, risk_data):

    topic = research_data["query"]

    return {
        "agent": "Decision Agent",

        "decision": f"""
Final Decision Report for {topic}

Decision:
Proceed with implementation.

Reasoning:
1. Research indicates strong potential benefits.
2. Analysis shows positive opportunities.
3. Risks are manageable with proper planning.

Confidence Level:
85%

Recommendation:
Move forward with a phased implementation strategy and continuous monitoring.
""",

        "recommendation":
            "Move forward with a phased implementation strategy and continuous monitoring.",

        "confidence":
            "85%"
    }