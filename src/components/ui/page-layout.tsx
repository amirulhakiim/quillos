import type { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	title: string;
	description: string;
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
	return (
		<div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-grid-white/[0.05]">
			<div className="absolute inset-0 -z-10 h-full w-full bg-navy bg-[radial-gradient(#e5e7eb33_1px,transparent_1px)] [background-size:16px_16px]" />
			<div className="layout-container flex h-full grow flex-col">
				<main className="px-4 sm:px-10 lg:px-20 flex flex-1 justify-center py-5 pt-32 pb-40">
					<div className="layout-content-container flex flex-col w-full max-w-[96rem] flex-1">
						<div className="flex flex-col gap-3 mb-12 items-start min-h-[140px]">
							<h1 className="text-slate-50 text-6xl font-bold leading-tight tracking-tighter font-heading bg-clip-text text-transparent bg-primary-gradient">
								{title}
							</h1>
							<p className="text-slate-400 text-lg font-medium leading-normal max-w-2xl">
								{description}
							</p>
						</div>
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
