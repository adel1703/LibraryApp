using libraryBackEnd.Entity;

public class BookLoan
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public int BookId { get; set; }
    public string BookTitle { get; set; }
    public string StudentName { get; set; }
    public DateTime BorrowedAt { get; set; }
    public DateTime? ReturnedAt { get; set; }

    public Student? Student { get; set; }

    public Book? Book {  get; set; } 

}
