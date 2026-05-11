from django.db import models
from django.conf import settings
from jobs.models import Job

class CandidateScore(models.Model):
    candidate = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='scores')
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='candidate_scores')
    score = models.FloatField()
    semantic_score = models.FloatField(default=0.0)
    skill_score = models.FloatField(default=0.0)
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score']

    def __str__(self):
        return f"{self.candidate.username} - {self.job.title} - {self.score}"
