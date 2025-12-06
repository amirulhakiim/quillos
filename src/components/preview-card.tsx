import { useState } from "react";

type PreviewCardProps = {
	headline?: string;
	bodyCopy?: string;
	keywords?: string[];
	posterImage?: string;
	isGeneratingPreview?: boolean;
	isGeneratingAssets?: boolean;
	error?: string;
	onGenerateAssets?: () => void;
};

export function PreviewCard({
	headline,
	bodyCopy,
	keywords = [],
	posterImage,
	isGeneratingPreview,
	isGeneratingAssets,
	error,
	onGenerateAssets,
}: PreviewCardProps) {
	const [showFullImage, setShowFullImage] = useState(false);
	const displayHeadline =
		headline || "Your generated headline will appear here.";
	const displayBody =
		bodyCopy ||
		"Upload a hero image and add optional context to generate marketing copy.";
	const displayKeywords = keywords.length
		? keywords
		: ["Awaiting", "Generation", "Marketing", "Keywords"];

	return (
		<>
			<div className="glass-card rounded-2xl border-3 border-accent-yellow/50 overflow-hidden h-full flex flex-col">
				<div className="p-8">
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<i className="size-6 text-accent-yellow" data-lucide="eye" />
							<h3 className="text-2xl font-bold text-slate-100 font-heading">
								3. Preview
							</h3>
						</div>
						{(isGeneratingPreview || isGeneratingAssets) ? (
							<span className="text-sm font-medium text-accent-yellow">
								Generating...
							</span>
						) : null}
						{error ? (
							<span className="text-sm font-medium text-accent-rose">
								{error}
							</span>
						) : null}
					</div>
					<p className="text-base text-slate-400 mt-1">
						A real-time glimpse of your campaign's core components.
					</p>
				</div>
				<div className="px-8 pb-8 flex-grow flex flex-col justify-between">
					<div className="flex flex-col gap-8 rounded-2xl bg-navy/50 p-6 border border-slate-800 h-full">
						<div className="w-full">
							<div className="aspect-video w-full bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden">
								{posterImage ? (
									<button
										type="button"
										onClick={() => setShowFullImage(true)}
										className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
									>
										<img
											src={posterImage}
											alt="Generated marketing poster"
											className="w-full h-full object-cover rounded-xl"
										/>
									</button>
								) : (
									<div className="flex flex-col items-center gap-3 text-slate-600">
										{isGeneratingPreview ? (
											<div className="animate-spin size-12 border-4 border-slate-700 border-t-transparent rounded-full" />
										) : (
											<i className="size-12" data-lucide="image" />
										)}
										<p className="text-sm font-medium">
											{isGeneratingPreview
												? "Generating poster..."
												: "Click 'Create Preview' to generate poster"}
										</p>
									</div>
								)}
							</div>
						</div>
						<div className="flex flex-col justify-center gap-6">
							<div>
								<h4 className="text-xl font-bold text-slate-200 font-heading mb-3">
									Headline
								</h4>
								<p className="text-slate-400 text-base leading-relaxed">
									{displayHeadline}
								</p>
							</div>
							<div>
								<h4 className="text-xl font-bold text-slate-200 font-heading mb-3">
									Body Copy
								</h4>
								<p className="text-slate-400 text-base leading-relaxed">
									{displayBody}
								</p>
							</div>
							<div>
								<h4 className="text-xl font-bold text-slate-200 font-heading mb-3">
									Keywords
								</h4>
								<div className="flex flex-wrap gap-2">
									{displayKeywords.map((keyword) => (
										<span
											key={keyword}
											className="inline-flex items-center rounded-full bg-primary-gradient px-3 py-1 text-sm font-medium text-white"
										>
											{keyword}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="mt-8">
						<button
							type="button"
							className="group relative inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-gradient px-8 py-4 text-xl font-bold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
							disabled={!posterImage || isGeneratingAssets}
							onClick={onGenerateAssets}
						>
							<div className="absolute inset-0 rounded-2xl bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							{isGeneratingAssets && (
								<div className="relative z-10 animate-spin size-6 border-2 border-white border-t-transparent rounded-full" />
							)}
							<span className="relative z-10">
								{isGeneratingAssets ? "Generating Assets..." : "Generate Assets"}
							</span>
							{!isGeneratingAssets && (
								<i
									className="relative z-10 size-6 transition-transform duration-300 group-hover:rotate-12"
									data-lucide="wand-sparkles"
								/>
							)}
						</button>
					</div>
				</div>
			</div>

			{showFullImage && posterImage ? (
				<div
					role="dialog"
					aria-modal="true"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
					onClick={() => setShowFullImage(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							setShowFullImage(false);
						}
					}}
				>
					<button
						type="button"
						className="absolute top-4 right-4 text-white hover:text-accent-yellow transition-colors"
						onClick={() => setShowFullImage(false)}
					>
						<i className="size-8" data-lucide="x" />
					</button>
					<img
						src={posterImage}
						alt="Generated marketing poster - Full size"
						className="max-w-full max-h-full object-contain"
					/>
				</div>
			) : null}
		</>
	);
}
