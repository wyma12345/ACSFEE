# Generated by Django 4.0.2 on 2023-08-09 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('BatutaTG', '0004_message_restaurants_id_surveys_restaurants_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admins',
            name='Restaurants_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='BatutaTG.restaurant'),
        ),
    ]