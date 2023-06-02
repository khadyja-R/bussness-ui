import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
 
  {
    title: 'Client',
    icon: 'people-outline',
    link: '/pages/tables/Client',
    
  },

  {
    title: 'Project',
    icon: 'briefcase-outline',
    link: '/pages/tables/Projects',
     
  },

  {
    title: 'Transaction',
    icon: 'bar-chart-outline', 
    link: '/pages/tables/transaction',
     
  },
];
