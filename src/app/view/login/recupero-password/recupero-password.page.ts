import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recupero-password',
  templateUrl: './recupero-password.page.html',
  styleUrls: ['./recupero-password.page.scss'],
})
export class RecuperoPasswordPage implements OnInit{
  private router = inject(Router);

  origen: string = "";
  
  password = new FormControl("", [ Validators.required ])
  repitePassword = new FormControl("", [ Validators.required ])

  ngOnInit(): void {
    this.origen = this.router.parseUrl(this.router.url).queryParams['origen'];
    console.log(this.origen);
  }

  enter() {

    if ((this.password.valid && this.repitePassword.valid) && ((this.password.value === this.repitePassword.value)) ) {

      console.log(this.password.value);
      console.log(this.repitePassword.value);

      this.router.navigateByUrl('/configuracion?ok=true')

    }

  }

}
