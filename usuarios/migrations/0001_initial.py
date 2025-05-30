# Generated by Django 5.2.1 on 2025-05-22 16:14

import django.db.models.deletion
from django.db import migrations, models

def create_roles(apps, schema_editor):
    Roles = apps.get_model('usuarios', 'Roles')
    Roles.objects.bulk_create([
        Roles(nombre='paciente', descripcion='Paciente del sistema'),
        Roles(nombre='doctor', descripcion='Doctor del sistema'),
        Roles(nombre='admin', descripcion='Administrador del sistema'),
    ])

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('doctores', '0001_initial'),
        ('pacientes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('role_id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.CharField(max_length=255)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('usuario_id', models.AutoField(primary_key=True, serialize=False)),
                ('identificacion', models.CharField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('primer_nombre', models.CharField(max_length=100)),
                ('segundo_nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('primer_apellido', models.CharField(max_length=100)),
                ('segundo_apellido', models.CharField(blank=True, max_length=100, null=True)),
                ('genero', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('direccion', models.CharField(max_length=255)),
                ('telefono', models.CharField(max_length=20)),
                ('fecha_nacimiento', models.DateField()),
                ('especialidad', models.CharField(blank=True, max_length=100, null=True)),
                ('fecha_ingreso', models.DateField(blank=True, null=True)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
                ('activo', models.BooleanField(default=True)),
                ('afiliacion', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pacientes.tipoafiliacion')),
                ('jornada', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='doctores.jornadaslaborales')),
                ('role', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.roles')),
            ],
        ),
        migrations.RunPython(create_roles),
    ]
