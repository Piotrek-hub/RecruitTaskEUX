import { LatLngExpression } from 'leaflet';
import { TransportType } from '../../types/enums';

export default async function getRoute(
	location: LatLngExpression,
	destination: LatLngExpression,
	transportType: TransportType
) {
	var requestOptions: RequestInit = {
		method: 'GET',
		redirect: 'follow',
	};

	const url = `https://api.geoapify.com/v1/routing?waypoints=${location.join(
		','
	)}|
	${destination.join(
		','
	)}&mode=${transportType}&apiKey=949ce2dc046a465980b1bed473f7328e`;

	return fetch(url, requestOptions)
		.then((response) => response.text())
		.then((result) => JSON.parse(result))
		.catch((error) => error);
}
