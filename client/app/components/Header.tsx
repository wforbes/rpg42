'use client';
import Link from 'next/link';
import { Title, Group, Button } from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';


export function Header() {
	return (
		<Group h="100%" px="md" justify="space-between">
			<Link href="/"><Title order={3}>rpg42</Title></Link>
			<Group>
				<ColorSchemeToggle />
				<Button component={Link} href="/login" variant="default">Login</Button>
				<Button component={Link} href="/signup" variant="default">Sign Up</Button>
			</Group>
		</Group>
	);
}
