import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {


  name;
  address;
  phoneNumber;

  constructor(public dialogRef: MatDialogRef<ClientComponent>,
    private _clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
    this._clientService.getClient().subscribe(result => {
      this.name = result.name;
      this.address = result.address;
      this.phoneNumber = result.phoneNumber;
    })
  }

  save() {
      var client = {
        name: this.name,
        address: this.address,
        phoneNumber: this.phoneNumber
      }
      this._clientService.editClient(client).subscribe((result) => {
        this.dialogRef.close("Edit");
      });
  }

  cancel() {
    this.dialogRef.close();
  }

}
