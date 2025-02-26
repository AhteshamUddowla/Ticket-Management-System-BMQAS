import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'tickets', component: TicketListComponent, title: 'Tickets'},
    {path: 'users', component: UserListComponent, title: 'Users'},
    {path: 'users-details', component: UserDetailsComponent, title: 'User details'},
];
