import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "../components/ui/page-layout";
import { NavItem, SideNav } from "../components/ui/side-nav";

export const Route = createFileRoute("/social-media")({
	component: SocialMediaPage,
});

function SocialMediaPage() {
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
						<div className="glass-card rounded-2xl p-8">
							<h2 className="text-3xl font-bold text-slate-100 font-heading mb-4">
								Welcome to Your Social Media Hub
							</h2>
							<p className="text-lg text-slate-300 mb-6">
								Explore your generated assets across different platforms. Select
								a platform from the sidebar to view and download your
								custom-tailored marketing materials.
							</p>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
								<div className="glass-card p-6 rounded-xl border border-accent-cyan/30 hover:border-accent-cyan transition-colors duration-300">
									<div className="bg-accent-cyan/10 p-3 rounded-lg w-fit mb-4">
										<i
											className="size-8 text-accent-cyan"
											data-lucide="facebook"
										/>
									</div>
									<h3 className="text-xl font-bold text-slate-100 mb-2">
										Facebook Ads
									</h3>
									<p className="text-slate-400">
										Optimized ad creatives for Facebook campaigns
									</p>
								</div>
								<div className="glass-card p-6 rounded-xl border border-primary-from/30 hover:border-primary-from transition-colors duration-300">
									<div className="bg-primary-from/10 p-3 rounded-lg w-fit mb-4">
										<i
											className="size-8 text-primary-from"
											data-lucide="instagram"
										/>
									</div>
									<h3 className="text-xl font-bold text-slate-100 mb-2">
										Instagram Ads
									</h3>
									<p className="text-slate-400">
										Visually stunning ads designed for Instagram
									</p>
								</div>
								<div className="glass-card p-6 rounded-xl border border-accent-yellow/30 hover:border-accent-yellow transition-colors duration-300">
									<div className="bg-accent-yellow/10 p-3 rounded-lg w-fit mb-4">
										<i
											className="size-8 text-accent-yellow"
											data-lucide="image"
										/>
									</div>
									<h3 className="text-xl font-bold text-slate-100 mb-2">
										Google Ads
									</h3>
									<p className="text-slate-400">
										Display ads crafted for Google Ad Network
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
