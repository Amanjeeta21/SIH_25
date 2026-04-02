from django.db import models

class FenceData(models.Model):
    fence_id = models.CharField(max_length=50, unique=True)
    location = models.CharField(max_length=100)
    voltage = models.FloatField()
    status = models.CharField(max_length=20)  # Active / Faulty
    last_checked = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.fence_id} - {self.status}"
