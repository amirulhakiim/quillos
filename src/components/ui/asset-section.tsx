import type { ReactNode } from "react";
import { Button } from "./button";
import { GlassCard } from "./glass-card";

interface AssetSectionProps {
	title: string;
	icon: string;
	iconBgColor: string;
	iconColor: string;
	borderColor: string;
	glowColor: string;
	buttonColor: string;
	children: ReactNode;
}

export function AssetSection({
	title,
	icon,
	iconBgColor,
	iconColor,
	borderColor,
	glowColor,
	buttonColor,
	children,
}: AssetSectionProps) {
	return (
		<GlassCard className={borderColor} glowColor={glowColor}>
			<div className="p-6 flex items-center justify-between gap-4 border-b border-white/10">
				<div className="flex items-center gap-4">
					<div className={iconBgColor}>
						<i className={`size-6 ${iconColor}`} data-lucide={icon} />
					</div>
					<h3 className="text-2xl font-bold text-slate-100 font-heading">
						{title}
					</h3>
				</div>
				<Button variant="outline" className={buttonColor}>
					<i className="size-5" data-lucide="download-cloud" />
					<span className="hidden sm:inline">Download All</span>
				</Button>
			</div>
			<div className="p-6 bg-navy/20">{children}</div>
		</GlassCard>
	);
}
