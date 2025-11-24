from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Yield, DailyWeather, WateringLog, FertilizerLog, IrrigationPrediction, SoilSensorData


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


# -------------------------
# Yield Serializer
# -------------------------
class YieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Yield
        fields = "__all__"
        read_only_fields = ["user", "created_at"]


# -------------------------
# Daily Weather
# -------------------------
class DailyWeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyWeather
        fields = "__all__"


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
