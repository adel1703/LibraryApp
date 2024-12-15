using libraryBackEnd.Entity;
using libraryBackEnd.Service.Interface;

namespace libraryBackEnd.Service
{
    public class BookService : IBookService
    {
        public Task<Book> addBook(Book book)
        {
            throw new NotImplementedException();
        }

        public Task<Book> deleteBook(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Book>> GetBooksAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Book> GetByIdBook(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Book> updateBook(int id, Book book)
        {
            throw new NotImplementedException();
        }
    }
}
