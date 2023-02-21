import Link from 'next/link';

export default function Navbar() {
	return (
		<div className="px-[20px] max-w-[1280px] mx-auto flex items-center justify-between py-[30px] max-sm:flex-col max-sm:gap-[20px]">
			<div>
				<Link href={'/'}>
					<span className="text-3xl font-bold">Recruit Task</span>
				</Link>
			</div>
			<div className="flex items-center justify-between gap-[30px]">
				<Link href={'/navigation'}>
					<span className="text-[16px] underline cursor-pointer">
						Navigation
					</span>
				</Link>
				<Link href={'/result'}>
					<span className="text-[16px] underline cursor-pointer">
						Results
					</span>
				</Link>
			</div>
		</div>
	);
}
