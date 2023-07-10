export interface usuario {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    nroTramite: string;
    genero: string;
    fchNacimiento: Date;
    telefono: string;
    mail: string;
    password: string;
    validado: boolean;
    activo: boolean;
}