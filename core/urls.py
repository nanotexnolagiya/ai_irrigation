from django.urls import path
from .auth_views import RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    WateringLogListCreateView,
    WateringLogDetailView,
    FertilizerLogListCreateView,
    FertilizerLogDetailView,
    YieldListCreateView,
    YieldDetailView,
)

urlpatterns = [
    # Register user
    path("auth/register/", RegisterView.as_view(), name="auth-register"),

    # Login → returns access + refresh tokens
    path("auth/login/", TokenObtainPairView.as_view(), name="token-obtain"),

    # Refresh token
    path("auth/refresh/", TokenRefreshView.as_view(), name="token-refresh"),

    path("yields/", YieldListCreateView.as_view(), name="yield-list"),
    path("yields/<int:pk>/", YieldDetailView.as_view(), name="yield-detail"),

    path("watering/", WateringLogListCreateView.as_view(), name="watering-list"),
    path("watering/<int:pk>/", WateringLogDetailView.as_view(), name="watering-detail"),

    # Fertilizer Logs
    path("fertilizer/", FertilizerLogListCreateView.as_view(), name="fertilizer-list"),
    path("fertilizer/<int:pk>/", FertilizerLogDetailView.as_view(), name="fertilizer-detail"),
]
