import { Container, Text } from '@mantine/core';

export default function About() {
	return (
		<Container>
			<Text my="md" className="text-center">
				Not much is known about <strong>rpg42</strong> yet...<br />
				Details will come in time.
			</Text>
		</Container>
	);
}