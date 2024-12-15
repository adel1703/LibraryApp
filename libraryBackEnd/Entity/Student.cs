namespace libraryBackEnd.Entity
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // استخدم DateTime وتأكد من إرسال التاريخ بتنسيق ISO 8601
        public DateTime? DayOfBirth { get; set; }

        public List<BookLoan>? BookLoans { get; set; }
    }
}
