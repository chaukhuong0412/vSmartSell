import { Component, OnInit } from '@angular/core';
import { PermissionService, Permission } from 'src/app/permission.service';
import { RoleService } from 'src/app/role.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-create-dialog',
  templateUrl: './role-create-dialog.component.html',
  styleUrls: ['./role-create-dialog.component.scss'],
  providers: [PermissionService, RoleService]

})
export class RoleCreateDialogComponent implements OnInit {

  name;
  permissions: Permission[];
  selectedPermissions;
  permissionGroups;

  // permissionGroups = [
  //   {
  //     name: "Administrator",
  //     permissions: [
  //       {id: "ADMINISTRATOR", display: "View admin dashboard"},
  //       {id: "ADMINISTRATOR1", display: "View admin1 dashboard"},
  //       {id: "ADMINISTRATOR2", display: "View admin2 dashboard"},
  //       {id: "ADMINISTRATOR3", display: "View admin3 dashboard"},
  //     ]
  //   },
  //   {
  //     name: "Roles",
  //     permissions: [
  //       {id: "CREATE", display: "CREATE admin dashboard"},
  //       {id: "VIEW", display: "View admin1 dashboard"},
  //       {id: "EDIT", display: "EDIT admin2 dashboard"},
  //       {id: "DELETE", display: "DELETE admin3 dashboard"},
  //     ]
  //   },
  //   {
  //     name: "Stores",
  //     permissions: [
  //       {id: "CREATE", display: "CREATE store dashboard"},
  //       {id: "VIEW", display: "View store dashboard"},
  //       {id: "EDIT", display: "EDIT store dashboard"},
  //       {id: "DELETE", display: "DELETE store dashboard"},
  //     ]
  //   },
  //   {
  //     name: "Companies",
  //     permissions: [
  //       {id: "CREATE", display: "CREATE company dashboard"},
  //       {id: "VIEW", display: "View company dashboard"},
  //       {id: "EDIT", display: "EDIT company dashboard"},
  //       {id: "DELETE", display: "DELETE company dashboard"},
  //     ]
  //   }
  // ];

  permissionChecked = [];

  constructor(public dialogRef: MatDialogRef<RoleCreateDialogComponent>,
                 private _permissionService: PermissionService, private _roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this._permissionService.getListPermissions().subscribe(result => {
      this.permissions = result;
    });
    
    this._permissionService.getPermissionGroups().subscribe(result => {
      this.permissionGroups = result;
    })
  
  }

  createRole() {


    var selectedPermissions = [];
    var checkBoxes =  document.getElementsByClassName('childCheckbox');
    for (var i = 0; i < checkBoxes.length; i++) {
      var x = <HTMLInputElement> checkBoxes[i];
      if (x.attributes.getNamedItem('ng-reflect-checked')) {
        selectedPermissions.push(x.attributes.getNamedItem('ng-reflect-value').value);
      }
    }
    console.log(selectedPermissions);


    var role = {
      name:this.name,
      permissionIds: selectedPermissions
    }
    this._roleService.createRole(role).subscribe((result) => {
      this.dialogRef.close("Create");
    });
  }

  cancel() {
    this.dialogRef.close();
    console.log(this.selectedPermissions);
  }
  
  selectGroup(index) {
    this.permissionChecked[index] = !this.permissionChecked[index];
  }

  getChecked(i) {

  }
  

}
