import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  endpoints = {
    avatar: 'http://localhost:3000/api/users/me/avatar',
  };

  postFile(fileToUpload: File, key: string) {
    const endpoint = this.endpoints[key];
    const formData: FormData = new FormData();
    formData.append(key, fileToUpload);
    return this.http.post(endpoint, formData, { withCredentials: true }).pipe(
      tap(
        () => {
          const whatWasUpdated = [...key];
          whatWasUpdated[0] = whatWasUpdated[0].toUpperCase();
          this.alertService.alert(
            `${whatWasUpdated.join('')} was successfully uploaded`
          );
        },
        (err) => {
          console.error(err);
          this.alertService.alert(err.error.error);
        }
      )
    );
  }
}
