import { Spinner } from '@chakra-ui/react';

export default function LoadingScreen() {
	return (
		<div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-white flex items-center flex-col justify-center">
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
			<span className="text-md mt-[10px] font-[500]">
				Calculating route...
			</span>
		</div>
	);
}
