import useCoordsStore from '../../stores/useCoordsStore';

export default function Result() {
	const location = useCoordsStore((state: any) => state.location);
	const destination = useCoordsStore((state: any) => state.destination);

	console.log(location);
	console.log(destination);
	return <div>ESSA</div>;
}
