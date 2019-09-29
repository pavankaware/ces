import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastr: ToastrManager) { }

  showToaster(type, header, message, position) {
    this.toastr[type](message, header, {
      position: position
    });
  }
}
