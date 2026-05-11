from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = None
if os.getenv("GROQ_API_KEY"):
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_interview_questions(jd, resume_text):
    if not client:
        return "Groq API key not configured."

    prompt = f"""
    Job Description:
    {jd}

    Candidate Resume:
    {resume_text}

    Generate:
    - 5 technical questions based on the candidate's experience and JD requirements.
    - 3 HR/Behavioral questions.
    - 2 scenario-based questions.
    
    Format the output as a JSON list of strings.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return response.choices[0].message.content

def evaluate_interview_responses(questions, answers):
    if not client:
        return "Groq API key not configured."

    prompt = f"""
    Questions: {questions}
    Answers: {answers}

    Evaluate the candidate's performance. Provide:
    1. Technical accuracy score (0-10)
    2. Communication score (0-10)
    3. Detailed feedback
    4. Improvement tips
    
    Format the output as a JSON object.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return response.choices[0].message.content
