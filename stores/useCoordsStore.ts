import { create } from 'zustand';
import { Location, Route } from '../types/interfaces';

interface CoordsState {
	location: Location;
	destination: Location;

	setLocation: (location: Location) => void;
	setDestination: (location: Location) => void;
}

const useCoordsStore = create<CoordsState>()((set) => ({
	location: { coords: [52.22977, 21.01178], name: 'Warszawa' },
	destination: { coords: [52.22977, 21.01178], name: 'Warszawa' },

	setLocation: (location: Location) => {
		set({ location: location });
	},
	setDestination: (destination: Location) => {
		set({ destination: destination });
	},
}));

export default useCoordsStore;
