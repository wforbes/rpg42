'use client';
import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('@/app/components/PhaserGame'), {
	ssr: false,
});

export default function Home() {
	const handleClick = () => {
		console.log('Clicked');
	}
	return (
		<main className="w-full h-full bg-black">
			<div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
				<div className="flex flex-row justify-center">
					<button className="bg-red-500 text-white p-2 rounded pointer-events-auto" onClick={handleClick}>Test Button</button>
				</div>
			</div>
			<PhaserGame />
		</main>
	);
}
