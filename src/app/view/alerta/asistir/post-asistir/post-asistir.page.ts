import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/interfaz/marcador';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';

// DaVinci
// -34.604346872835364, -58.39602166108761

// Museo del agua
// -34.600757780764084, -58.395024035910524

@Component({
  selector: 'app-post-asistir',
  templateUrl: './post-asistir.page.html',
  styleUrls: ['./post-asistir.page.scss'],
})
export class PostAsistirPage implements OnInit {
  styleMap =  [
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 13
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#144b53"
                        },
                        {
                            "lightness": 14
                        },
                        {
                            "weight": 1.4
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#08304b"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0c4152"
                        },
                        {
                            "lightness": 5
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#0b434f"
                        },
                        {
                            "lightness": 25
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#0b3d51"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#146474"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#021019"
                        }
                    ]
                }
              ]

  //! MARCADORES
  // davinci
  marcadorOrigen: Marcador = {
    position: { 
      lat: -34.604346872835364, 
      lng: -58.39602166108761 
    }, 
    title: "DaVinci"
  };
  // aguas
  marcadorDestino: Marcador = {
    position: { 
      lat: -34.600757780764084, 
      lng: -58.395024035910524
    }, 
    title: "Aguas sanitarias"
  };
  markers: Marcador[] = [
    // this.marcadorDestino
  ];

  //! CICULO
  circleCenter: google.maps.LatLngLiteral = this.marcadorDestino.position;
  radius = 80;

  //! RUTA
  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(mapDirectionsService: MapDirectionsService) {
    const request: google.maps.DirectionsRequest = {
      destination: this.marcadorDestino.position,
      origin: this.marcadorOrigen.position,
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
  }

  //! MAPA
  zoom = 16;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    scrollwheel: true,
    zoomControl: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    fullscreenControl: false,
    styles: this.styleMap
  };

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(this.center);

    });
  }  
}
