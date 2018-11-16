import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'userName'];
  dataSource: object[];

  columnsToDisplay = ['name', 'path'];
  
  users;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getListUser().subscribe( result => {
      this.dataSource = result;
    });
  }

  openCreateUserDialog() {
    console.log("click!");
  }

}


