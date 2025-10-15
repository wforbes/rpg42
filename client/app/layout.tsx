import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ApplicationShell } from "./components/ApplicationShell";
import { QueryProvider } from "./providers";
//import { ConditionalSocketProvider } from "@/lib/services/socket/ConditionalSocketProvider";

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
						{/*<ConditionalSocketProvider> if we need socket data in nextjs */}
							<ApplicationShell>{children}</ApplicationShell>
						{/*</ConditionalSocketProvider>*/}
					</QueryProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
