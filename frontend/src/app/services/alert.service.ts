import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _snackBar: MatSnackBar) {}

  alert(text: string) {
    this._snackBar.open(text, '', {
      duration: 3000,
    });
  }
}
