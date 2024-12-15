    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using libraryBackEnd.Data;
using libraryBackEnd.Entity;

namespace libraryBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookLoansController : ControllerBase
    {
        private readonly LibraryDbContext _context;

        public BookLoansController(LibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/BookLoans
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookLoan>>> GetBooksLoan()
        {
            return await _context.BooksLoan.ToListAsync();
        }

        // GET: api/BookLoans/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookLoan>> GetBookLoan(int id)
        {
            var bookLoan = await _context.BooksLoan.FindAsync(id);

            if (bookLoan == null)
            {
                return NotFound();
            }

            return bookLoan;
        }

        // PUT: api/BookLoans/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookLoan(int id, BookLoan bookLoan)
        {
            if (id != bookLoan.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookLoan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookLoanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookLoans
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookLoan>> PostBookLoan(BookLoan bookLoan)
        {
            _context.BooksLoan.Add(bookLoan);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookLoan", new { id = bookLoan.Id }, bookLoan);
        }

        // DELETE: api/BookLoans/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookLoan(int id)
        {
            var bookLoan = await _context.BooksLoan.FindAsync(id);
            if (bookLoan == null)
            {
                return NotFound();
            }

            _context.BooksLoan.Remove(bookLoan);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookLoanExists(int id)
        {
            return _context.BooksLoan.Any(e => e.Id == id);
        }
    }
}
