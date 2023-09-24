import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { fileCollection, roles } from 'src/app/models/enum';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [
  ]
})
export class UserEditComponent {
  user!: User;
  userForm!: FormGroup;
  tmpFile!: File;
  tmpImage!: any;

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);
    });

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [roles.user, Validators.required],
    });
  }

  setTmpImage(event: any) {
    if (event.target.files && event.target.files.length) {
      this.tmpFile = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(this.tmpFile);
      reader.onloadend = () => {
        this.tmpImage = reader.result;
      }
    } else {
      this.tmpImage = null;
    }
  }

  update() {
    
  }
}
