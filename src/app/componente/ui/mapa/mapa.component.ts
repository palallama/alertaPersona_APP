import { Component, inject, Input, OnInit } from '@angular/core';
import { Marcador } from 'src/app/interfaz/marcador';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { Ruta } from 'src/app/interfaz/ruta';

// DaVinci
// -34.604346872835364, -58.39602166108761

// Museo del agua
// -34.600757780764084, -58.395024035910524


@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
    styleMap = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "hue": "#a7ff00"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": "9"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": "-12"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-32"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-43"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-25"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "saturation": "3"
                },
                {
                    "lightness": "10"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": "-17"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#d5d5d5"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-1"
                },
                {
                    "lightness": "2"
                },
                {
                    "gamma": "1.38"
                },
                {
                    "weight": "0.74"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-21"
                },
                {
                    "hue": "#00e2ff"
                },
                {
                    "saturation": "35"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

    private mapDirectionsService = inject(MapDirectionsService);

    @Input() centro: google.maps.LatLngLiteral = { lat: 0, lng: 0};

    @Input() calculaRuta: boolean = false;
    @Input() ruta!: Ruta;

    @Input() marcadores!: Marcador[];

    //! MARCADORES
    // davinci
    // marcadorOrigen: Marcador = {
    //   position: { 
    //     lat: -34.604346872835364, 
    //     lng: -58.39602166108761 
    //   }, 
    //   title: "DaVinci"
    // };
    // // aguas
    // marcadorDestino: Marcador = {
    //   position: { 
    //     lat: -34.600757780764084, 
    //     lng: -58.395024035910524
    //   }, 
    //   title: "Aguas sanitarias"
    // };
    // markers: Marcador[] = [
    //   // this.marcadorDestino
    // ];


    //! CICULO
    circleCenter!: google.maps.LatLngLiteral;
    radius = 80;
    optionsCirculo = {
        strokeColor: "#04CAA3",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#04CAA3",
        fillOpacity: 0.35,
    }

    //! RUTA
    directionsResults!: google.maps.DirectionsResult;


    //! MAPA
    zoom = 16;
    // center!: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
        scrollwheel: true,
        zoomControl: false,
        disableDoubleClickZoom: true,
        disableDefaultUI: true,
        fullscreenControl: false,
        styles: this.styleMap
    };

    ngOnInit() {
        // console.log(this.marcadores);

        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.center = {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude,
        //     };
        //     console.log(this.center);
        // });


        if (this.calculaRuta) {
            this.calcularRuta();
        }
    }

    calcularRuta() {
        // console.log(this.calculaRuta)
        // console.log(this.ruta)

        const request: google.maps.DirectionsRequest = {
            destination: this.ruta.destino,
            origin: this.ruta.origen,
            travelMode: google.maps.TravelMode.WALKING
        };
        this.mapDirectionsService.route(request).pipe(
            // map(response => response.result)
        ).subscribe({
            next: (response: any) => {
                this.directionsResults = response.result;
            },
            complete: () => {
                this.circleCenter = this.ruta.destino;
            }
        });
    }
}
