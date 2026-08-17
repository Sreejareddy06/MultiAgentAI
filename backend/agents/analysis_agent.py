def analyze(research_data):
    topic = research_data["query"]

    return {
        "agent": "Analysis Agent",
        "analysis": f"""
Analysis Report for {topic}

Key Findings:
1. The topic has significant impact across industries.
2. Adoption is increasing rapidly.
3. Multiple opportunities exist for growth and innovation.

Strengths:
- Improves efficiency
- Supports better decision making
- Enhances productivity

Challenges:
- Requires investment
- Needs skilled professionals
- May introduce operational complexity

Conclusion:
Overall, {topic} presents strong opportunities but requires proper planning and execution.
"""
    }