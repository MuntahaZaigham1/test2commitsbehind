import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { UserspermissionService } from '../userspermission.service';
import { IUserspermission
 } from '../iuserspermission';
import { BaseDetailsComponent, FieldType, PickerDialogService } from 'src/app/common/shared';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { PermissionService } from 'src/app/admin/user-management/permission/permission.service';
import { UsersService } from 'src/app/admin/user-management/users/users.service';

@Component({
  selector: 'app-userspermission-details',
  templateUrl: './userspermission-details.component.html',
  styleUrls: ['./userspermission-details.component.scss']
})
export class UserspermissionDetailsComponent extends BaseDetailsComponent<IUserspermission> implements OnInit {
	title = 'Userspermission';
	parentUrl = 'userspermission';
	constructor(
		public formBuilder: FormBuilder,
		public router: Router,
		public route: ActivatedRoute,
		public dialog: MatDialog,
		public userspermissionService: UserspermissionService,
		public pickerDialogService: PickerDialogService,
		public errorService: ErrorService,
		public permissionService: PermissionService,
		public usersService: UsersService,
		public globalPermissionService: GlobalPermissionService,
	) {
		super(formBuilder, router, route, dialog, pickerDialogService, userspermissionService, errorService);
  }

	ngOnInit() {
		this.entityName = 'Userspermission';
		this.setAssociations();
		super.ngOnInit();
		this.setForm();
    	this.getItem();
	}
  
  setForm(){
    this.itemForm = this.formBuilder.group({
      permissionId: ['', Validators.required],
      revoked: [false],
      usersId: ['', Validators.required],
      permissionDescriptiveField : [''],
      usersDescriptiveField : [''],
      
    });
    
    this.fields = [
        {
		  name: 'revoked',
		  label: 'revoked',
		  isRequired: false,
		  isAutoGenerated: false,
          type: FieldType.Boolean,
	    },
      ];
      
  }
  
  onItemFetched(item: IUserspermission) {
    this.item = item;
     this.itemForm.patchValue(item);

  }
  
  setAssociations(){
    this.associations = [
      {
        column: [
	        {
	          key: 'permissionId',
	          value: undefined,
	          referencedkey: 'id'
			},
		],
		isParent: false,
		table: 'permission',
		type: 'ManyToOne',
		label: 'permission',
		service: this.permissionService,
		descriptiveField: 'permissionDescriptiveField',
	    referencedDescriptiveField: 'displayName',
		},
      {
        column: [
	        {
	          key: 'usersId',
	          value: undefined,
	          referencedkey: 'id'
			},
		],
		isParent: false,
		table: 'users',
		type: 'ManyToOne',
		label: 'users',
		service: this.usersService,
		descriptiveField: 'usersDescriptiveField',
	    referencedDescriptiveField: 'firstname',
		},
		];
		
		this.childAssociations = this.associations.filter(association => {
			return (association.isParent);
		});

		this.parentAssociations = this.associations.filter(association => {
			return (!association.isParent);
		});
	}
	
	onSubmit() {
    		let userspermission = this.itemForm.getRawValue();



                super.onSubmit(userspermission);



    	}
}
