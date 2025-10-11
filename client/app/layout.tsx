import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ApplicationShell } from "./components/ApplicationShell";
import { QueryProvider } from "./providers";
import { validateSession } from "@/lib/session";
export const metadata: Metadata = {
	title: "rpg42",
	description: "Learn to code in an RPG adventure",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>
					<QueryProvider>
						<ApplicationShell>{children}</ApplicationShell>
					</QueryProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
