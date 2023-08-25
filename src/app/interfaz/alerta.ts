import { AlertaEstado } from "./alerta-estado";

export interface Alerta {

    id?: string,
    usuario: string,
    fecha: Date,
    estado: AlertaEstado

}
