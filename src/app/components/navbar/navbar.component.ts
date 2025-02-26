import { Component } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isBadgeVisible:boolean = false
  badgeVisibility(){
    this.isBadgeVisible = !this.isBadgeVisible
  }
}
