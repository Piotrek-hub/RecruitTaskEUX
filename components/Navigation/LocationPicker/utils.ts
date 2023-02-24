export async function fetchCoordinatesByLocationName(name: string) {
	var requestOptions: RequestInit = {
		method: 'GET',
		redirect: 'follow',
	};

	return fetch(
		`https://api.geoapify.com/v1/geocode/search?text=${name}&apiKey=949ce2dc046a465980b1bed473f7328e`,
		requestOptions
	)
		.then((response) => response.text())
		.then((result) => JSON.parse(result))
		.catch((error) => error);
}

export async function fetchAutocompleteLocations(name: string) {
	var requestOptions: RequestInit = {
		method: 'GET',
		redirect: 'follow',
	};

	return fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${name}&format=json&apiKey=949ce2dc046a465980b1bed473f7328e`,
		requestOptions
	)
		.then((response) => response.text())
		.then((result) => JSON.parse(result))
		.catch((error) => console.log(error));
}
