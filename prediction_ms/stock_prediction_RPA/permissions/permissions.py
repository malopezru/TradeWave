from rest_framework import permissions

#Creo clase para permisos de coordinador
class IsCoordinador(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='coordinadores').exists()

class Isasesor(permissions.BasePermission):
    def has_permission(self,request,view):
        return request.user.groups.filter(name='asesores').exists()



