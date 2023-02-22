import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchCoordinatesByLocationName } from './utils';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';

import useCoordsStore from '../../../stores/useCoordsStore';

interface LocationPickerProps {
	title: string;
	location?: boolean;
	destination?: boolean;
}

export default function LocationPicker({
	title,
	location,
	destination,
}: LocationPickerProps) {
	const [input, setInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [coords, setCoords] = useState<LatLngExpression>(
		location
			? useCoordsStore((state: any) => state.location)
			: useCoordsStore((state: any) => state.destination)
	);

	const setLocation = useCoordsStore((state: any) => state.setLocation);
	const setDestination = useCoordsStore((state: any) => state.setDestination);

	const handleSearch = () => {
		setIsLoading(true);

		fetchCoordinatesByLocationName(input)
			.then((res) => {
				const coords: LatLngExpression =
					res.features[0].geometry.coordinates.reverse();
				setCoords(coords);
			})
			.then(() => setIsLoading(false))
			.catch((err) => console.log('ERR: ', err));
	};

	useEffect(() => {
		if (location) {
			setLocation(coords);
		}

		if (destination) {
			setDestination(coords);
		}
	}, [coords]);

	return (
		<div className="w-1/2 flex items-center justify-start flex-col gap-[30px] ">
			<div>
				<span className="text-2xl font-bold ">{title}</span>
			</div>
			<MapContainer
				className="w-[100%] h-[400px]"
				center={coords}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={coords}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
				<RecenterAutomatically coords={coords} />
			</MapContainer>
			<div className="w-full flex items-center justify-center gap-[30px]">
				<Input
					className="max-w-[350px]"
					onChange={(e: any) => setInput(e.target.value)}
				/>
				<Button
					colorScheme={'blackAlpha'}
					onClick={handleSearch}
					isLoading={isLoading}
				>
					<span>Search</span>
				</Button>
			</div>
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
