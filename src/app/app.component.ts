import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vSmartSellFrontEnd';
  routerOutletComponent: object;
  routerOutletComponentClass: string;

  onActivate(event: any): void {
    this.routerOutletComponent = event;
    this.routerOutletComponentClass = event.constructor.name;
    console.log("Activated: ", this.routerOutletComponentClass);
  }
}
