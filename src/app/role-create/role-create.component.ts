import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import { PermissionService, Permission } from '../permission.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
  providers: [RoleService, PermissionService]
})
export class RoleCreateComponent implements OnInit {

  @ViewChild('listpermissions') listpermissions;

  name;
  permissions: Permission[];
  selectedPermissions;

  constructor(private _roleService: RoleService, private _permissionService: PermissionService, private router: Router) { }

  ngOnInit() {
    this._permissionService.getListPermissions().subscribe(result => {
      this.permissions = result;
    });
  }

  createRole() {
    var role = {
      name:this.name,
      permissionIds: this.selectedPermissions
    }
    this._roleService.createRole(role).subscribe((result) => {
      this.router.navigate(['Role']);
    });

  }
  
  

}
