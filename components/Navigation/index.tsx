import dynamic from 'next/dynamic';
import TransportTypePicker from './TransportTypePicker';

const LocationPicker = dynamic(() => import('./LocationPicker'), {
	ssr: false,
});

export default function Navigation() {
	return (
		<div className="max-w-[1280px] mx-auto px-[20px] mt-[100px] ">
			<div className="flex items-center justify-between gap-[50px]">
				<LocationPicker title={'Location from'} location />
				<LocationPicker title={'Destination'} destination />
			</div>
			<TransportTypePicker />
		</div>
	);
}
