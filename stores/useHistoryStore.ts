import { create } from 'zustand';
import { Location, Route } from '../types/interfaces';

interface HistoryState {
	routes: Route[];

	addRoute: (newRoute: Route) => void;
}

const useHistoryStore = create<HistoryState>()((set, get) => ({
	routes: [],

	addRoute: (newRoute: Route) => {
		const oldRoutes = get().routes;
		oldRoutes.push(newRoute);
		set({ routes: oldRoutes });
	},
}));

export default useHistoryStore;
