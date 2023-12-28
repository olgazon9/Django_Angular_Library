import { Component, OnInit } from '@angular/core';
import { Loaner, LoanerService } from '../loaners.service';

@Component({
  selector: 'app-loaners',
  templateUrl: './loaners.component.html',
  styleUrls: ['./loaners.component.css']
})
export class LoanersComponent implements OnInit {
  loaners: Loaner[] = [];
  selectedLoaner: Loaner = this.getNewLoaner(); // Initialize with a new loaner
  isEditMode = false;

  constructor(private loanerService: LoanerService) {}

  ngOnInit(): void {
    this.loadLoaners();
  }

  loadLoaners(): void {
    this.loanerService.getLoaners().subscribe(data => {
      this.loaners = data;
    });
  }

  selectLoaner(loaner: Loaner): void {
    this.selectedLoaner = { ...loaner };
    this.isEditMode = true;
  }

  saveLoaner(loaner: Loaner): void {
    if (this.isEditMode) {
      this.loanerService.updateLoaner(loaner.id!, loaner).subscribe(() => {
        this.loadLoaners();
      });
    } else {
      this.loanerService.createLoaner(loaner).subscribe(() => {
        this.loadLoaners();
      });
    }
    this.cancelEdit();
  }

  deleteLoaner(loaner: Loaner): void {
    this.loanerService.deleteLoaner(loaner.id!).subscribe(() => {
      this.loadLoaners();
    });
  }

  cancelEdit(): void {
    this.selectedLoaner = this.getNewLoaner();
    this.isEditMode = false;
  }

  private getNewLoaner(): Loaner {
    return {
      name: '',
      age: null,
      email: ''
    };
  }
}
