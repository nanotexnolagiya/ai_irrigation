from rest_framework import generics, permissions
from .models import WateringLog, FertilizerLog, Yield
from .serializers import (
    WateringLogSerializer,
    FertilizerLogSerializer,
    YieldSerializer
)
from .permissions import IsOwner

# -------------------------
# Yield CRUD
# -------------------------
class YieldListCreateView(generics.ListCreateAPIView):
    serializer_class = YieldSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return yields owned by authenticated user
        return Yield.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        # Automatically assign owner
        serializer.save(user=self.request.user)


class YieldDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Yield.objects.all()
    serializer_class = YieldSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

# -------------------------
# Watering Log CRUD
# -------------------------

class WateringLogListCreateView(generics.ListCreateAPIView):
    """
    GET: list watering logs for user's yields
    POST: create new watering log
    """
    serializer_class = WateringLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only user's own yields logs
        return WateringLog.objects.filter(
            yield_field__user=self.request.user
        ).order_by("-date")

    def perform_create(self, serializer):
        # Ensure user owns the yield
        yield_field = serializer.validated_data["yield_field"]
        if yield_field.user != self.request.user:
            raise PermissionError("You don't own this yield.")
        serializer.save()


class WateringLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WateringLog.objects.all()
    serializer_class = WateringLogSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]


# -------------------------
# Fertilizer Log CRUD
# -------------------------

class FertilizerLogListCreateView(generics.ListCreateAPIView):
    """
    GET: list fertilizer logs for user's yields
    POST: create fertilizer log
    """
    serializer_class = FertilizerLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FertilizerLog.objects.filter(
            yield_field__user=self.request.user
        ).order_by("-date")

    def perform_create(self, serializer):
        yield_field = serializer.validated_data["yield_field"]
        if yield_field.user != self.request.user:
            raise PermissionError("You don't own this yield.")
        serializer.save()


class FertilizerLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FertilizerLog.objects.all()
    serializer_class = FertilizerLogSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
