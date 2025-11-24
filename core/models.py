from django.db import models
from django.contrib.auth.models import User


class Yield(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="yields")
    name = models.CharField(max_length=255)
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    size_ha = models.FloatField()
    crop_type = models.CharField(max_length=100, blank=True, null=True)
    soil_type = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class DailyWeather(models.Model):
    yield_field = models.ForeignKey(Yield, on_delete=models.CASCADE, related_name="weather")
    date = models.DateField()
    temperature_c = models.FloatField(null=True, blank=True)
    humidity_percent = models.FloatField(null=True, blank=True)
    rain_mm = models.FloatField(null=True, blank=True)
    wind_speed = models.FloatField(null=True, blank=True)
    evaporation_mm = models.FloatField(null=True, blank=True)
    source = models.CharField(max_length=50, default="Unknown")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("yield_field", "date")


class WateringLog(models.Model):
    yield_field = models.ForeignKey(Yield, on_delete=models.CASCADE, related_name="watering_logs")
    date = models.DateField()
    water_amount_liters = models.FloatField()
    watering_type = models.CharField(max_length=100)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class FertilizerLog(models.Model):
    yield_field = models.ForeignKey(Yield, on_delete=models.CASCADE, related_name="fertilizer_logs")
    date = models.DateField()
    fertilizer_type = models.CharField(max_length=100)
    amount_kg = models.FloatField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class IrrigationPrediction(models.Model):
    yield_field = models.ForeignKey(Yield, on_delete=models.CASCADE, related_name="predictions")
    date = models.DateField()
    recommended_water_liters = models.FloatField()
    reasoning = models.TextField()
    soil_moisture_estimated = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=50, default="pending")   # sent, applied
    created_at = models.DateTimeField(auto_now_add=True)


class SoilSensorData(models.Model):
    yield_field = models.ForeignKey(Yield, on_delete=models.CASCADE, related_name="sensor_data")
    date_time = models.DateTimeField()
    moisture_percent = models.FloatField(null=True, blank=True)
    ph = models.FloatField(null=True, blank=True)
    nitrogen = models.FloatField(null=True, blank=True)
    phosphorus = models.FloatField(null=True, blank=True)
    potassium = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
