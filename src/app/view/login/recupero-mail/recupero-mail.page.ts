import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recupero-mail',
  templateUrl: './recupero-mail.page.html',
  styleUrls: ['./recupero-mail.page.scss'],
})
export class RecuperoMailPage {

  mail = new FormControl("", [ Validators.required, Validators.email ]);

  enter() {

    if ( this.mail.valid ) {
      console.log(this.mail.value);

      
    }

  }

}
