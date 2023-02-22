import { LatLngExpression } from 'leaflet';

export default async function getRoute(
	location: LatLngExpression,
	destination: LatLngExpression
) {
	var requestOptions: RequestInit = {
		method: 'GET',
		redirect: 'follow',
	};
	console.log(`https://api.geoapify.com/v1/routing?waypoints=${location.join(
		','
	)}|
	${destination.join(',')}&mode=drive&apiKey=949ce2dc046a465980b1bed473f7328e`);
	return fetch(
		`https://api.geoapify.com/v1/routing?waypoints=${location.join(',')}|
		${destination.join(',')}&mode=drive&apiKey=949ce2dc046a465980b1bed473f7328e`,
		requestOptions
	)
		.then((response) => response.text())
		.then((result) => JSON.parse(result))
		.catch((error) => error);
}
