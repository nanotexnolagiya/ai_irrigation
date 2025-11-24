from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """
    Allow access only if the object's yield belongs to the authenticated user.
    """

    def has_object_permission(self, request, view, obj):
        return obj.yield_field.user == request.user
