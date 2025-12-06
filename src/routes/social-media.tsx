import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "../components/ui/page-layout";
import { NavItem, SideNav } from "../components/ui/side-nav";
import { usePlatformAssets } from "../lib/use-platform-assets";

export const Route = createFileRoute("/social-media")({
	component: SocialMediaPage,
});

function SocialMediaPage() {
	const assets = usePlatformAssets();
	const hasAssets = assets !== null;

	return (
		<PageLayout
			title="Social Media Assets"
			description="Your multi-channel social media marketing assets are ready. Review, refine, and export."
		>
			<div className="grid grid-cols-12 gap-8 items-start">
				<SideNav>
					<NavItem
						href="/social-media"
						icon="share-2"
						label="Social Media"
						isActive
					/>
					<NavItem href="/ads/facebook" icon="facebook" label="Facebook Ads" />
					<NavItem
						href="/ads/instagram"
						icon="instagram"
						label="Instagram Ads"
					/>
					<NavItem href="/ads/google" icon="image" label="Google Ads" />
				</SideNav>

				<div className="col-span-12 lg:col-span-9">
					<div className="grid grid-cols-1 gap-8">
						{hasAssets ? (
							<>
								<div className="glass-card rounded-2xl p-8 border border-primary-from/30">
									<div className="flex items-start gap-4 mb-6">
										<div className="bg-primary-from/10 p-3 rounded-lg">
											<i
												className="size-8 text-primary-from"
												data-lucide="music"
											/>
										</div>
										<div>
											<h2 className="text-2xl font-bold text-slate-100 font-heading">
												TikTok
											</h2>
											<p className="text-slate-400 mt-1">
												Viral content for short-form video
											</p>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
											Sample Captions
										</p>
										<ul className="space-y-2">
											{assets.facebook.headlines.slice(0, 3).map((h, i) => (
												<li
													key={i}
													className="text-slate-300 flex items-start gap-2"
												>
													<span className="text-primary-from mt-1">•</span>
													{h}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="glass-card rounded-2xl p-8 border border-accent-cyan/30">
									<div className="flex items-start gap-4 mb-6">
										<div className="bg-accent-cyan/10 p-3 rounded-lg">
											<i
												className="size-8 text-accent-cyan"
												data-lucide="facebook"
											/>
										</div>
										<div>
											<h2 className="text-2xl font-bold text-slate-100 font-heading">
												Facebook
											</h2>
											<p className="text-slate-400 mt-1">
												Engaging posts for your community
											</p>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
											Sample Posts
										</p>
										<ul className="space-y-2">
											{assets.facebook.primaryTexts.slice(0, 3).map((h, i) => (
												<li
													key={i}
													className="text-slate-300 flex items-start gap-2"
												>
													<span className="text-accent-cyan mt-1">•</span>
													{h}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="glass-card rounded-2xl p-8 border border-accent-yellow/30">
									<div className="flex items-start gap-4 mb-6">
										<div className="bg-accent-yellow/10 p-3 rounded-lg">
											<i
												className="size-8 text-accent-yellow"
												data-lucide="at-sign"
											/>
										</div>
										<div>
											<h2 className="text-2xl font-bold text-slate-100 font-heading">
												Threads
											</h2>
											<p className="text-slate-400 mt-1">
												Conversational content for Meta's text platform
											</p>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
											Sample Threads
										</p>
										<ul className="space-y-2">
											{assets.instagram.headlines.slice(0, 3).map((h, i) => (
												<li
													key={i}
													className="text-slate-300 flex items-start gap-2"
												>
													<span className="text-accent-yellow mt-1">•</span>
													{h}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="glass-card rounded-2xl p-8 border border-accent-cyan/30">
									<div className="flex items-start gap-4 mb-6">
										<div className="bg-accent-cyan/10 p-3 rounded-lg">
											<i
												className="size-8 text-accent-cyan"
												data-lucide="twitter"
											/>
										</div>
										<div>
											<h2 className="text-2xl font-bold text-slate-100 font-heading">
												Twitter
											</h2>
											<p className="text-slate-400 mt-1">
												Concise posts for maximum engagement
											</p>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-sm text-slate-500 uppercase tracking-wide font-semibold">
											Sample Tweets
										</p>
										<ul className="space-y-2">
											{assets.google.headlines.slice(0, 3).map((h, i) => (
												<li
													key={i}
													className="text-slate-300 flex items-start gap-2"
												>
													<span className="text-accent-cyan mt-1">•</span>
													{h}
												</li>
											))}
										</ul>
									</div>
								</div>
							</>
						) : (
							<div className="glass-card rounded-2xl p-8">
								<h2 className="text-3xl font-bold text-slate-100 font-heading mb-4">
									Welcome to Your Social Media Hub
								</h2>
								<p className="text-lg text-slate-300 mb-6">
									No assets generated yet. Go to the home page to create your
									campaign assets.
								</p>
								<Link
									to="/"
									className="inline-block px-6 py-3 bg-primary-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
								>
									Create Campaign
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
