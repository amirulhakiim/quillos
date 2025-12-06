import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				title: "Quillos - AI Marketing Campaign Generator",
			},
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%23ff6b6b'/%3E%3Cstop offset='100%25' style='stop-color:%23cc5de8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='24' height='24' fill='url(%23grad)' rx='4'/%3E%3Cpath d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap",
			},
			{
				rel: "stylesheet",
				href: "https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600,300,1&display=swap",
			},
		],
		scripts: [
			{
				src: "https://cdn.tailwindcss.com?plugins=forms,container-queries",
			},
			{
				src: "https://unpkg.com/lucide@latest",
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<script
					dangerouslySetInnerHTML={{
						__html: `
							tailwind.config = {
								darkMode: "class",
								theme: {
									extend: {
										colors: {
											primary: {
												from: "#ff6b6b",
												to: "#cc5de8",
											},
											accent: {
												yellow: "#ffd43b",
												cyan: "#22d3ee",
											},
											navy: "#0f172a",
										},
										fontFamily: {
											sans: ["DM Sans", "sans-serif"],
											heading: ["Clash Display", "Space Grotesk", "sans-serif"],
										},
										borderRadius: {
											xl: "16px",
											"2xl": "20px",
										},
										boxShadow: {
											glow: "0 0 20px 0px var(--glow-color)",
										},
										backgroundImage: {
											"primary-gradient": "linear-gradient(to right, #ff6b6b, #cc5de8)",
										},
										borderWidth: {
											"3": "3px",
										},
									},
								},
							}
						`,
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: `
							body {
								-webkit-font-smoothing: antialiased;
								-moz-osx-font-smoothing: grayscale;
							}
							.glass-card {
								background: rgba(255, 255, 255, 0.05);
								-webkit-backdrop-filter: blur(20px);
								backdrop-filter: blur(20px);
								border: 1px solid rgba(255, 255, 255, 0.1);
							}
							.dark .form-input, .dark .form-select {
								background-color: rgba(15, 23, 42, 0.5);
							}
							@keyframes subtle-bounce {
								0%, 100% {
									transform: translateY(0);
								}
								50% {
									transform: translateY(-5px);
								}
							}
							.animate-subtle-bounce {
								animation: subtle-bounce 2s ease-in-out infinite;
							}
						`,
					}}
				/>
			</head>
			<body className="font-sans bg-navy text-slate-200">
				<Header />
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
				<script
					dangerouslySetInnerHTML={{
						__html: "lucide.createIcons();",
					}}
				/>
			</body>
		</html>
	);
}
