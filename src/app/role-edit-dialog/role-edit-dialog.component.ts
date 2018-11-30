import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from '../role.service';
import { PermissionService, Permission } from '../permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-role-edit-dialog',
  templateUrl: './role-edit-dialog.component.html',
  styleUrls: ['./role-edit-dialog.component.scss'],
  providers: [RoleService, PermissionService]

})
export class RoleEditDialogComponent implements OnInit {

  private id : number;
  private sub: any;
  name;
  permissionIds: Number[];
  permissions: Permission[];
  selectedPermissions;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<RoleEditDialogComponent>, 
              private _permissionService : PermissionService, private _roleService : RoleService,  private router: Router) {}

  ngOnInit() {
    this._permissionService.getListPermissions().subscribe( result => {
      this.permissions = result;
    });
    
    this._roleService.getRole(this.data.id).subscribe( result => {
      this.name = result.name;
      this.selectedPermissions = result.permissionIds
    });
  }

  save() {
    var role = {
      id: this.data.id,
      name:this.name,
      permissionIds: this.selectedPermissions
    }
    this._roleService.editRole(role).subscribe((result) => {
      this.dialogRef.close("Edit");
    });
  }

  cancel() {
    this.dialogRef.close();
  }


}
