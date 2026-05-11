from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Resume
from ai_engine.parser import parse_resume
from ai_engine.engine import get_embedding

class ResumeUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # Save resume
        resume = Resume.objects.create(
            user=request.user,
            file=file_obj
        )

        # Parse and embed in background (simulated for now, ideally use Celery)
        text = parse_resume(resume.file)
        resume.extracted_text = text
        resume.embedding = get_embedding(text)
        resume.save()

        return Response({
            "message": "Resume uploaded and processed successfully",
            "resume_id": resume.id
        }, status=status.HTTP_201_CREATED)
