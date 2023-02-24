import {
	Badge,
	Button,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import useHistoryStore from '../../stores/useHistoryStore';
import { TransportType } from '../../types/enums';
import { Route } from '../../types/interfaces';
import { BiBody, BiBus, BiCar } from 'react-icons/bi';
import { FaBusAlt, FaMotorcycle, FaBicycle } from 'react-icons/fa';
import { formatDistance, formatTime } from './utils';

export default function RoutesHistory() {
	const routesHistory: Route[] = useHistoryStore((state) => state.routes);

	return (
		<div className="mt-[50px]">
			<span className="text-2xl font-bold mb-[40px]">Routes History</span>
			<TableContainer>
				<Table variant="simple">
					<TableCaption>History of recent routes</TableCaption>
					<Thead>
						<Tr>
							<Th>No</Th>
							<Th>From</Th>
							<Th>To</Th>
							<Th>Length</Th>
							<Th>Time (minutes)</Th>
							<Th>Days</Th>
							<Th>Cost</Th>
							<Th>Transport Type</Th>
							<Th>Ferry</Th>
						</Tr>
					</Thead>
					<Tbody>
						{routesHistory.map((route: Route, idx: number) => {
							return <Route route={route} idx={idx + 1} />;
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
}

function Route({ route, idx }: { route: Route; idx: number }) {
	return (
		<Tr>
			<Td>{idx}</Td>
			<Td>
				<Badge colorScheme={'blue'}>{route.location.name}</Badge>
			</Td>
			<Td>
				<Badge colorScheme={'green'}>{route.destination.name}</Badge>
			</Td>
			<Td>{formatDistance(route.distance)}</Td>
			<Td>{formatTime(route.time)}</Td>
			<Td>{route.daysNeeded}</Td>
			<Td>
				<Badge colorScheme={'orange'}>
					{Math.round(route.totalCost).toFixed(1)}zł
				</Badge>
			</Td>
			<Td>
				<TransportTypeIcon transportType={route.transportType} />
			</Td>
			<Td className="capitalize">{String(route.ferry)}</Td>
		</Tr>
	);
}

function TransportTypeIcon({
	transportType,
}: {
	transportType: TransportType;
}) {
	return (
		<div className="flex items-center justify-start gap-[10px]">
			<Badge fontSize={20}>
				{transportType == TransportType.Walk && <BiBody />}
				{transportType == TransportType.Car && <BiCar />}
				{transportType == TransportType.Bus && <FaBusAlt />}
				{transportType == TransportType.Motorcycle && <BiBus />}
				{transportType == TransportType.Bicycle && <FaMotorcycle />}
				{transportType == TransportType.PublicTransport && (
					<FaBicycle />
				)}
			</Badge>
			<span className="text-md capitalize">{transportType}</span>
		</div>
	);
}
