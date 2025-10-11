'use client';
import Link from 'next/link';
import { Title, Group } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { AuthButtons } from './AuthButtons';
import { User } from '@/db/models/User';

export function Header() {
	return (
		<Group h="100%" px="md" justify="space-between">
			<Link href="/"><Title order={3}>rpg42</Title></Link>
			<Group>
				<ColorSchemeToggle />
                <AuthButtons />
			</Group>
		</Group>
	);
}
