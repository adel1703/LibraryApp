namespace libraryBackEnd.Entity
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int MinAge { get; set; }

        public int MaxAge { get; set; }

        public List<BookLoan>? BookLoans { get; set; }


    }
}
