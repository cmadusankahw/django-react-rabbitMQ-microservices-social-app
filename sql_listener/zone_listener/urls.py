"""
    sales URL Configuration
"""
from django.urls import path

from zone_listener.views import DayViewSet

urlpatterns = [
    path('sales', DayViewSet.as_view({
        'get':'list',
    })),
    path('sales/store/<str:id>', DayViewSet.as_view({
        'get': 'retrieveByStoreId',
    })),
    path('sales/cust/<str:id>', DayViewSet.as_view({
        'get': 'retrieveByCustId',
    })),
]
