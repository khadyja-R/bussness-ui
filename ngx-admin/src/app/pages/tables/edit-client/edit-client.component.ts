import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client/client.service';
@Component({
  selector: 'ngx-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  clientId: number;
  client: any = {};
  firstName: string;
  lastName: string;
  email: string;
  status:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.clientId = params['id'];
      this.loadClientDetails();
    });
  }


  loadClientDetails() {
    this.clientService.getClientbyId(this.clientId).subscribe((data: any) => {
      this.client = data;
      this.firstName = this.client.firstName;
      this.lastName = this.client.lastName;
      this.email = this.client.email;
      this.status=this.client.status;
    });
  }

  
  onSubmit() {
    const updatedClient = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      status:this.status
    };

    this.clientService.updateClient(this.clientId, updatedClient).subscribe(() => {
      // Redirect back to the client list 
      this.router.navigateByUrl('/pages/tables/Client');
    });
  }

}
