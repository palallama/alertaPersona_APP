import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  private KEY = environment.TOKEN_SECRET;

  verificarToken(token:string){
    // return jwt.verify(token, this.KEY)
  }

}
