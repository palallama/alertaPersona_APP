import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaz/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario!: Usuario;

  ngOnInit() {

    let date = new Date();

    this.usuario = {
      id: '0',
      nombre: "Julian",
      apellido: "Torossian",
      dni: 41751057,
      nroTramite: 0,
      genero: "Masculino",
      fchNacimiento: date,
      telefono: "2944-900241",
      mail: "julian.torossian@outlook.com",
      password: "",
      validado: true,
      activo: true
    }

  }

}
