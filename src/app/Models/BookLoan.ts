export interface IbookLoan {
    id: number;
    borrowedAt: string;   
    returnedAt: string | null;  
    studentId: number;
    bookId: number;
    studentName?: string;
    bookTitle?: string;
    hide: boolean;
  }
  