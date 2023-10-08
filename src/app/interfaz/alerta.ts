import { AlertaEstado } from "./alerta-estado";
import { Ubicacion } from "./marcador";

export interface Alerta {

    id?: string,
    usuario: string,
    fecha: Date,
    estado: AlertaEstado
    ubicacion?: Ubicacion
}
