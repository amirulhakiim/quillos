import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { GlassCard } from "./glass-card";

interface NavItemProps {
	href: string;
	icon: string;
	label: string;
	isActive?: boolean;
}

export function NavItem({ href, icon, label, isActive }: NavItemProps) {
	return (
		<Link
			to={href}
			className={cn(
				"group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200",
				isActive
					? "bg-white/10 border border-white/10 shadow-lg"
					: "hover:bg-white/5",
			)}
		>
			{!isActive && (
				<div className="absolute inset-0 rounded-xl bg-primary-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			)}
			{isActive && (
				<div className="absolute -left-1.5 h-6 w-1 rounded-full bg-accent-yellow" />
			)}
			<i
				className={cn(
					"relative z-10 size-5 transition-colors duration-200",
					isActive
						? "text-accent-yellow"
						: "text-slate-400 group-hover:text-white",
				)}
				data-lucide={icon}
			/>
			<span
				className={cn(
					"relative z-10 text-base transition-colors duration-200",
					isActive
						? "font-bold text-white"
						: "font-medium text-slate-300 group-hover:text-white",
				)}
			>
				{label}
			</span>
		</Link>
	);
}

interface SideNavProps {
	children: ReactNode;
}

export function SideNav({ children }: SideNavProps) {
	return (
		<aside className="col-span-12 lg:col-span-3">
			<GlassCard className="p-4 sticky top-32">
				<nav className="flex flex-col gap-2">{children}</nav>
			</GlassCard>
		</aside>
	);
}
