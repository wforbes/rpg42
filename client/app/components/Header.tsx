'use client';
import Link from 'next/link';
import { Title, Group } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { AuthButtons } from './AuthButtons';
//import { useContext, useEffect, useState } from 'react';
//import { SocketContext } from '@/lib/services/socket/SocketContext';

export function Header() {
	/* test of setting up ConditionalSocketProvider to access socket data in nextjs
	const socket = useContext(SocketContext)?.socket || null;
	const [isConnected, setIsConnected] = useState(false);
	useEffect(() => {
		console.log('socket', socket);
		if (!socket) {
			setIsConnected(false);
			return;
		}
		console.log('socket connected', socket.connected);
		// Set initial state
		setIsConnected(socket.connected);

		// Listen for changes
		const onConnect = () => setIsConnected(true);
		const onDisconnect = () => setIsConnected(false);

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, [socket]); */
	return (
		<Group h="100%" px="md" justify="space-between">
			<Link href="/"><Title order={3}>rpg42</Title></Link>
			<Group>
				{/*isConnected && <div className="text-green-500">●</div>*/}
				<ColorSchemeToggle />
				<AuthButtons />
			</Group>
		</Group>
	);
}
