import { LatLngExpression } from 'leaflet';
import { TransportType } from './enums';

export interface Route {
	location: Location;
	destination: Location;
	path: LatLngExpression[];
	transportType: TransportType;
	time: number;
	distance: number;
	totalCost: number;
	daysNeeded: number;
	ferry: boolean;
}

export interface Location {
	coords: LatLngExpression;
	name: string;
}
