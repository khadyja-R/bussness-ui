import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router,ActivatedRoute  } from '@angular/router';
import { AuthService } from '../../../login/services/auth.service';
import { AffilatorService } from '../../../pages/profile-affilator/affilator.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {


  fullName:string;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Profile', action: () => this.navigateToProfile() },
    { title: 'Log out', action: () => this.authService.logout() }
  ];
  
  
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private affilatorService :AffilatorService
              ) {
  }
  
  ngOnInit() {

    this.fullName = this.affilatorService.getFullName(); // Get the fullName from the shared service
    console.log( this.affilatorService.getFullName(), "fiiiiiiiiiiiiiiiiii")




    this.currentTheme = this.themeService.currentTheme;
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);


      this.menuService.onItemClick()
      .subscribe(menuitem => {
        this.handleMenuItemClick(menuitem.item);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

 

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

 

  handleMenuItemClick(item: any) {
    if (item.title === 'Profile') {
      this.navigateToProfile();
    } else if (item.title === 'Log out') {
      console.log("handle log out click ")
      this.authService.logout();
    }
  }

  
  navigateToProfile() {
    console.log('Handling profile click');
    const email = this.authService.getLoggedInEmail();
    console.log('Handling profile click', email);
    if (email) {
      this.router.navigate(['/pages/profile', email]);
    }
  }
  
  


}
