import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientComponent } from '../../user/client/client.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ClientService } from '../../user/client/client.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //dialogRef: MatDialogRef<ClientComponent>;

  selectedItem;
  userName;

  constructor(private router: Router, public dialog: MatDialog ) { }

  ngOnInit() {
    var obj = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = obj.userName;
  }

  listClick(event, newValue) {
    this.selectedItem = newValue; 
    console.log(this.selectedItem);    
  }

  openClientInformationDialog(event) {
    this.listClick(event, 14)
    const dialogRef = this.dialog.open(ClientComponent, {
      disableClose: false,
      width: '745px',
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/Login']);
  }  

}

