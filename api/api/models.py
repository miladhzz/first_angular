from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='locations/')
    available_units = models.PositiveIntegerField()
    wifi = models.BooleanField(default=False)
    laundry = models.BooleanField(default=False)

    class Meta:
        ordering = ['name']

    def __str__(self) -> str:
        return self.name
