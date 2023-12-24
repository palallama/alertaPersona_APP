export interface Usuario {
    id?: string;
    nombre: string;
    apellido: string;
    dni: number;
    telefono: string;
    nroTramite: number;
    mail: string;
    validado?: boolean;
    activo?: boolean;
    password?: string;

    genero?: string;
    fchNacimiento?: Date;
}