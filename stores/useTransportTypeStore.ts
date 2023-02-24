import { TransportType } from '../types/enums';
import { create } from 'zustand';

interface TransportTypeState {
	transportType: TransportType;

	setTransportType: (transportType: TransportType) => void;
}

const useTransportTypeStore = create<TransportTypeState>()((set) => ({
	transportType: TransportType.Car,
	setTransportType: (transportType: TransportType) => {
		set({ transportType: transportType });
	},
}));

export default useTransportTypeStore;
