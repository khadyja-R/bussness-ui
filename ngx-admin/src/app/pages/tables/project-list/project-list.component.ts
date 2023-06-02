import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../Client-Project-List/project.service';
@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  paginatedProjects: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchQuery = '';
  filtredProjects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((data: any[]) => {
      this.projects = data;
      this.filtredProjects = data; // Assign the retrieved data to both arrays
      this.paginateProjects();
    });
  }
  

  paginateProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProjects = this.projects.slice(startIndex, endIndex);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.paginateProjects();
  }

  
  get totalPages(): number {
    return Math.ceil(this.projects.length / this.itemsPerPage);
  }


  searchProjects() {
    this.filtredProjects = this.projects.filter((project: any) => {
      return (
        project.summary.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.client.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
    this.paginateProjects(); // Update the paginated projects based on the search results
  }
  
  

}
