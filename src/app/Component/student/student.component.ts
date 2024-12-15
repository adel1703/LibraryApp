import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any[] = [];
  selectedStudent: any = null;
  newStudent: any = { id: 0, name: '', dayOfBirth: '' };
  editing: boolean = false;
  errorMessage: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: any[]) => {
        this.students = data.map(student => ({
          ...student,
          age: this.calculateAge(student.dayOfBirth)  
        }));
      },
      (error) => {
        this.errorMessage = 'Error loading students: ' + error;
        console.error(error);
      }
    );
  }
  
  calculateAge(dateOfBirth: string): number {
    const today = new Date();            // الحصول على التاريخ الحالي
    const birthDate = new Date(dateOfBirth);  // تحويل تاريخ الميلاد إلى اوبجيكت Date
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;  
    }
    
    return age;  
  }

  selectStudent(student: any): void {
    this.selectedStudent = { ...student};
    this.editing = true;
  }

  addStudent(): void {
    const today = new Date();
    const birthDate = new Date(this.newStudent.dayOfBirth); 
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    if (age < 7) {
      this.errorMessage = 'Student age must be at least 7 years old.';
      return;
    }
  
    const studentDto = {
      name: this.newStudent.name,
      dayOfBirth: this.newStudent.dayOfBirth 
    };
  
    this.studentService.addStudent(studentDto).subscribe(
      () => {
        this.loadStudents();
        this.newStudent = { id: 0, name: '', dayOfBirth: '' }; 
        this.errorMessage = ''; 
      },
      (error) => {
        this.errorMessage = 'Error adding student: ' + error;
        console.error(error);
      }
    );
  }

  updateStudent(): void {
    if (this.selectedStudent) {
      const today = new Date();
      const birthDate = new Date(this.selectedStudent.dayOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      if (age < 7) {
        this.errorMessage = 'Student age must be at least 7 years old.';
        return;
      }
  
      const studentDto = {
        id: this.selectedStudent.id,
        name: this.selectedStudent.name,
        dayOfBirth: this.selectedStudent.dayOfBirth 
      };
  
      this.studentService.updateStudent(this.selectedStudent.id, studentDto).subscribe(
        () => {
          this.loadStudents();
          this.selectedStudent = null;
          this.editing = false;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Error updating student: ' + error;
          console.error(error);
        }
      );
    }
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        this.loadStudents();
      },
      (error) => {
        this.errorMessage = 'Error deleting student: ' + error;
        console.error(error);
      }
    );
  }
}
