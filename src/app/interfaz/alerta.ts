import { Ubicacion } from "./marcador";

export interface Alerta {

    id?: string,
    usuario: string,
    fechaEmision?: Date,
    emision?: Date,
    fechaCierre?: Date,
    estado: string,
    ubicacion?: Ubicacion,
    cerrada?: boolean,
    
    // "id": 31,
    // "usuario": 3,
    // "ubicacion": {
    //   "latitud": 36.5817469,
    //   "longitud": -4.5560755
    // },
    // "estado": "S",
    // "fechaEmision": "2023-12-29T14:38:15.000Z",
    // "fechaCierre": "2023-12-29T14:38:50.000Z",
    // "cerrada": 1
}

export enum AlertaEstado {
    EMITIDA = 'Emitida',
    CANCELADA = 'Cancelada',
    SOLUCIONADA = 'Solucionada',
}

