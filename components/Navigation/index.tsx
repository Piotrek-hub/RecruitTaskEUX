import { Button } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import useCoordsStore from '../../stores/useCoordsStore';
import TransportTypePicker from './TransportTypePicker';

const LocationPicker = dynamic(() => import('./LocationPicker'), {
	ssr: false,
});

export default function Navigation() {
	const location = useCoordsStore((state: any) => state.location);
	const destination = useCoordsStore((state: any) => state.destination);

	const setLocation = useCoordsStore((state: any) => state.setLocation);
	const setDestination = useCoordsStore((state: any) => state.setDestination);

	return (
		<div className="max-w-[1280px] mx-auto px-[20px] mt-[50px] ">
			<div className="flex items-center justify-between gap-[50px]">
				<LocationPicker
					title={'Location from'}
					location={location}
					setLocation={setLocation}
				/>
				<LocationPicker
					title={'Destination'}
					location={destination}
					setLocation={setDestination}
				/>
			</div>
			<TransportTypePicker />
			<div className="w-full grid place-items-center mt-[20px]">
				<Link href={'/result'}>
					<Button colorScheme={'green'}>Get Route</Button>
				</Link>
			</div>
		</div>
	);
}
