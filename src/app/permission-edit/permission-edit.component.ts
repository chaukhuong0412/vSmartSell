import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../permission.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.css'],
  providers: [PermissionService]
})
export class PermissionEditComponent implements OnInit {

  private id : number;
  private sub: any;
  private name : string;
  private featureName: string;
  private description: string;

  constructor(private route : ActivatedRoute, private _permissionService : PermissionService,  private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(
        params  => {
            this.id = +params["id"]; // cast to number
        }
    );
    
    this._permissionService.getPermission(this.id).subscribe( result => {
      this.name = result.name;
      this.featureName = result.featureName;
      this.description = result.description;
    });

    
  }

  save() {
    var permission = {
      Id: this.id,
      name: this.name,
      featureName: this.featureName,
      description: this.description
    }
    this._permissionService.editPermission(permission).subscribe((result) => {
      this.router.navigate(['Permission']);
      console.log(result);
    });
  }
}
