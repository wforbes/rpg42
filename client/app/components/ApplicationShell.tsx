'use client';

import { AppShell } from '@mantine/core';
import { ReactNode } from 'react';

export function ApplicationShell({ children }: { children: ReactNode }) {
	return (
		<AppShell
			header={{ height: 60 }}
			padding="md"
		>
			<AppShell.Header>
				<div>{/* Header content will go here in the next step */}</div>
			</AppShell.Header>
			<AppShell.Main>
				{children}
			</AppShell.Main>
		</AppShell>
	);
}
