import { create } from 'zustand';
import { Location, Route } from '../types/interfaces';

interface CostState {
	cost: number;

	setCost: (newCost: number) => void;
}

const useCostStore = create<CostState>()((set) => ({
	cost: 0,

	setCost: (newCost: number) => {
		set({ cost: newCost });
	},
}));

export default useCostStore;
