import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMenuOpen = false;
  isUserMenuOpen = false;

  constructor(
    private router: Router,
    private authService: AuthService
) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']); 
  }

  goToProfile(): void {
    this.router.navigate(['/profile']); // Redirige a la página de perfil
  }
}
