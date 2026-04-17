from django.db import models

class CrowdData(models.Model):
    CROWD_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    section_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    crowd_level = models.CharField(max_length=10, choices=CROWD_CHOICES, default='low')

    def __str__(self):
        return f"{self.name} ({self.section_id})"

class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.CharField(max_length=50)
    popular = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Alert(models.Model):
    TYPE_CHOICES = [
        ('warning', 'Warning'),
        ('success', 'Success'),
        ('info', 'Info'),
    ]
    title = models.CharField(max_length=200)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='info')
    unread = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
