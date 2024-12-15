using libraryBackEnd.Entity;

namespace libraryBackEnd.Service.Interface
{
    public interface IBookService
    {
        Task<List<Book>> GetBooksAsync();
        Task <Book> GetByIdBook(int id);

        Task<Book> addBook(Book book);

        Task<Book> updateBook( int id , Book book);

        Task<Book> deleteBook(int id);


    }
}
