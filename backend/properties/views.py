from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from properties.serializers import (
    PropertyCreateSerializer,
    PropertyListSerializer,
    PropertyDetailSerializer,
    ImageSerializer,
    FeatureSerializer,
)
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from django.shortcuts import get_object_or_404
from properties.serializers import PropertyCreateSerializer
from properties.models import Property

# from django_filters.rest_framework import DjangoFilterBackend
from properties.filters import PropertyFilter
from django.db.models import Q

# Create your views here.


# 5.4 module


class CreatePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # agent = get_object_or_404(User, is_agent=True)
        if not request.user.is_agent:
            return Response(
                {"message": "Just agent can create the property!"}, status=403
            )

        # prop = request.data
        # serializer = PropertyCreateSerializer(prop)
        serializer = PropertyCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(agent=request.user)
            return Response({"message": "property created successfully!"})
        return Response(serializer.errors, status=403)


class MyPropertyListView(APIView):
    def get(self, request):
        if request.user.is_staff:
            prop = Property.objects.all()
            # serializer = PropertyListSerializer(prop)
            return Response(serializer.data)
        else:
            prop = Property.objects.filter(agent=request.user)
            serializer = PropertyListSerializer(prop, many=True)
            return Response(serializer.data)


class PropertyDetailView(APIView):
    def get(self, request, slug):
        # prop = Property.objects.get(slug=slug)
        prop = get_object_or_404(Property, slug=slug)  # safer way of upper method
        serializer = PropertyDetailSerializer(prop)
        return Response(serializer.data)


class UpdatePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, slug):
        prop = get_object_or_404(Property, slug=slug)

        if prop.agent != request.user:
            return Response({"error": "Not allowed"}, status=403)

        serializer = PropertyCreateSerializer(prop, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Updated successfully"})
        return Response(serializer.errors)


class DeletePropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug):
        prop = get_object_or_404(Property, slug=slug)

        if prop.agent != request.user:
            return Response({"error": "Not allowed"}, status=403)

        prop.delete()
        return Response({"message": "Deleted successfully"})


# --- 5.5 module

# class PropertySearchView(APIView):
#     def get(self, request):
#         queryset = Property.objects.all()
#         serializer = PropertyListSerializer
#         filter_backends = [DjangoFilterBackend]
#         filterset_class = PropertyFilter


class PropertySearchView(APIView):
    def get(self, request):
        queryset = Property.objects.all()

        # --- Filters ---
        city = request.GET.get("city")
        type = request.GET.get("type")
        min_price = request.GET.get("min_price")
        max_price = request.GET.get("max_price")
        status = request.GET.get("status")
        search = request.GET.get("search")  # NEW

        if status:
            queryset = queryset.filter(status=status)
        if city:
            queryset = queryset.filter(city__icontains=city)

        if type:
            queryset = queryset.filter(type=type)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

            # --- Search (title + city) ---
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(city__icontains=search)
            )

        # --- Pagination ---
        page = int(request.GET.get("page", 1))
        limit = 5

        start = (page - 1) * limit
        end = start + limit

        total = queryset.count()
        queryset = queryset[start:end]

        # --- Serializer ---
        serializer = PropertyListSerializer(queryset, many=True)

        # return Response({
        #     "count": total,
        #     "results": serializer.data
        # })

        return Response(
            {"count": total, "page": page, "limit": limit, "results": serializer.data}
        )


# 5.6 module


class UploadPropertyImageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        prop = get_object_or_404(Property, slug=slug)
        serializer = ImageSerializer(prop)
        if request.user.is_primary:
            return True

        return Response(serializer.data)


class AddPropertyFeatureView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prop = get_object_or_404(Property, data=request.data)
        serializer = FeatureSerializer(prop)
        if serializer.is_valid():
            return Response({serializer.key: serializer.value})
        return Response(serializer.errors)


class DeletePropertyFeatureView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug):
        prop = get_object_or_404(Property, slug=slug)

        prop.delete()
        return Response({"message": "Deleted Successfully!"})
