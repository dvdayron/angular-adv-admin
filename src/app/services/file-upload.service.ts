import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { fileCollection } from '../models/enum';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  updateFile(archive: File, collection: fileCollection, documentId: any) {
    const url = `${environment.apiUrl}uploads/${collection}/${documentId}`;
    const formData = new FormData();
    formData.append('image', archive);

    return this.httpClient.put(url, formData, { 
      headers: {
        'auth-token': this.token,
      }
    });
  }

  get token() {
    return localStorage.getItem('auth-token') || '';
  }
}
