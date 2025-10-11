import { useSessionQuery } from '@/lib/services/session/queries';
import { Button, Group } from '@mantine/core';
import Link from 'next/link';

export function AuthButtons() {
	const { data: { user } = {} } = useSessionQuery();
	
    return (
        <>
            {!user ? (
                <>
                    <Button component={Link} href="/login" variant="default">Login</Button>
                    <Button component={Link} href="/signup">Sign Up</Button>
                </>
            ) : (
                <Button variant="default">Logout</Button>
            )}
        </>
    );
}
