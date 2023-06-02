import { Component, OnInit, Input,Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AffilatorService } from './affilator.service';

@Component({
  selector: 'ngx-profile-affilator',
  templateUrl: './profile-affilator.component.html',
  styleUrls: ['./profile-affilator.component.scss']
})
export class ProfileAffilatorComponent implements OnInit {
  @Output() fullNameFetched: EventEmitter<string> = new EventEmitter<string>();

  @Input() id: string;
  // Affilator properties
  email :string;
  fullName: string;
  lastName: string;
  address: string;
  phone: string;
  affiliate_code: string;
  country: string;
  city: string;
  // Banking Profile properties
  bankCity: string;
  bankCountry: string;
  rib: string;
  bankName: string;

  successMessageVisible: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private affilatorService: AffilatorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.id = id;
      this.fetchAffilatorData(id);
    });
  }

  fetchAffilatorData(id: string): void {
    this.http.get<any>(`http://localhost:8097/api/affilators?id=${id}`)
      .subscribe(
        response => {
          const affilatorData = response[0];
          this.id = affilatorData.id;
          this.fullName = affilatorData.fullName;
          this.affilatorService.setFullName(this.fullName); 
          console.log(this.affilatorService.getFullName(), "ssssssssssssssss"); // Log the value from the service
          this.email = affilatorData.email;
          this.phone = affilatorData.phone;
          this.address = affilatorData.address;
          this.city = affilatorData.city;
          this.country = affilatorData.country;
          this.affiliate_code = affilatorData.affiliate_code;
  
          this.fetchBankProfileData(affilatorData.id);
        },
        error => {
          console.error('Error fetching affilator data', error);
        }
      );
  }
  

  fetchBankProfileData(affilatorId: string): void {
    this.http.get<any>(`http://localhost:8097/api/affilators/${affilatorId}/bankDetails`)
      .subscribe(
        response => {
          const bankProfileData = response;
          this.bankCity = bankProfileData.city;
          this.bankCountry = bankProfileData.country;
          this.rib = bankProfileData.rib;
          this.bankName = bankProfileData.bankName;
        },
        error => {
          console.error('Error fetching bank profile data', error);
        }
      );
  }
  

  saveProfile(): void {
    const fullName = this.fullName;
    const phone = this.phone;
    const affilatorData = {
      firstName: this.fullName,
      lastName: this.lastName,
      email: this.email,
      address: this.address,
      phone: this.phone,
      affiliate_code: this.affiliate_code,
      city: this.city,
      country: this.country,
      bankingProfileId: ''
    };
  
    const bankingProfileData = {
      city: this.bankCity,
      country: this.bankCountry,
      rib: this.rib,
      bankName: this.bankName
    };
  
    // First, create the banking profile
    this.http.post('http://localhost:8097/api/v1/bankProfile', bankingProfileData)
      .subscribe(
        bankingResponse => {
          // Retrieve the created banking profile's ID
          const bankingProfileId = bankingResponse['id'];
  
          // Then, create the Affilator with the banking profile ID
          affilatorData.bankingProfileId = bankingProfileId;

          affilatorData['id'] = this.id;
          this.http.post(`http://localhost:8097/api/affilators/stage2/${this.id}`, affilatorData)
           .subscribe(
              response => {
                // Profile saved successfully
                this.successMessageVisible = true;
              },
              error => {
                console.error('Error saving profile', error);
              }
            );
        },
        error => {
          console.error('Error creating banking profile', error);
        }
      );
  }
  



}