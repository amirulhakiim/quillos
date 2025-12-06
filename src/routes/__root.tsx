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
				title: "Campaign Brief Input (Preview with Keywords)",
			},
		],
		links: [
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
