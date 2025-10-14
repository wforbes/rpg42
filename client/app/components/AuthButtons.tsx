import { useSessionQuery } from '@/lib/services/session/queries';
import { useLogoutMutation } from '@/lib/services/user/mutations';
import { useUtilities } from '@/lib/services/useUtilities';
import { Button, Group } from '@mantine/core';
import Link from 'next/link';

export function AuthButtons() {
	const { data: { user } = {} } = useSessionQuery();
	const { mutateAsync: logoutMutation } = useLogoutMutation();
	const { handleAuthLogout } = useUtilities();
	

	const handleLogout = async () => {
		try {
			await logoutMutation();
			handleAuthLogout();
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

    return (
        <>
            {!user ? (
                <>
                    <Button component={Link} href="/login" variant="default">Login</Button>
                    <Button component={Link} href="/signup">Sign Up</Button>
                </>
            ) : (
                <Button variant="default" onClick={handleLogout}>Logout</Button>
            )}
        </>
    );
}
