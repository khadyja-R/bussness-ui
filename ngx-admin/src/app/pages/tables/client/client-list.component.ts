import { Component , OnInit} from '@angular/core';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {
  clients: any[] = [];
  filteredClients: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm = '';

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.clientService.getAllClients().subscribe((data: any[]) => {
      this.clients = data;
      this.filteredClients = [...this.clients];
    });
  }

  onEdit(client: any) {
    this.router.navigateByUrl(`/pages/tables/edit-client/${client.id}`);
  }



  onDelete(client: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.clientService.DeleteClient(client.id).subscribe(() => {
        this.clients = this.clients.filter((c) => c.id !== client.id);
        this.filteredClients = this.filteredClients.filter(
          (c) => c.id !== client.id
        );
      });
    }
  }

  filterClients() {
    this.filteredClients = this.clients.filter((client: any) => {
      return (
        client.firstName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        client.lastName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  totalPages(): number {
    return Math.ceil(this.filteredClients.length / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }

  onNavigateToProjects(id: string) {
    this.router.navigateByUrl(`/pages/tables/projects/${id}`);
  }

}
