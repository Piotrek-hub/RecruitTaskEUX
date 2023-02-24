import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';

import useCoordsStore from '../../stores/useCoordsStore';
import { useEffect, useState } from 'react';
import getRoute from './utils';
import useTransportTypeStore from '../../stores/useTransportTypeStore';
import { Badge, useToast } from '@chakra-ui/react';
import { Location, Route } from '../../types/interfaces';
import RoutesHistory from '../RoutesHistory';
import useHistoryStore from '../../stores/useHistoryStore';
import { TransportType } from '../../types/enums';

export default function Result() {
	const [route, setRoute] = useState<LatLngExpression[]>([]);
	const [time, setTime] = useState<number>(-1);
	const [distance, setDistance] = useState<number>(-1);
	const toast = useToast();
	const id = 'error-toast';

	const location: Location = useCoordsStore((state: any) => state.location);
	const destination: Location = useCoordsStore(
		(state: any) => state.destination
	);
	const transportType = useTransportTypeStore(
		(store: any) => store.transportType
	);

	const addRouteToHistory = useHistoryStore((state) => state.addRoute);

	useEffect(() => {
		getRoute(location.coords, destination.coords, transportType).then(
			(res) => {
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

				const { distance, time } = res.features[0].properties;
				setDistance(distance);
				setTime(time);

				const reversedRoute: LatLngExpression[] =
					res.features[0].geometry.coordinates[0].map(
						(c: LatLngExpression[]) => c.reverse()
					);

				setRoute(reversedRoute);
			}
		);
	}, []);

	useEffect(() => {
		if (route.length > 0) {
			const r: Route = {
				location: location,
				destination: destination,
				path: route,
				transportType: transportType,
				time: time,
				distance: distance,
			};
			addRouteToHistory(r);
		}
	}, [route]);

	const renderPolyline = (r: any) => {
		return <Polyline pathOptions={{ color: 'blue' }} positions={r} />;
	};

	return (
		<div className="max-w-[1280px] mt-[50px] mx-auto grid place-items-center">
			<div className="flex items-center justify-center gap-[10px] my-[10px]">
				<Badge colorScheme={'blue'}>{location.name}</Badge>
				<Badge colorScheme={'green'}>{destination.name}</Badge>
				20km
			</div>
			<MapContainer
				className="w-[100%] h-[600px]"
				center={location.coords}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={location.coords}>
					<Popup>Location</Popup>
				</Marker>
				<Marker position={destination.coords}>
					<Popup>Destination</Popup>
				</Marker>
				{renderPolyline(route)}
				<RecenterAutomatically coords={location.coords} />
			</MapContainer>
			<RoutesHistory />
		</div>
	);
}

const RecenterAutomatically = ({ coords }: { coords: LatLngExpression }) => {
	const map = useMap();
	useEffect(() => {
		map.setView(coords);
	}, [coords]);
	return null;
};
