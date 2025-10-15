import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string) {
	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		// Only create socket if it doesn't exist
		if (!socketRef.current) {
			socketRef.current = io(url);

			socketRef.current.on('connect', () => {
				console.log('Connected to server', socketRef.current?.id);
			});

			socketRef.current.on('disconnect', () => {
				console.log('Disconnected from server');
			});

			socketRef.current.on('message', (message) => {
				console.log('Message from server:', message);
			});
		}

		// Cleanup function - runs when component unmounts
		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, [url]); // Only re-run if URL changes

	return socketRef.current;
}