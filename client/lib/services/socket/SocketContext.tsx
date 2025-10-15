'use client';
import { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
	socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

export function SocketProvider({ children }: { children: ReactNode }) {
	//const socketRef = useRef<Socket | null>(null);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		// Initialize socket connection
		const newSocket = io('http://localhost:3001'); // Move to ENV

		newSocket.on('connect', () => {
			console.log('Connected to server', newSocket.id);
		});

		newSocket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		newSocket.on('message', (message) => {
			console.log('Message from server:', message);
		});

		setSocket(newSocket);
		return () => {
			newSocket.disconnect();
			setSocket(null);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }
		}>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be used within SocketProvider');
	}
	return context.socket;
}