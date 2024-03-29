import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CompanyService, Company } from '../company.service';
import { Store, StoreService } from '../../store/store.service';

@Component({
  selector: 'app-company-edit-dialog',
  templateUrl: './company-edit-dialog.component.html',
  styleUrls: ['./company-edit-dialog.component.scss'],
  providers: [CompanyService, StoreService]
})
export class CompanyEditDialogComponent implements OnInit {

  company: Company;
  companyTitle;
  address;
  phoneNumber;
  numberOfAccountAllowed;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CompanyEditDialogComponent>,
    private _companyService: CompanyService,
    private _cuaHangService: StoreService) { }

  ngOnInit() {
    console.log(this.data.id);
      this._companyService.getCompany(this.data.id).subscribe(result => {
        this.companyTitle = result.title;
        this.address = result.address;
        this.phoneNumber = result.phoneNumber;
        this.numberOfAccountAllowed = result.numberOfAccountAllowed;
      });
  }

  save() {
      var company = {
        id: this.data.id,
        title: this.companyTitle,
        address: this.address,
        phoneNumber: this.phoneNumber,
        numberOfAccountAllowed: this.numberOfAccountAllowed
      }
      this._companyService.editCompany(company).subscribe((result) => {
        this.dialogRef.close("Edit");
      });
    
  }

  cancel() {
    this.dialogRef.close();
  }
}
