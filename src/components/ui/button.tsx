import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps {
	children: ReactNode;
	variant?: "primary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	className?: string;
	onClick?: () => void;
	icon?: ReactNode;
}

export function Button({
	children,
	variant = "primary",
	size = "md",
	className,
	onClick,
	icon,
}: ButtonProps) {
	const baseStyles =
		"group inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300";

	const variantStyles = {
		primary:
			"rounded-xl bg-accent-yellow px-6 py-2.5 text-navy hover:scale-105 hover:bg-accent-yellow/90",
		outline:
			"rounded-xl border-2 border-accent-yellow px-6 py-2.5 text-accent-yellow hover:scale-105 hover:bg-accent-yellow hover:text-navy",
		ghost: "rounded-xl px-4 py-2 hover:bg-white/5",
	};

	const sizeStyles = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	return (
		<button
			type="button"
			className={cn(
				baseStyles,
				variantStyles[variant],
				sizeStyles[size],
				className,
			)}
			onClick={onClick}
		>
			{children}
			{icon && (
				<span className="transition-transform duration-300 group-hover:-translate-y-1">
					{icon}
				</span>
			)}
		</button>
	);
}
