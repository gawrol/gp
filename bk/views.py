import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View

from bk.models import Author, Book

# Create your views here.

class IndexView(View):
    def get(self, request):
        return render(request, 'bk/index.html')

class CreateView(View):
    def post(self, request):
        book = json.loads(request.body)['book']
        id = book['id']
        title = book['volumeInfo']['title']
        authors = book['volumeInfo']['authors']
        authorsCache = list(authors)

        if not authors:
            authors.append(Author.objects.get_or_create(name='unknown')[0])
            authorsCache.append('unknown')
        else:
            for a in range(len(authors)):
                authors[a] = Author.objects.get_or_create(name=authors[a])[0]
        
        b = Book(title=title)
        b.save()

        for a in range(len(authors)):
            b.authors.add(authors[a])

        context = {
            'id': id,
            'volumeInfo': {
                'title': title,
                'authors': authorsCache, 
            },
        }
        return JsonResponse({'book': context})