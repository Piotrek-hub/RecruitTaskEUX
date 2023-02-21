import dynamic from 'next/dynamic';

const LocationPicker = dynamic(() => import('./LocationPicker'), {
	ssr: false,
});

export default function Navigation() {
	return (
		<div className="max-w-[1280px] mx-auto px-[20px] mt-[100px] flex items-center justify-between gap-[50px]">
			<LocationPicker title={'Location from'} location />
			<LocationPicker title={'Destination'} destination />
		</div>
	);
}
