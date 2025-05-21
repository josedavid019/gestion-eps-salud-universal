from django.db import migrations

def create_roles(apps, schema_editor):
    Role = apps.get_model('usuarios', 'Role')
    Role.objects.bulk_create([
        Role(nombre='paciente', descripcion='Paciente del sistema'),
        Role(nombre='doctor', descripcion='Doctor del sistema'),
        Role(nombre='admin', descripcion='Administrador del sistema'),
    ])

class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),  # Cambia si tu última migración es otra
    ]

    operations = [
        migrations.RunPython(create_roles),
    ]
