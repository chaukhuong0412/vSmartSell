import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RoleService, Role } from 'src/app/role.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { StoreService, Store } from 'src/app/store.service';
import { CompanyService, Company } from 'src/app/company.service';


@Component({
  selector: 'app-user-create-dialog',
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.css'],
  providers: [UserService, RoleService]
})
export class UserCreateDialogComponent implements OnInit {

  userName: string;
  password;
  confirmPassword;
  fullName;
  roles: Role[];
  stores: Store[];
  storeId;
  companies: Company[];
  companyId;
  selectedRoles = [];
  selectedStores = [];
  selectedCompanies = [];
  notMatched = false;
  hasWhiteSpace = false;

  constructor(public dialogRef: MatDialogRef<UserCreateDialogComponent>, 
    private _userService: UserService, 
    private _roleService: RoleService,
    private _storeService: StoreService,
    private _companyService: CompanyService, 
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this._roleService.getListRoles().subscribe(result => {
      this.roles = result;
    })

    this._companyService.getListCongTyManagedBy(currentUser.userName).subscribe(result => {
      this.companies = result;
    })
    this._storeService.getListCuaHangManagedBy(currentUser.userName).subscribe(result => {
      this.stores = result;
    })
  }

  companySelected() {
    this.storeId = undefined;
  }

  storeSelected() {
    this.companyId = undefined;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createUser() {
    if (this.password != this.confirmPassword)
      this.notMatched = true;
    else if (this.userName.includes(" "))
      this.hasWhiteSpace = true;
    else {
      var user = {
        userName:this.userName,
        password:this.password,
        fullName:this.fullName,
        roleIds: this.selectedRoles,
        companyId: this.companyId,
        storeId: this.storeId,
        storeIds: this.selectedStores,
        companyIds: this.selectedCompanies
      }
      this._userService.createUser(user).subscribe(s => {
        this.dialogRef.close("Create");
      })
      // error => {
      //   alert(error.error.Code);
      // } );
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  



}
