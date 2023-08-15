import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { fileCollection } from 'src/app/models/enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  user!: User;
  generalForm!: FormGroup;
  tmpFile!: File;
  tmpImage!: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService,
  ) {
    this.user = userService.user;
    console.log(this.user)
  }

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  saveGeneralForm(): void {
    
    this.userService.updateUser(this.generalForm.value).subscribe((response) => {
      Swal.fire({
        title: 'Success',
        text: response.msg,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
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

  uploadImage() {
    this.fileUploadService.updateFile(this.tmpFile, fileCollection.user, this.user.id)
      .subscribe((response: any) => {
        this.user.image = response.fileName;

        Swal.fire({
          title: 'Success',
          text: response.msg,
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }, (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
  }
}
