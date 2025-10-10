import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
	return (
		<Container>
			<Text my="md" className="text-center">
				Not much is known about <strong>rpg42</strong>...<br />
				A legend to some... <br />
				A myth to most... <br/>
				Begin your journey to start learning the secrets of the universe.<br />
				Grow your power by building your <strong>coding skills</strong> in an epic retro-style adventure.
			</Text>
			<Group my="lg" justify="center">
				<Button size="lg" variant="default" component={Link} href="/about">Learn more</Button>
				<Button size="lg" component={Link} href="/signup">Start Your Journey</Button>
			</Group>
		</Container>
	);
}
