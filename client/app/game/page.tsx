'use client';
import dynamic from 'next/dynamic';
import { IconSword } from '@tabler/icons-react';
import { useSessionQuery } from '@/lib/services/session/queries';
import { Routes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGameEvent, useGameCommands } from '@/lib/services/game/useGameEvents';
import { GameEvents } from '@/lib/services/game/GameEventBridge';
import { OverworldUI } from './components/overworld/ui/OverworldUI';
import DraggableWindow from './components/overworld/ui/DraggableWindow';

const PhaserGame = dynamic(() => import('@/app/game/components/PhaserGame'), {
	ssr: false,
});

export default function GamePage() {
	const { data: { user } = {} } = useSessionQuery();
	const router = useRouter();
	const [gameReady, setGameReady] = useState(false);
	const gameCommands = useGameCommands();
	const [inventoryOpen, setInventoryOpen] = useState(false);
	const [currentScene, setCurrentScene] = useState('');
	//const socket = useSocket('http://localhost:3001'); // move to ENV

	// Listen for game ready event
	useGameEvent(GameEvents.GAME_READY, () => {
		console.log('Game is ready!');
		setGameReady(true);
	});

	// Listen for player death
	useGameEvent(GameEvents.PLAYER_DIED, (data) => {
		console.log('Player died at:', data.position);
		alert('You died!');
	});

	// Listen for scene changes
	useGameEvent(GameEvents.SCENE_CHANGED, (data) => {
		console.log(`Scene changed from ${data.from} to ${data.to}`);
		setCurrentScene(data.to);
	});

	// Listen for inventory toggle
	useGameEvent(GameEvents.TOGGLE_INVENTORY, () => {
		console.log('Inventory toggled');
		setInventoryOpen(!inventoryOpen);
	});

	useEffect(() => { // can this be moved to useSessionQuery?
		if (!user) {
			router.replace(Routes.AUTH.LOGIN);
		}
	}, [user, router]);

	return (
		<main
			className="w-full bg-black relative"
			style={{
				height: 'calc(100vh - 60px)',
				overflow: 'hidden'
			}}
		>
			<div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
				<div className="flex flex-row justify-center">
					{currentScene === 'OverworldScene' && (
						<OverworldUI inventoryOpen={inventoryOpen} />
					)}
				</div>
			</div>
			<PhaserGame />
		</main>
	);
}
