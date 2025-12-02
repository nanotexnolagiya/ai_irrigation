from django.db import models
from django.contrib.auth.models import User


class WeatherRegion(models.Model):
    """
    A region (agro-zone) where multiple yields share the same weather.
    Weather is collected once per region, not per yield.
    """
    name = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    radius_km = models.FloatField(default=10)  # optional

    def __str__(self):
        return f"{self.name}"


class Yield(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="yields")
    name = models.CharField(max_length=255)
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    size_ha = models.FloatField()

    # crop info
    crop_type = models.CharField(max_length=100, blank=True, null=True)
    soil_type = models.CharField(max_length=100, blank=True, null=True)

    # NEW: link yield → weather region
    weather_region = models.ForeignKey(
        WeatherRegion,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="yields"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class HourlyWeather(models.Model):
    """
    Hourly weather data collected for each region once per hour.
    All yields inside a region reuse this data.
    """

    weather_region = models.ForeignKey(
        WeatherRegion,
        on_delete=models.CASCADE,
        related_name="hourly_weather"
    )

    timestamp = models.DateTimeField()  # full datetime: year-month-day hour

    temperature_c = models.FloatField(null=True, blank=True)
    humidity_percent = models.FloatField(null=True, blank=True)
    wind_speed = models.FloatField(null=True, blank=True)
    rain_mm = models.FloatField(null=True, blank=True)
    clouds_percent = models.FloatField(null=True, blank=True)
    pressure_hpa = models.FloatField(null=True, blank=True)

    source = models.CharField(max_length=50, default="Unknown")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("weather_region", "timestamp")
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.weather_region.name} - {self.timestamp}"


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
