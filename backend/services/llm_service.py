import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=api_key,
    http_options={"api_version": "v1"}
)
def generate_response(prompt):
    try:
        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt
        )

        return interaction.output_text

    except Exception as e:
        error_message = str(e)

        if "quota" in error_message.lower() or "429" in error_message:
            return "Gemini API quota has been temporarily exceeded. Please try again later."

        return f"AI service error: {error_message}"

