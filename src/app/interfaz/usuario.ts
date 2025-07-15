export interface Usuario {
    id?: string;
    nombre: string;
    apellido: string;
    nroDocumento: number;
    telefono: string;
    nroTramite: number;
    mail: string;
    validado?: boolean;
    activo?: boolean;
    password?: string;

    genero?: string;
    fchNacimiento?: Date;

    token?: string;
}

export interface UsuarioLogueado {
    id: string;
    nombnre: string;
    mail: string;
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