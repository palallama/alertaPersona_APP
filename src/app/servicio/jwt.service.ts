import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private KEY = environment.TOKEN_SECRET;

  verificarToken(token:string){
    // jwt.verify
  }

}
