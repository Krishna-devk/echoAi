from django.db import models
from django.conf import settings
from jobs.models import Job

class Interview(models.Model):
    candidate = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='interviews')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='interviews')
    questions = models.JSONField(default=list)
    answers = models.JSONField(default=list)
    evaluation = models.TextField(blank=True)
    overall_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Interview: {self.candidate.username} for {self.job.title}"
