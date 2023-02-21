import { LatLngExpression } from 'leaflet';
import { create } from 'zustand';

const useCoordsStore = create((set) => ({
	location: [0, 0],
	destination: [0, 0],
	setLocation: (location: LatLngExpression) => {
		set({ location: location });
	},
	setDestination: (destination: LatLngExpression) => {
		set({ destination: destination });
	},
}));

export default useCoordsStore;
