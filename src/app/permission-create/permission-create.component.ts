import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.css'],
  providers: [PermissionService]
})
export class PermissionCreateComponent implements OnInit {

  name;
  featureName;
  description;

  constructor(private _permissionService: PermissionService, private router: Router) { }

  ngOnInit() {
  }

  createPermission() {
    var permission = {
      name:this.name,
      featureName:this.featureName,
      description : this.description
    }
    this._permissionService.createPermission(permission).subscribe((result) => {

      var User = {
        name: result.name,
        id:result.id
      };
      this.router.navigate(['Permission']);
    });
    
  }
  
}
