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
    public class StudentsController : ControllerBase
    {
        private readonly LibraryDbContext _context;

        public StudentsController(LibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            // تحقق من مطابقة المعرف بين المسار والجسم
            if (id != student.Id)
            {
                return BadRequest("Student ID in URL does not match the ID in the body.");
            }

            // جلب الطالب من قاعدة البيانات
            var existingStudent = await _context.Students.FindAsync(id);

            // إذا لم يتم العثور على الطالب
            if (existingStudent == null)
            {
                return NotFound("Student not found.");
            }

            // تحديث البيانات
            existingStudent.Name = student.Name;
            existingStudent.DayOfBirth = student.DayOfBirth;

            // تعديل الحالة إلى Modified
            _context.Entry(existingStudent).State = EntityState.Modified;

            try
            {
                // حفظ التغييرات
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound("Student no longer exists.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // تحقق إذا كان الطالب موجودًا
        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.Id == id);
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}
