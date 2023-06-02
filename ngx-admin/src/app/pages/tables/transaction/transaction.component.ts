import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';



@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  paginatedTransactions: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchQuery = '';

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe((data: any[]) => {
      this.transactions = data;
      this.paginateTransactions();
    });
  }

  paginateTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTransactions = this.transactions.slice(startIndex, endIndex);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.paginateTransactions();
  }

  get totalPages(): number {
    return Math.ceil(this.transactions.length / this.itemsPerPage);
  }

  searchTransactions() {
    if (this.searchQuery.trim() !== '') {
      this.paginatedTransactions = this.transactions.filter((transaction: any) => {
        return (
          transaction.projects.some((project: any) =>
            project.summary.toLowerCase().includes(this.searchQuery.toLowerCase())
          ) ||
          transaction.percentage.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          transaction.status.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      this.paginateTransactions();
    }
  }
}
