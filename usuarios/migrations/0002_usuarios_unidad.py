# Generated by Django 5.2.1 on 2025-05-28 15:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('unidades', '0002_remove_unidadesmedicas_usuario'),
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='unidad',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='unidades.unidadesmedicas'),
        ),
    ]
