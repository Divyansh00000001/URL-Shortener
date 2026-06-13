from django.db import models

class ShortURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=20, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    expires_at = models.DateTimeField(
        null=True,
        blank=True
    )

    clicks = models.IntegerField(default=0)

    def __str__(self):
        return self.short_code