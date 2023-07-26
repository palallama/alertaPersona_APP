import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recupero-password',
  templateUrl: './recupero-password.page.html',
  styleUrls: ['./recupero-password.page.scss'],
})
export class RecuperoPasswordPage {

  password = new FormControl("", [ Validators.required ])
  repitePassword = new FormControl("", [ Validators.required ])

  enter() {

    if ((this.password.valid && this.repitePassword.valid) && ((this.password.value === this.repitePassword.value)) ) {

      console.log(this.password.value);
      console.log(this.repitePassword.value);

    }

  }

}
