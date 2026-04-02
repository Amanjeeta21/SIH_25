from django.http import JsonResponse
from .models import FenceData

# API to get all data (for inventory table)
def inventory_list(request):
    data = list(FenceData.objects.values())
    return JsonResponse(data, safe=False)

# API to add new data (POST request)
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def add_fence_data(request):
    if request.method == "POST":
        body = json.loads(request.body)
        FenceData.objects.create(
            mission_id=body['mission_id'],
            owner=body['owner'],
            location=body['location'],
            voltage=body['voltage'],
            fence_id=body['fence_id'],
            status=body['status']
        )
        return JsonResponse({"message": "Data added successfully!"})
    return JsonResponse({"error": "POST request required."}, status=400)
