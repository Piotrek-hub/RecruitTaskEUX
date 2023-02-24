export function formatTime(seconds: number): string {
	const minutes = seconds / 60;
	const hours = minutes / 60;
	if (minutes > 60) {
		return hours.toFixed(1) + 'h';
	} else {
		return minutes.toFixed(1) + 'm';
	}
}

export function formatDistance(distance: number): string {
	const km = distance / 1000;
	if (distance > 1000) {
		return km.toFixed(1) + 'km';
	} else {
		return distance.toFixed(1) + 'm';
	}
}
