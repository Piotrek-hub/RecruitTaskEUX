import { useEffect, useState } from 'react';
import { BiBody, BiBus, BiCar } from 'react-icons/bi';
import { FaMotorcycle, FaBicycle, FaBusAlt } from 'react-icons/fa';

import { Button } from '@chakra-ui/react';

import { TransportType } from '../../../types/enums';
import useTransportTypeStore from '../../../stores/useTransportTypeStore';

export default function TransportTypePicker() {
	const setGlobalTransportType = useTransportTypeStore(
		(store: any) => store.setTransportType
	);
	const [transportType, setTransportType] = useState<TransportType>(
		useTransportTypeStore((store: any) => store.transportType)
	);

	useEffect(() => {
		setGlobalTransportType(transportType);
	}, [transportType]);

	return (
		<div className="w-full flex items-center justify-center gap-[10px] mt-[50px]">
			<Button
				onClick={() => setTransportType(TransportType.Walk)}
				colorScheme={
					transportType == TransportType.Walk ? 'teal' : 'gray'
				}
			>
				<BiBody />
			</Button>
			<Button
				onClick={() => setTransportType(TransportType.Car)}
				colorScheme={
					transportType == TransportType.Car ? 'teal' : 'gray'
				}
			>
				<BiCar />
			</Button>
			<Button
				onClick={() => setTransportType(TransportType.Bus)}
				colorScheme={
					transportType == TransportType.Bus ? 'teal' : 'gray'
				}
			>
				<FaBusAlt />
			</Button>
			<Button
				onClick={() => setTransportType(TransportType.Motorcycle)}
				colorScheme={
					transportType == TransportType.Motorcycle ? 'teal' : 'gray'
				}
			>
				<BiBus />
			</Button>
			<Button
				onClick={() => setTransportType(TransportType.Bicycle)}
				colorScheme={
					transportType == TransportType.Bicycle ? 'teal' : 'gray'
				}
			>
				<FaMotorcycle />
			</Button>
			<Button
				onClick={() => setTransportType(TransportType.PublicTransport)}
				colorScheme={
					transportType == TransportType.PublicTransport
						? 'teal'
						: 'gray'
				}
			>
				<FaBicycle />
			</Button>
		</div>
	);
}
