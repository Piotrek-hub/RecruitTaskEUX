import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/shared/Navbar';
import 'leaflet/dist/leaflet.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Navbar />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
