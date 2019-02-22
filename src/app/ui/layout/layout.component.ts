import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService:AuthService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/Login') {
          this.isAuthenticated = false;
        } else {
          this.isAuthenticated = true;
        }
      }
    })

  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
