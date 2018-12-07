import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedItem;
  userName;

  constructor(private router: Router ) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = obj.userName;
  }

  listClick(event, newValue) {
    this.selectedItem = newValue; 
    console.log(this.selectedItem);
  }
  
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/Login']);
  }  



}
 