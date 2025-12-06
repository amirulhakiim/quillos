import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { PreviewCard } from "../components/preview-card";
import { FileUpload } from "../components/ui/file-upload";
import { type MarketingResult, readFileAsDataUrl } from "../lib/ai";
import { generateMarketing } from "../lib/ai.server";

export const Route = createFileRoute("/")({ component: App });

function App() {
	const descriptionId = useId();
	const [description, setDescription] = useState("");
	const [heroImage, setHeroImage] = useState<File | null>(null);
	const [heroImagePreview, setHeroImagePreview] = useState<string>();
	const [result, setResult] = useState<MarketingResult | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [error, setError] = useState<string>();

	const handleImageSelect = (file: File) => {
		if (!file.type.startsWith("image/")) {
			setError("Please upload an image file.");
			return;
		}
		if (heroImagePreview) {
			URL.revokeObjectURL(heroImagePreview);
		}
		setResult(null);
		setError(undefined);
		setHeroImage(file);
		setHeroImagePreview(URL.createObjectURL(file));
	};

	const handleCreatePreview = async () => {
		console.log("handleCreatePreview called", { heroImage });
		if (!heroImage) {
			setError("Upload a hero image to continue.");
			return;
		}
		setIsGenerating(true);
		setError(undefined);
		try {
			console.log("Reading file...");
			const { dataUrl, mediaType } = await readFileAsDataUrl(heroImage);
			console.log("Calling server function...", { mediaType });
			const result = await generateMarketing({
				data: {
					description,
					dataUrl,
					mediaType,
				},
			});
			console.log("Result received:", result);
			console.log("Has poster image:", !!result.posterImage);
			if (result.posterImage) {
				console.log("Poster image length:", result.posterImage.length);
			}
			setResult(result);
		} catch (thrownError) {
			console.error("Error:", thrownError);
			const message =
				thrownError instanceof Error
					? thrownError.message
					: "Failed to generate preview.";
			setError(message);
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-grid-white/[0.05]">
			<div className="absolute inset-0 -z-10 h-full w-full bg-navy bg-[radial-gradient(#e5e7eb33_1px,transparent_1px)] [background-size:16px_16px]" />
			<div className="layout-container flex h-full grow flex-col">
				<header className="flex items-center justify-between whitespace-nowrap px-6 sm:px-10 lg:px-20 py-4 fixed top-0 left-0 right-0 bg-navy/80 backdrop-blur-md z-50 border-b border-slate-800">
					<div className="flex items-center gap-4 text-slate-50">
						<div className="size-9 bg-primary-gradient rounded-lg flex items-center justify-center shadow-lg">
							<svg
								className="size-5 text-white"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-label="Campaign Generator Logo"
							>
								<title>Campaign Generator Logo</title>
								<path
									d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h2 className="text-slate-50 text-2xl font-bold leading-tight font-heading">
							Quillos
						</h2>
					</div>
					<div className="flex items-center gap-6">
						<div className="hidden sm:flex items-center gap-6">
							<button
								type="button"
								className="text-slate-300 hover:text-white text-base font-medium leading-normal transition-colors"
							>
								Dashboard
							</button>
							<button
								type="button"
								className="text-slate-300 hover:text-white text-base font-medium leading-normal transition-colors"
							>
								History
							</button>
						</div>
						<div
							className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-accent-cyan"
							style={{
								backgroundImage:
									'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5VbmG5PKwfWoLnhQRoM7OF-cdrJPUO6RAEZyyZmyQf_d-TzQH9Lgji5ZkrpYYgLDCPWcsoSx0s2XGnyWFWIToxG4MJEdDx7DwsGEhAAu1PHTUB2BygfjqigWYYJU7Ms0wSEZYYWPrTlrq3Tg0o_6h9WmnzYKHFfc__1TBUCZvlluNRTx_s4w5CQNBGSkqA8757ELVlt7hhFjge1-VpK65oE7NeEZ8xo9GzdutKGp_0MrxDV1i0jucBoGL_wglzulwRvkdaGJrxwE")',
							}}
						/>
					</div>
				</header>
				<main className="px-4 sm:px-10 lg:px-20 flex flex-1 justify-center py-5 pt-32 pb-40">
					<div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
						<div className="flex flex-col gap-3 mb-12 text-center items-center">
							<h1 className="text-slate-50 text-6xl font-bold leading-tight tracking-tighter font-heading bg-clip-text text-transparent bg-primary-gradient">
								Campaign Brief Input
							</h1>
							<p className="text-slate-400 text-lg font-medium leading-normal max-w-2xl">
								Fuel the AI with your vision. Upload an image, drop some
								details, and watch the magic unfold in under 5 minutes.
							</p>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 items-start">
							<div className="flex flex-col gap-8 lg:col-span-1">
								<div className="glass-card rounded-2xl">
									<div className="p-8">
										<h3 className="text-2xl font-bold text-slate-100 font-heading">
											1. Upload Hero Image
										</h3>
										<p className="text-base text-slate-400 mt-1">
											This is the visual centerpiece of your campaign.
										</p>
									</div>
									<div className="px-8 pb-8">
										<FileUpload
											title="Click to upload or drag & drop"
											description="SVG, PNG, JPG or GIF (max. 2400x1600px)"
											accept="image/*"
											onFileSelect={handleImageSelect}
											fileName={heroImage?.name}
											disabled={isGenerating}
										/>
										{heroImage ? (
											<div className="mt-4 flex items-center gap-2 text-accent-cyan">
												<i className="size-5" data-lucide="check-circle" />
												<p className="text-sm font-medium">
													Image uploaded: {heroImage.name}
												</p>
											</div>
										) : null}
									</div>
								</div>
								<div className="glass-card rounded-2xl">
									<div className="p-8 border-b border-white/10">
										<h3 className="text-2xl font-bold text-slate-100 font-heading">
											2. Add Campaign Context
										</h3>
										<p className="text-base text-slate-400 mt-1">
											Guide the AI for perfectly tailored assets.
										</p>
									</div>
									<div className="p-8">
										<div className="flex flex-col gap-3">
											<label
												className="text-slate-200 text-base font-medium leading-normal"
												htmlFor={descriptionId}
											>
												Campaign Description{" "}
												<span className="text-slate-500">(Optional)</span>
											</label>
											<textarea
												className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-xl text-slate-100 focus:outline-0 focus:ring-2 focus:ring-accent-yellow border-3 border-slate-700 bg-transparent focus:border-accent-yellow min-h-40 placeholder:text-slate-500 p-4 text-base font-medium transition-colors"
												id={descriptionId}
												placeholder="e.g., A campaign for our new sustainable sneakers. Focus on urban exploration and eco-consciousness."
												value={description}
												onChange={(event) => setDescription(event.target.value)}
											/>
										</div>
									</div>
								</div>
								<div className="w-full">
									<button
										type="button"
										className="w-full rounded-2xl bg-slate-300 py-4 text-lg font-bold text-slate-900 shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
										onClick={handleCreatePreview}
										disabled={isGenerating}
									>
										{isGenerating ? "Creating..." : "Create Preview"}
									</button>
									{error ? (
										<p className="mt-3 text-sm text-accent-rose">{error}</p>
									) : null}
								</div>
							</div>
							<div className="lg:col-span-1 mt-8 lg:mt-0 h-full">
								<PreviewCard
									headline={result?.headline}
									bodyCopy={result?.bodyCopy}
									keywords={result?.keywords}
									posterImage={result?.posterImage}
									isLoading={isGenerating}
									error={error}
								/>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
