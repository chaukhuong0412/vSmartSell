import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { PermissionService, Permission } from '../permission.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css'],
  providers: [RoleService, PermissionService]
})
export class RoleEditComponent implements OnInit {

  private id : number;
  private sub: any;
  name;
  permissionIds: Number[];
  permissions: Permission[];
  selectedPermissions;


  constructor(private route : ActivatedRoute, private _permissionService : PermissionService, private _roleService : RoleService,  private router: Router) {}

  
  ngOnInit() {
    this.sub = this.route.params.subscribe(
        params  => {
            this.id = +params["id"]; // cast to number
        }
    );

    this._permissionService.getListPermissions().subscribe( result => {
      this.permissions = result;
    });
    
    this._roleService.getRole(this.id).subscribe( result => {
      this.name = result.name;
      this.selectedPermissions = result.permissionIds
    });
  }

  save() {
    var role = {
      id: this.id,
      name:this.name,
      permissionIds: this.selectedPermissions
    }
    this._roleService.editRole(role).subscribe((result) => {
      this.router.navigate(['Role']);
    });

  }

}
