from rest_framework import generics, status
from rest_framework.exceptions import APIException

from rest_framework.permissions import IsAuthenticated

from .models import Book, PublishingHouse, Author
from .serializers import BookSerializer, PublishingHouseSerializer, AuthorSerializer
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage
from dotenv import load_dotenv
from validations import CustomValidation

import json

load_dotenv() 

class PublishingHouseListCreateView(generics.ListCreateAPIView):
    """
    API endpoint for listing and creating publishing houses.
    GET: List all publishing houses
    POST: Create a new publishing house
    """
    queryset = PublishingHouse.objects.all()
    serializer_class = PublishingHouseSerializer


class PublishingHouseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint for retrieving, updating, or deleting a publishing house.
    GET: Retrieve a specific publishing house
    PUT/PATCH: Update a publishing house
    DELETE: Delete a publishing house
    """
    queryset = PublishingHouse.objects.all()
    serializer_class = PublishingHouseSerializer

class AuthorBooksListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class=BookSerializer
    
    def get_queryset(self):
        author_id=self.kwargs['author_id']
        return Book.objects.filter(author_id=author_id)

class AuthorListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    
    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        name = validated_data['name']
        
        author_list = Author.objects.filter(name=name)
        
        llm = ChatOpenAI(model="gpt-4", temperature=0)
        
        if len(author_list) > 0:
            raise CustomValidation('This author is already registered.', 'username', status_code=status.HTTP_409_CONFLICT)
        
        
        prompt = f"Return a list with the titles of the books of {name} in JSON format. The titles should be written in spanish"
        response = llm([HumanMessage(content=prompt)])
        
        try:
            books = json.loads(response.content)
        except json.JSONDecodeError:
            raise CustomValidation('The object can not be parsed to a json list', 'username', status_code=status.HTTP_409_CONFLICT)
            books = []


        if len(books)>0:
            author = serializer.save()
            for book in books:
                Book.objects.create(title=book['title'], author=author)
        else:
            raise CustomValidation('Author has not books', 'username', status_code=status.HTTP_409_CONFLICT)
        
class AuthorDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    """
    API endpoint for listing and creating books.
    GET: List all books
    POST: Create a new book
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    """
    API endpoint for retrieving, updating, or deleting a book.
    GET: Retrieve a specific book
    PUT/PATCH: Update a book
    DELETE: Delete a book
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
