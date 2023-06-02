import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ClientProjectListComponent implements OnInit {
  clientId: string;
  projectDetails: any[];
  paginatedProjectDetails: any[];
  currentPage = 1;
  itemsPerPage = 10;
  clientName:string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.clientId = params['id'];
      this.getProjectDetails(this.clientId);
    });
  }

  getProjectDetails(clientId: string) {
    this.projectService.getProjectByClientId(clientId).subscribe(
      (data: any) => {
        this.projectDetails = data;
        this.paginateProjectDetails();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  paginateProjectDetails() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProjectDetails = this.projectDetails.slice(startIndex, endIndex);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.paginateProjectDetails();
  }

  totalPages(): number {
    if (!this.projectDetails) {
      return 0;
    }
    return Math.ceil(this.projectDetails.length / this.itemsPerPage);
  }
  
}
