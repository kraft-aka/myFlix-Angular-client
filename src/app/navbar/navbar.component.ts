import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Route navigates to Profile Page
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Route navigates to Welcome Page
   */
  logOut(): void {
    this.router.navigate(['welcome']);
  }

  /**
   * Route navigates to Movies Page
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

}
