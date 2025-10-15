'use client';
import { usePathname } from 'next/navigation';
import { SocketProvider } from './SocketContext';
import { ReactNode } from 'react';

export function ConditionalSocketProvider({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const isGameRoute = pathname?.startsWith('/game');

	if (isGameRoute) {
		return <SocketProvider>{children}</SocketProvider>;
	}

	// On non-game routes, provide the default context (socket: null)
	return <>{children}</>;
}