import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { featureGroup, LatLngExpression } from 'leaflet';
import { Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchCoordinatesByLocationName } from './utils';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';

import { Location } from '../../../types/interfaces';

interface LocationPickerProps {
	title: string;
	location: Location;
	setLocation: any;
}

export default function LocationPicker({
	title,
	location,
	setLocation,
}: LocationPickerProps) {
	const [input, setInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = () => {
		setIsLoading(true);

		fetchCoordinatesByLocationName(input)
			.then((res) => {
				console.log(res);
				if (res.features.length == 0) {
					toast({
						id: '',
						title: `Localization not found`,
						status: 'error',
						isClosable: true,
						position: 'bottom-right',
					});
				}
				const coords: LatLngExpression =
					res.features[0].geometry.coordinates.reverse();
				setLocation({ coords: coords, name: input });
			})
			.then(() => setIsLoading(false))
			.catch((err) => {
				setIsLoading(false);
			});
	};

	return (
		<div className="w-1/2 flex items-center justify-start flex-col gap-[30px] ">
			<div className="flex items-center justify-between flex-col">
				<span className="text-2xl font-bold ">{title}</span>
				<span className="text-md font-normal uppercase">
					{location.name || <>&nbsp;</>}
				</span>
			</div>
			<MapContainer
				className="w-[100%] h-[400px]"
				center={location.coords}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={location.coords}>
					<Popup>{location.coords.toString()}</Popup>
				</Marker>
				<RecenterAutomatically coords={location.coords} />
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
function toast(arg0: {
	id: any;
	title: string;
	status: string;
	isClosable: boolean;
	position: string;
}) {
	throw new Error('Function not implemented.');
}
