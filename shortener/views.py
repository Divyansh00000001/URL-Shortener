from rest_framework.views import APIView
from rest_framework.response import Response

from datetime import timedelta
from django.utils import timezone
from django.http import HttpResponse
from django.shortcuts import redirect

from .models import ShortURL
from .utils import generate_code

from .redis_client import r


class CreateShortURL(APIView):

    def post(self, request):

        url = request.data.get("url")
        alias = request.data.get("alias")

        if alias:
            code = alias
        else:
            code = generate_code()

        if ShortURL.objects.filter(short_code=code).exists():
            return Response(
                {"error": "Alias already exists"},
                status=400
            )

        expiry_days = request.data.get("expiry_days")

        expiry = None

        if expiry_days is not None:
         expiry = timezone.now() + timedelta(
        days=int(expiry_days)
    )

        obj = ShortURL.objects.create(
        original_url=url,
        short_code=code,
        expires_at=expiry
        )

        r.set(
         code,
        url
        )

        short_url = f"http://192.168.29.125:8000/{code}"

        return Response({
    "short_url": short_url
})


def redirect_url(request, code):

    cached_url = r.get(code)

    if cached_url:

        print("REDIS HIT")

        obj = ShortURL.objects.get(
            short_code=code
        )

        obj.clicks += 1
        obj.save()

        return redirect(cached_url)

    print("DB HIT")

    obj = ShortURL.objects.get(
        short_code=code
    )

    if obj.expires_at:
        if timezone.now() > obj.expires_at:
            return HttpResponse("Link Expired")

    obj.clicks += 1
    obj.save()

    r.set(
        code,
        obj.original_url
    )

    return redirect(obj.original_url)


class AnalyticsView(APIView):

    def get(self, request, code):

        obj = ShortURL.objects.get(
            short_code=code
        )

        return Response({
            "short_code": obj.short_code,
            "clicks": obj.clicks,
            "created_at": obj.created_at,
            "expires_at": obj.expires_at
        })