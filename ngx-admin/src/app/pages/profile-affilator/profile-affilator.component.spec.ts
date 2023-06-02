import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAffilatorComponent } from './profile-affilator.component';

describe('ProfileAffilatorComponent', () => {
  let component: ProfileAffilatorComponent;
  let fixture: ComponentFixture<ProfileAffilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAffilatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAffilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
