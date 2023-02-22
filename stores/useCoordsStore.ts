import { LatLngExpression } from 'leaflet';
import { create } from 'zustand';

const useCoordsStore = create((set) => ({
	location: [50, 20],
	destination: [50, 20],
	setLocation: (location: LatLngExpression) => {
		set({ location: location });
	},
	setDestination: (destination: LatLngExpression) => {
		set({ destination: destination });
	},
}));

export default useCoordsStore;
