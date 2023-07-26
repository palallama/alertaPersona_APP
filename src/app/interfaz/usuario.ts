export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    dni: number;
    nroTramite: number;
    genero: string;
    fchNacimiento: Date;
    telefono: string;
    mail: string;
    password: string;
    validado: boolean;
    activo: boolean;
}