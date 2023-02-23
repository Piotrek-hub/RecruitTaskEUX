import { TransportType } from '../types/enums';
import { create } from 'zustand';

const useTransportTypeStore = create((set) => ({
	transportType: TransportType.Car,
	setTransportType: (transportType: TransportType) => {
		set({ transportType: transportType });
	},
}));

export default useTransportTypeStore;
