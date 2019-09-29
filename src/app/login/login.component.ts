import { Component, OnInit } from '@angular/core';
import  {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private authService : AuthService, private router: Router, public toasterService : ToasterService) {}
 
  ngOnInit() {
  }

  onSubmit() {
    this.authService.login()
    .subscribe(data => {
        this.authService.saveToken(data.AccessToken);
        this.toasterService.showToaster('successToastr', 'Success!', 'You are logged in now.','top-right');
        this.router.navigate(['/dashboard']);

    },error => {
      console.log('error while login');
  }) ;
  }

}
