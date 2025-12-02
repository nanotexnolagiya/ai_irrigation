from rest_framework import serializers
from django.contrib.auth.models import User
from math import radians, sin, cos, sqrt, atan2
from .models import WeatherRegion, Yield, WateringLog, FertilizerLog, IrrigationPrediction, SoilSensorData


# -------------------------
# User Serializer
# -------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


# -------------------------
# Register Serializer
# -------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data.get("email", "")
        )
        user.set_password(validated_data["password"])
        user.save()
        return user



class WeatherRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherRegion
        fields = "__all__"

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    return R * 2 * atan2(sqrt(a), sqrt(1-a))

class YieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = Yield
        fields = "__all__"
        read_only_fields = ["user", "created_at"]

    def create(self, validated_data):
        lat = validated_data["location_lat"]
        lng = validated_data["location_lng"]

        regions = WeatherRegion.objects.all()

        # find nearest region within 50 km
        nearest = None
        min_dist = 999999 

        for region in regions:
            dist = haversine(lat, lng, region.latitude, region.longitude)
            if dist < min_dist:
                min_dist = dist
                nearest = region

        if nearest is None or min_dist > 50:
            # Create new region automatically
            nearest = WeatherRegion.objects.create(
                name=f"Auto-{lat},{lng}",
                latitude=lat,
                longitude=lng,
                radius_km=10
            )

        validated_data["weather_region"] = nearest
        return super().create(validated_data)



# -------------------------
# Watering Log
# -------------------------
class WateringLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WateringLog
        fields = "__all__"
        read_only_fields = ["created_at"]


# -------------------------
# Fertilizer Log
# -------------------------
class FertilizerLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FertilizerLog
        fields = "__all__"
        read_only_fields = ["created_at"]


# -------------------------
# Irrigation Prediction
# -------------------------
class IrrigationPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = IrrigationPrediction
        fields = "__all__"
        read_only_fields = ["created_at"]


# -------------------------
# Soil Sensor Data
# -------------------------
class SoilSensorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoilSensorData
        fields = "__all__"
        read_only_fields = ["created_at"]
