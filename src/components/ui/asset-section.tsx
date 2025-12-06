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
	buttonText?: string;
	buttonIcon?: string;
	onButtonClick?: () => void;
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
	buttonText = "Download All",
	buttonIcon = "download-cloud",
	onButtonClick,
	children,
}: AssetSectionProps) {
	return (
		<GlassCard className={borderColor} glowColor={glowColor}>
			<div className="p-6 border-b border-white/10">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className={iconBgColor}>
							<i className={`size-6 ${iconColor}`} data-lucide={icon} />
						</div>
						<h3 className="text-2xl font-bold text-slate-100 font-heading">
							{title}
						</h3>
					</div>
					<Button variant="outline" className={buttonColor} onClick={onButtonClick}>
						{buttonText}
					</Button>
				</div>
			</div>
			<div className="p-6 bg-navy/20">{children}</div>
		</GlassCard>
	);
}
