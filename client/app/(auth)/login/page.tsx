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
import { LoginUserInput, loginUserSchema } from '@/db/validation';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/lib/services/user/mutations';

export default function LoginPage() {
	const router = useRouter();
	const loginMutation = useLoginMutation();

	const form = useForm<LoginUserInput>({
		initialValues: {
			usernameEmail: '',
			password: '',
		},
		validate: zod4Resolver(loginUserSchema),
	});

	const handleSubmit = (values: LoginUserInput) => {
		loginMutation.mutate(values, {
			onSuccess: () => {
				router.push('/game');
			},
		});
	};

	return (
		<Container size="xs">
			<Title order={2} ta="center" mb="lg">
				Log In
			</Title>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="UsernameEmail"
						placeholder="Your username/email"
						required
						{...form.getInputProps('usernameEmail')}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						{...form.getInputProps('password')}
					/>
					<Button type="submit" mt="md" loading={loginMutation.isPending}>
						Log In
					</Button>
				</Stack>
			</form>
		</Container>
	);
}
