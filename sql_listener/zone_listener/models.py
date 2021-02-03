from django.db import models

from configs.keys import mysql_table


class Day(models.Model):
    timestamp = models.DateTimeField()
    store_id = models.PositiveIntegerField(default=0)
    cust_id = models.CharField(primary_key=True, max_length=200)
    prod_name = models.CharField(max_length=200)
    sales_channel = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(default=0.0, decimal_places=2, max_digits=4)
    sale_val = models.DecimalField(default=0.0, decimal_places=8, max_digits=12)

    class Meta:
        db_table = mysql_table