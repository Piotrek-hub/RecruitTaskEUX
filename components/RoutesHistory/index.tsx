import {
	Badge,
	Button,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
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
import jsPDF from 'jspdf';

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
							return (
								<Route route={route} idx={idx + 1} key={idx} />
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
}

function Route({ route, idx }: { route: Route; idx: number }) {
	const downloadPdf = () => {
		const doc = new jsPDF();
		doc.text(`Location: ${route.location.name}`, 10, 10);
		doc.text(`Destination: ${route.destination.name}`, 10, 30);
		doc.text(`Distance: ${formatDistance(route.distance)}`, 10, 50);
		doc.text(`Time: ${formatTime(route.time)}`, 10, 70);
		doc.text(`Days Needed ${String(route.daysNeeded)}`, 10, 90);
		doc.text(
			`Total cost: ${Math.round(route.totalCost).toFixed(1)} zl`,
			10,
			110
		);
		doc.text(`Transport Type: ${route.transportType}`, 10, 130);
		doc.text(`Is ferry needed: ${String(route.ferry)}`, 10, 150);

		doc.save(`${route.location.name}-${route.destination.name}.pdf`);
	};

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
			<Td>
				<Button
					colorScheme={'purple'}
					variant="outline"
					onClick={downloadPdf}
				>
					Download PDF
				</Button>
			</Td>
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
				{transportType == TransportType.Bus && <BiBus />}
				{transportType == TransportType.Motorcycle && <FaMotorcycle />}
				{transportType == TransportType.Bicycle && <FaBicycle />}
				{transportType == TransportType.PublicTransport && <FaBusAlt />}
			</Badge>
			<span className="text-md capitalize">{transportType}</span>
		</div>
	);
}
