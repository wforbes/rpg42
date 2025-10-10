'use client';

import { AppShell, rem } from '@mantine/core';
import { ReactNode } from 'react';
import { Header } from './Header';

export function ApplicationShell({ children }: { children: ReactNode }) {
	return (
		<AppShell
			header={{ height: 60 }}
			padding="none"
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>
			<AppShell.Main
				pt={`calc(${rem(60)}`}
			>
				{children}
			</AppShell.Main>
		</AppShell>
	);
}
