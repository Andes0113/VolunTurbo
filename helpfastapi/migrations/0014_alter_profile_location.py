# Generated by Django 4.1.2 on 2022-11-28 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helpfastapi', '0013_rename_city_profile_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='location',
            field=models.CharField(max_length=255),
        ),
    ]