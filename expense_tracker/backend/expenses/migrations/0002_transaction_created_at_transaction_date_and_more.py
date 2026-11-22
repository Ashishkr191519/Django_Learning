import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='created_at',
            field=models.DateTimeField(
                auto_now_add=True,
                default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),

        migrations.AddField(
            model_name='transaction',
            name='date',
            field=models.DateField(
                default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),

        migrations.AddField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(
                choices=[
                    ('income', 'Income'),
                    ('expense', 'Expense')
                ],
                default='expense',
                max_length=10
            ),
            preserve_default=False,
        ),

        migrations.AddField(
            model_name='transaction',
            name='user',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL
            ),
        ),
    ]