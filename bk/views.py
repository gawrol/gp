import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
import urllib.request

from bk.models import Author, Book
from gp.settings import MEDIA_URL

# Create your views here.

class IndexView(View):
    def get(self, request):
        return render(request, 'bk/index.html')

class ReadView(View):
    def get(self, request):
        books = Book.objects.all().order_by('-updated_at')
        booksValues = list(books.values())
        booksJSON = list()
        if booksValues:
            for b in range(len(booksValues)):
                authors = list(books[b].authors.all())
                if authors:
                    authorsJSON = list()
                    for a in range(len(authors)):
                        authorsJSON.append(authors[a].name)
                booksJSON.append({
                    'id': booksValues[b]['id'],
                    'volumeInfo': {
                        'title': booksValues[b]['title'],
                        'authors': authorsJSON,
                        'imageLinks': {
                            'thumbnail': booksValues[b]['thumbnail'],
                        },
                    },
                })
                print(books[b].thumbnail.url)
        return JsonResponse({'books': booksJSON})

class CreateView(View):
    def post(self, request):
        book = json.loads(request.body)['book']
        id = book['id']
        title = book['volumeInfo']['title']
        authors = book['volumeInfo']['authors']
        thumbnail = book['volumeInfo']['imageLinks']['thumbnail']
        authorsCache = list(authors)

        if not authors:
            authors.append(Author.objects.get_or_create(name='unknown')[0])
            authorsCache.append('unknown')
        else:
            for a in range(len(authors)):
                authors[a] = Author.objects.get_or_create(name=authors[a])[0]
        
        urllib.request.urlretrieve(thumbnail, MEDIA_URL+'bk/'+id+'.jpg')

        b = Book(title=title, thumbnail=id+'.jpg')
        b.save()

        for a in range(len(authors)):
            b.authors.add(authors[a])

        context = {
            'id': b.pk,
            'idCache': id,
            'volumeInfo': {
                'title': title,
                'authors': authorsCache, 
                'imageLinks': {
                    'thumbnail': str(b.thumbnail),
                },
            },
        }
        return JsonResponse({'book': context})

class DeleteView(View):
    def delete(self, request):
        book = json.loads(request.body)['book']
        id = book['id']

        b = Book.objects.get(pk=id)
        b.delete()

        context = {
            'id': id,
        }

        return JsonResponse({'book': context})