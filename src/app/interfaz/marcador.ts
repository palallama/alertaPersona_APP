export interface Marcador {
    position: Ubicacion
    title: string,
    icon?: string
}

export interface Ubicacion {
    lat: number,
    lng: number
}
