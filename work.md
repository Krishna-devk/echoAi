# AI Resume Screener + Interview Simulator

A recruitment engine with an AI brain 🧠⚙️

This project is strong because it blends:

* SaaS architecture
* AI pipelines
* NLP
* vector similarity
* recruiter workflows
* dashboards
* async processing
* authentication
* file parsing
* real-world UX

Using [Groq](https://groq.com?utm_source=chatgpt.com) is a smart move here because:

* ultra-fast inference
* OpenAI-compatible API
* cheap/free tiers for prototyping
* excellent for interview generation + scoring

---

# PHASE 0 — FINAL TECH STACK

# Frontend

* React + Vite
* Tailwind CSS
* Axios
* React Router
* Recharts (analytics)

# Backend

* Django
* Django REST Framework
* PostgreSQL
* Celery + Redis
* JWT Authentication

# AI/NLP

* Groq API
* Sentence Transformers
* scikit-learn
* spaCy
* PyPDF2 / pdfplumber
* python-docx

# Optional AI Features

* Whisper (voice interviews)
* Ollama (local LLM)
* FAISS / ChromaDB (semantic search)

---

# PHASE 1 — SYSTEM DESIGN

# Core Workflow

```text
Recruiter uploads JD
        ↓
Recruiter uploads resumes
        ↓
Backend parses resumes
        ↓
Extract skills + embeddings
        ↓
Compare with JD embedding
        ↓
Generate match score
        ↓
Store rankings in DB
        ↓
Generate interview questions
        ↓
Candidate answers
        ↓
AI evaluates answers
        ↓
Recruiter sees analytics dashboard
```

---

# PHASE 2 — PROJECT STRUCTURE

# Backend Structure

```text
backend/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│
├── apps/
│   ├── accounts/
│   ├── resumes/
│   ├── jobs/
│   ├── interviews/
│   ├── analytics/
│   └── ai_engine/
│
├── media/
├── requirements.txt
├── manage.py
│
├── celery.py
└── .env
```

---

# Frontend Structure

```text
frontend/
│
├── src/
│   ├── api/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── context/
│   ├── utils/
│   └── App.jsx
│
├── public/
└── package.json
```

---

# PHASE 3 — BACKEND SETUP

# Step 1 — Create Backend

```bash
mkdir backend
cd backend

python -m venv venv
```

# Windows

```bash
venv\Scripts\activate
```

# Linux/Mac

```bash
source venv/bin/activate
```

---

# Install Dependencies

```bash
pip install django djangorestframework
pip install psycopg2-binary
pip install django-cors-headers
pip install djangorestframework-simplejwt
pip install python-dotenv

pip install sentence-transformers
pip install scikit-learn
pip install numpy pandas

pip install pdfplumber PyPDF2 python-docx

pip install celery redis

pip install groq

pip install spacy
python -m spacy download en_core_web_sm
```

---

# Create Django Project

```bash
django-admin startproject config .
```

---

# Create Apps

```bash
python manage.py startapp accounts
python manage.py startapp resumes
python manage.py startapp jobs
python manage.py startapp interviews
python manage.py startapp analytics
python manage.py startapp ai_engine
```

---

# PHASE 4 — POSTGRESQL SETUP

Install PostgreSQL:

[PostgreSQL](https://www.postgresql.org/download/?utm_source=chatgpt.com)

Create DB:

```sql
CREATE DATABASE ai_recruitment;
```

---

# settings.py

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ai_recruitment',
        'USER': 'postgres',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

---

# PHASE 5 — JWT AUTHENTICATION

# Install JWT

```bash
pip install djangorestframework-simplejwt
```

# settings.py

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
```

---

# Create User Roles

# Recruiter

# Candidate

Example:

```python
class User(AbstractUser):
    ROLE_CHOICES = (
        ('recruiter', 'Recruiter'),
        ('candidate', 'Candidate'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
```

---

# PHASE 6 — RESUME UPLOAD SYSTEM

# Resume Model

```python
class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    file = models.FileField(upload_to='resumes/')

    extracted_text = models.TextField(blank=True)

    skills = models.JSONField(default=list)

    embedding = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)
```

---

# Resume Upload API

```python
class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES['file']

        # Save file

        return Response({"message": "uploaded"})
```

---

# PHASE 7 — RESUME PARSING

# PDF Parsing

```python
import pdfplumber

def parse_pdf(path):
    text = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()

    return text
```

---

# DOCX Parsing

```python
from docx import Document

def parse_docx(path):
    doc = Document(path)

    text = "\n".join([p.text for p in doc.paragraphs])

    return text
```

---

# PHASE 8 — SKILL EXTRACTION

# Method 1 — Skill Dictionary

```python
SKILLS = [
    "python",
    "java",
    "react",
    "docker",
    "kubernetes",
    "aws",
    "django",
]
```

---

# Extraction Logic

```python
def extract_skills(text):
    found = []

    text = text.lower()

    for skill in SKILLS:
        if skill in text:
            found.append(skill)

    return found
```

---

# Better Method Later

Use:

* spaCy NER
* KeyBERT
* LLM extraction

---

# PHASE 9 — EMBEDDINGS + MATCHING

This is where the project becomes recruiter-grade.

# Install Model

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
```

---

# Generate Embeddings

```python
def create_embedding(text):
    return model.encode(text).tolist()
```

---

# Cosine Similarity

```python
from sklearn.metrics.pairwise import cosine_similarity

score = cosine_similarity(
    [resume_embedding],
    [jd_embedding]
)[0][0]
```

---

# Match Formula

Example:

```python
final_score = (
    semantic_score * 0.7 +
    skill_match_score * 0.3
)
```

This hybrid scoring is MUCH better than raw keywords.

---

# PHASE 10 — GROQ API INTEGRATION

Install:

```bash
pip install groq
```

---

# Get API Key

[Groq Console](https://console.groq.com?utm_source=chatgpt.com)

Create:

* API key
* copy key

---

# .env

```env
GROQ_API_KEY=your_key
```

---

# Basic Groq Client

```python
from groq import Groq
import os

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)
```

---

# Generate Interview Questions

```python
def generate_questions(jd, resume_text):

    prompt = f"""
    Job Description:
    {jd}

    Candidate Resume:
    {resume_text}

    Generate:
    - 5 technical questions
    - 3 HR questions
    - 2 scenario-based questions
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content
```

---

# Evaluate Answers

```python
def evaluate_answer(question, answer):

    prompt = f"""
    Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate:
    - technical accuracy
    - communication
    - confidence
    - improvement tips

    Give score out of 10.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content
```

---

# PHASE 11 — JOB DESCRIPTION SYSTEM

# Job Model

```python
class Job(models.Model):
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=255)

    description = models.TextField()

    embedding = models.JSONField(default=list)

    created_at = models.DateTimeField(auto_now_add=True)
```

---

# When JD Created

Automatically:

* generate embedding
* store embedding

---

# PHASE 12 — RANKING ENGINE

# Flow

```text
Resume Embedding
        ↓
Compare with JD Embedding
        ↓
Calculate Semantic Similarity
        ↓
Combine with Skills Score
        ↓
Store Final Score
        ↓
Sort Candidates
```

---

# Ranking Table

```python
class CandidateScore(models.Model):

    candidate = models.ForeignKey(User, on_delete=models.CASCADE)

    job = models.ForeignKey(Job, on_delete=models.CASCADE)

    score = models.FloatField()

    remarks = models.TextField(blank=True)
```

---

# PHASE 13 — FRONTEND SETUP

# Create React App

```bash
npm create vite@latest frontend
```

Choose:

* React
* JavaScript

---

# Install Frontend Packages

```bash
npm install axios react-router-dom
npm install tailwindcss @tailwindcss/vite
npm install recharts
```

---

# Pages

```text
Login
Register
Recruiter Dashboard
Candidate Dashboard
Resume Upload
JD Upload
Candidate Rankings
Interview Simulator
Analytics
```

---

# PHASE 14 — DASHBOARD DESIGN

# Recruiter Dashboard

```text
+--------------------------------------+
| Sidebar                              |
|--------------------------------------|
| Upload JD                            |
| Upload Resumes                       |
| Rankings                             |
| Analytics                            |
| Interviews                           |
+--------------------------------------+

+--------------------------------------+
| Top Candidates                       |
| Candidate Score                      |
| Match %                              |
+--------------------------------------+
```

---

# Candidate Dashboard

```text
+--------------------------------------+
| Resume Upload                        |
| AI Interview Practice                |
| Feedback Reports                     |
| Skill Weaknesses                     |
+--------------------------------------+
```

---

# PHASE 15 — ASYNC PROCESSING

Resume parsing + embeddings are heavy.

Use:

* Celery
* Redis

---

# Install Redis

[Redis](https://redis.io/downloads/?utm_source=chatgpt.com)

---

# Example Task

```python
@shared_task
def process_resume(resume_id):
    pass
```

---

# Why This Matters

Without async:

* uploads freeze
* API becomes slow
* recruiter waits forever ☠️

With Celery:

* scalable pipeline
* background AI jobs
* professional architecture

---

# PHASE 16 — SEMANTIC SEARCH

This becomes your “wow” feature.

Recruiter can search:

```text
"Find React developers with Docker and AWS"
```

Use:

* FAISS
* ChromaDB

---

# Flow

```text
Search Query
    ↓
Convert to Embedding
    ↓
Vector Similarity Search
    ↓
Return Best Candidates
```

---

# PHASE 17 — VOICE INTERVIEW MODE

# Stack

* Whisper
* Web Speech API

---

# Flow

```text
Candidate speaks
      ↓
Speech → text
      ↓
Groq evaluates answer
      ↓
AI feedback generated
```

---

# PHASE 18 — ANALYTICS DASHBOARD

# Metrics

* top skills
* candidate pipeline
* average score
* interview performance
* hiring trends

Use:

* Recharts

---

# PHASE 19 — DEPLOYMENT

# Backend

Use:

* [Railway](https://railway.app?utm_source=chatgpt.com)
* or [Render](https://render.com?utm_source=chatgpt.com)

---

# Frontend

Use:

* [Vercel](https://vercel.com?utm_source=chatgpt.com)
* or [Netlify](https://www.netlify.com?utm_source=chatgpt.com)

---

# PHASE 20 — PRODUCTION IMPROVEMENTS

# Add

* rate limiting
* caching
* Docker
* CI/CD
* monitoring
* role permissions
* email notifications
* audit logs

---

# BEST DEVELOPMENT ORDER

DO NOT build everything together.

# Correct Order

## Week 1

* backend setup
* auth
* file upload
* parsing

## Week 2

* embeddings
* JD matching
* ranking engine

## Week 3

* Groq integration
* interview generator
* answer evaluation

## Week 4

* React dashboards
* charts
* analytics

## Week 5

* Celery
* semantic search
* deployment

---

# MOST IMPORTANT ENGINEERING DECISIONS

## 1. Store embeddings

Do NOT regenerate every request.

Bad:

```text
Upload → recompute forever
```

Good:

```text
Upload once → store vector
```

---

## 2. Use async jobs

Heavy AI tasks should NEVER block requests.

---

## 3. Separate AI layer

Create:

```text
ai_engine/
```

This lets you:

* switch Groq → OpenAI
* add Ollama later
* keep architecture clean

---

# RECOMMENDED GROQ MODELS

For interview generation:

```text
llama-3.3-70b-versatile
```

For cheaper/faster:

```text
llama-3.1-8b-instant
```

---

# HUGE RECRUITER WOW FEATURES

If you add these, the project jumps tiers:

## Tier 1

* resume ranking
* AI questions

## Tier 2

* semantic search
* AI analytics

## Tier 3

* voice interview
* confidence scoring
* hiring insights
* candidate chat assistant

Tier 3 turns it from “student project” into “startup prototype.” 🚀
