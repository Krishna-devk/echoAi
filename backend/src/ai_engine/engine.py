from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load model once
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception:
    model = None

def get_embedding(text):
    if not model or not text:
        return []
    return model.encode(text).tolist()

def calculate_similarity(embedding1, embedding2):
    if not embedding1 or not embedding2:
        return 0.0
    
    vec1 = np.array(embedding1).reshape(1, -1)
    vec2 = np.array(embedding2).reshape(1, -1)
    
    return float(cosine_similarity(vec1, vec2)[0][0])

def extract_skills(text, skill_list):
    """
    Simple keyword based skill extraction.
    Improve this later with spaCy or LLMs.
    """
    found = []
    text_lower = text.lower()
    for skill in skill_list:
        if skill.lower() in text_lower:
            found.append(skill)
    return found
