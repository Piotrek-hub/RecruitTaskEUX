import { Button, Input } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import useCoordsStore from '../../stores/useCoordsStore';
import useCostStore from '../../stores/useCostStore';
import TransportTypePicker from './TransportTypePicker';

const LocationPicker = dynamic(() => import('./LocationPicker'), {
	ssr: false,
});

export default function Navigation() {
	const location = useCoordsStore((state: any) => state.location);
	const destination = useCoordsStore((state: any) => state.destination);
	const cost = useCostStore((state: any) => state.cost);

	const setCost = useCostStore((state: any) => state.setCost);
	const setLocation = useCoordsStore((state: any) => state.setLocation);
	const setDestination = useCoordsStore((state: any) => state.setDestination);

	const handleCostInput = (value: string) => {
		setCost(Number(value));
	};

	return (
		<div className="max-w-[1280px] mx-auto px-[20px] mt-[50px] ">
			<div className="flex items-center justify-between gap-[50px] max-md:flex-col">
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
			<div className="flex items-end  mt-[30px] max-md:flex-col max-md:gap-[30px]">
				<TransportTypePicker />
				<div className="w-full flex items-center justify-center gap-[30px] ">
					<Input
						placeholder={`${cost} zł / km`}
						width="min"
						type={'number'}
						onChange={(e) => handleCostInput(e.target.value)}
					/>
					<Link href={'/route'}>
						<Button colorScheme={'green'}>Get Route</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
