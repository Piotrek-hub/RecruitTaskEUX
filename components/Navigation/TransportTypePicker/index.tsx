import { useEffect, useState } from 'react';
import { BiBody, BiBus, BiCar } from 'react-icons/bi';
import { FaMotorcycle, FaBicycle, FaBusAlt } from 'react-icons/fa';

import { Button, Tooltip } from '@chakra-ui/react';

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

	const transportTypes: any[] = [
		{ type: TransportType.Walk, icon: <BiBody /> },
		{ type: TransportType.Car, icon: <BiCar /> },
		{ type: TransportType.Bus, icon: <BiBus /> },
		{ type: TransportType.Motorcycle, icon: <FaMotorcycle /> },
		{ type: TransportType.Bicycle, icon: <FaBicycle /> },
		{ type: TransportType.PublicTransport, icon: <FaBusAlt /> },
	];

	return (
		<div className="w-full flex items-center justify-center gap-[10px]">
			{transportTypes.map((tt) => {
				return (
					<Tooltip label={tt.type.toString()} key={tt.type}>
						<Button
							onClick={() => setTransportType(tt.type)}
							colorScheme={
								transportType == tt.type ? 'teal' : 'gray'
							}
						>
							{tt.icon}
						</Button>
					</Tooltip>
				);
			})}
		</div>
	);
}
