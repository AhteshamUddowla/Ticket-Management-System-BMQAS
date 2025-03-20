import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { authGuard, redirectIfAuthenticatedGuard, redirectIfEmployeeOrGuestGuard, redirectIfGuestGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArchiveTicketsListComponent } from './components/archive-tickets-list/archive-tickets-list.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login', canActivate: [redirectIfAuthenticatedGuard]},

    {
        path: '',
        component: NavbarComponent,
        canActivate: [authGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, title: 'Dashboard', canActivate: [authGuard, redirectIfGuestGuard]},
            {path: 'tickets', component: TicketListComponent, title: 'Tickets', canActivate: [authGuard]},
            {path: 'archive-tickets', component: ArchiveTicketsListComponent, title: 'Archive Tickets', canActivate: [authGuard]},
            {path: 'tickets-details', component: TicketDetailsComponent, title: 'Ticket Details', canActivate: [authGuard]},
            {path: 'users', component: UserListComponent, title: 'Users', canActivate: [authGuard,redirectIfEmployeeOrGuestGuard]},
        ]
    },

    // { path: '**', redirectTo: 'login' }
];
