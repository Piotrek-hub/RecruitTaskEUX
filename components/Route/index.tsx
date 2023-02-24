import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';

import useCoordsStore from '../../stores/useCoordsStore';
import { useEffect, useState } from 'react';
import getRoute from './utils';
import useTransportTypeStore from '../../stores/useTransportTypeStore';
import { useToast } from '@chakra-ui/react';
import { Location, Route } from '../../types/interfaces';
import RoutesHistory from '../RoutesHistory';
import useHistoryStore from '../../stores/useHistoryStore';
import useCostStore from '../../stores/useCostStore';
import LoadingScreen from '../LoadingScreen';

export default function RouteComponent() {
	const [route, setRoute] = useState<LatLngExpression[]>([]);
	const [isLoadingScreenVisible, setLoadingScreenVisibility] =
		useState<boolean>(true);

	const toast = useToast();
	const id = 'error-toast';

	const location: Location = useCoordsStore((state: any) => state.location);
	const destination: Location = useCoordsStore(
		(state: any) => state.destination
	);
	const transportType = useTransportTypeStore(
		(store: any) => store.transportType
	);
	const cost = useCostStore((store: any) => store.cost);

	const addRouteToHistory = useHistoryStore((state) => state.addRoute);

	useEffect(() => {
		getRoute(location.coords, destination.coords, transportType)
			.then((res) => {
				if (res.statusCode >= 400) {
					if (!toast.isActive(id)) {
						toast({
							id: id,
							title: `${res.message}`,
							status: 'error',
							isClosable: true,
							position: 'bottom-right',
						});
					}

					return;
				}

				const { distance, time, ferry } = res.features[0].properties;

				const reversedRoute: LatLngExpression[] =
					res.features[0].geometry.coordinates[0].map(
						(c: LatLngExpression[]) => c.reverse()
					);

				setRoute(reversedRoute);

				const r: Route = {
					location: location,
					destination: destination,
					path: reversedRoute,
					transportType: transportType,
					time: time,
					distance: distance,
					totalCost: (cost * distance) / 1000,
					daysNeeded: Math.ceil(distance / 1000 / 800),
					ferry: ferry == undefined ? false : ferry,
				};
				addRouteToHistory(r);
			})
			.then(() => setLoadingScreenVisibility(false));
	}, []);

	const renderPolyline = (r: any) => {
		return <Polyline pathOptions={{ color: 'blue' }} positions={r} />;
	};

	return (
		<>
			{isLoadingScreenVisible ? (
				<LoadingScreen />
			) : (
				<div className="max-w-[1280px] mt-[50px] mx-auto grid place-items-center ">
					<MapContainer
						className="w-[100%] h-[600px] overflow-hidden"
						center={[50, 20]}
						zoom={13}
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<Marker position={[50, 20]}>
							<Popup>Location</Popup>
						</Marker>
						<Marker position={[50, 20]}>
							<Popup>Destination</Popup>
						</Marker>
						{renderPolyline(route)}
						<RecenterAutomatically coords={location.coords} />
					</MapContainer>
					<RoutesHistory />
				</div>
			)}
		</>
	);
}

const RecenterAutomatically = ({ coords }: { coords: LatLngExpression }) => {
	const map = useMap();
	useEffect(() => {
		map.setView(coords);
	}, [coords]);
	return null;
};
