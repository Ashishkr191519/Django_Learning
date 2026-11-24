from rest_framework import serializers


class ChatRequestSerializer(serializers.Serializer):

    query = serializers.CharField(
        required=True,
        allow_blank=False,
        max_length=1000,
        trim_whitespace=True
    )