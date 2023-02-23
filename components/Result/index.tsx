import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Polyline } from 'react-leaflet';

import useCoordsStore from '../../stores/useCoordsStore';
import { useEffect, useState } from 'react';
import getRoute from './utils';
import useTransportTypeStore from '../../stores/useTransportTypeStore';

export default function Result() {
	const limeOptions = { color: 'lime' };

	const location = useCoordsStore((state: any) => state.location);
	const destination = useCoordsStore((state: any) => state.destination);

	const [route, setRoute] = useState<any[][]>([location]);

	const transportType = useTransportTypeStore(
		(store: any) => store.transportType
	);

	useEffect(() => {
		getRoute(location, destination, transportType).then((res) => {
			console.log(res);
			const r = res.features[0].geometry.coordinates[0];
			const reversedRoute = r.map((c) => c.reverse());

			setRoute(reversedRoute);
		});
	}, []);

	const renderPolyline = (r: any) => {
		return <Polyline pathOptions={limeOptions} positions={r} />;
	};

	return (
		<div className="max-w-[1280px] mt-[100px] mx-auto bg-red-200 grid place-items-center">
			<MapContainer
				className="w-[100%] h-[600px]"
				center={location}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={location}>
					<Popup>Location</Popup>
				</Marker>
				<Marker position={destination}>
					<Popup>Destination</Popup>
				</Marker>
				{renderPolyline(route)}
				<RecenterAutomatically coords={location} />
			</MapContainer>
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
