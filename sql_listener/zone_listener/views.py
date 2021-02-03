from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
import random

from zone_listener.models import Day
from zone_listener.serializers import DaySerializer


class DayViewSet(viewsets.ViewSet):
    def list(self, request):  # api/sales
        sales = Day.objects.all()
        serializer = DaySerializer(sales, many=True)
        return Response(serializer.data)

    def retrieveByStoreId(self, request, id=None):  # /api/sales/store/<str:id>
        sales = Day.objects.get(store_id=id)
        serializer = DaySerializer(sales)
        return Response(serializer.data)

    def retrieveByCustId(self, request, id=None):  # /api/sales/cust/<str:id>
        sales = Day.objects.get(cust_id=id)
        serializer = DaySerializer(sales)
        return Response(serializer.data)
