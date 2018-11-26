import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedItem;

  constructor() { }

  ngOnInit() {
  }

  listClick(event, newValue) {
    
    this.selectedItem = newValue; 
    console.log(this.selectedItem);
}

}
 