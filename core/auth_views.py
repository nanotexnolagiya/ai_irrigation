from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User


# Register new user
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
