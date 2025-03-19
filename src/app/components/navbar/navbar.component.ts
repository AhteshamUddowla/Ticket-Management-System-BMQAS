import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isNavbarHidden = false;
  // isDrawerOpen = false;
  // isBadgeVisible = false;
  username = ''
  role = ''

  constructor(private authService: AuthService, private router: Router,
    private breakpointObserver: BreakpointObserver, private snackBar: MatSnackBar,) {
    this.getUser()
  }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
      '(min-width: 770px) and (max-width: 960px)' // Ensure menu button is visible in this range
    ]).subscribe(result => {
      this.isNavbarHidden = result.matches;
      // if (!this.isNavbarHidden) {
      //   this.isDrawerOpen = false; // Close sidebar on large screens
      // }
    });
  }

  getUser(){
    this.authService.getUserDetails().subscribe(user => {
      this.username = user.name;  
      this.role = user.role
    });
  }

  // badgeVisibility(){
  //   this.isBadgeVisible = !this.isBadgeVisible
  // }

  showSuccessSnackbar(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  logout(){
    this.authService.logOut().subscribe((res)=>{
      this.showSuccessSnackbar(res.message);
      this.router.navigate(['/login']);
    }
    // ,(err: any)=>{
    //     console.log('Logout Failed',err)
    //   }
    );
  }
}
