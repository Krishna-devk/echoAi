import pdfplumber
from docx import Document
import io

def parse_resume(file_obj):
    """
    Parses PDF or DOCX files and returns extracted text.
    """
    filename = file_obj.name.lower()
    text = ""
    
    if filename.endswith('.pdf'):
        with pdfplumber.open(file_obj) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
                    
    elif filename.endswith('.docx'):
        doc = Document(file_obj)
        text = "\n".join([p.text for p in doc.paragraphs])
        
    return text.strip()
