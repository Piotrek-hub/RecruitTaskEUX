import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

export default function Hero() {
	return (
		<div className="max-w-[1280px] flex items-center justify-center mx-auto mt-[200px] flex-col">
			<div className="flex items-center justify-start flex-col">
				<span className="text-[50px] font-bold">Welcome</span>
				<span className="font-thin">Author: Piotr Gałka</span>
			</div>
			<div className="mt-[50px] flex items-center gap-[30px]">
				<Link href={'/navigation'}>
					<Button className="">Navigation</Button>
				</Link>
				<Button className="">
					<Link href={'https://github.com/Piotrek-hub'}>
						<AiFillGithub />
					</Link>
				</Button>
			</div>
		</div>
	);
}
