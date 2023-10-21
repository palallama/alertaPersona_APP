import { Ubicacion } from "./marcador";

export interface Alerta {

    id?: string,
    usuario: string,
    emision: Date,
    estado: AlertaEstado,
    ubicacion?: Ubicacion,
    cerrada?: boolean,
    
}

export enum AlertaEstado {
    EMITIDA = 'Emitida',
    CANCELADA = 'Cancelada',
    SOLUCIONADA = 'Solucionada',
}

