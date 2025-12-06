import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps {
	children: ReactNode;
	className?: string;
	borderColor?: string;
	glowColor?: string;
}

export function GlassCard({
	children,
	className,
	borderColor,
	glowColor,
}: GlassCardProps) {
	return (
		<div
			className={cn("glass-card rounded-2xl", borderColor, className)}
			style={
				glowColor
					? ({ "--glow-color": glowColor } as React.CSSProperties)
					: undefined
			}
		>
			{children}
		</div>
	);
}
