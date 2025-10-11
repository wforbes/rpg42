'use client';

import {
	Button,
	Container,
	PasswordInput,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { InsertUserInput, insertUserSchema } from '@/db/validation';
import { useSignUpMutation } from '@/lib/services/user/mutations';

export default function SignupPage() {
	const signUpMutation = useSignUpMutation();

	const form = useForm<InsertUserInput>({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validate: zod4Resolver(insertUserSchema),
	});

	const handleSubmit = (values: InsertUserInput) => {
		console.log('values', values);
		signUpMutation.mutate(values);
	};

	return (
		<Container size="xs">
			<Title order={2} ta="center" mb="lg">
				Create an Account
			</Title>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="Username"
						placeholder="Your username"
						required
						{...form.getInputProps('username')}
					/>
					<TextInput
						label="Email"
						placeholder="your@email.com"
						required
						type="email"
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						{...form.getInputProps('password')}
					/>
					<Button type="submit" mt="md" loading={signUpMutation.isPending}>
						Sign Up
					</Button>
				</Stack>
			</form>
		</Container>
	);
}
