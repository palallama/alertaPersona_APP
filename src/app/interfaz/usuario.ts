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

export enum UsuarioPreferencias {
}

export interface UsuarioPreferencia {
    clave: string,
    desc?: string,
    activo?: boolean
}

export enum PreferenciasClave {
    NOTIFICACION = "NOTIFICACION"
}

export const PreferenciasData: UsuarioPreferencia[] = [
    {
        clave: PreferenciasClave.NOTIFICACION,
        desc: 'Activar Notificaciones',
        activo: false
    }
]