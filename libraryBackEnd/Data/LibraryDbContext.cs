using libraryBackEnd.Entity;
using Microsoft.EntityFrameworkCore;

namespace libraryBackEnd.Data
{
    public class LibraryDbContext : DbContext 
    {
        public LibraryDbContext( DbContextOptions dbContextOptions) : base(dbContextOptions) { }
        public DbSet<Book> Books { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<BookLoan> BooksLoan { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<BookLoan>()
                .HasOne(a => a.Book)
                .WithMany(s => s.BookLoans)
                .HasForeignKey(a => a.BookId);

            modelBuilder.Entity<BookLoan>()
                .HasOne(a => a.Student)
                .WithMany(b => b.BookLoans)
                .HasForeignKey(a => a.StudentId);
        }
    }
}
