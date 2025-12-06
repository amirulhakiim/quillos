import { createFileRoute } from "@tanstack/react-router";
import { AssetSection } from "../../components/ui/asset-section";
import { Button } from "../../components/ui/button";
import { PageLayout } from "../../components/ui/page-layout";
import { NavItem, SideNav } from "../../components/ui/side-nav";
import { useAssetsWithImages } from "../../lib/use-assets-with-images";

export const Route = createFileRoute("/ads/google")({
	component: GoogleAdsPage,
});

function GoogleAdsPage() {
	const { assets, loading } = useAssetsWithImages();
	const googleAssets = assets?.google;

	const copyHeadlines = () => {
		if (googleAssets?.headlines) {
			const text = googleAssets.headlines.join("\n");
			navigator.clipboard.writeText(text);
		}
	};

	const copyDescriptions = () => {
		if (googleAssets?.descriptions) {
			const text = googleAssets.descriptions.join("\n\n");
			navigator.clipboard.writeText(text);
		}
	};

	if (loading) {
		return (
			<PageLayout
				title="Google Display Ads"
				description="Your Google Display ad assets are ready. Optimized for the Google Ad Network."
			>
				<div className="flex items-center justify-center py-20">
					<div className="animate-spin size-12 border-4 border-accent-yellow border-t-transparent rounded-full" />
				</div>
			</PageLayout>
		);
	}
	return (
		<PageLayout
			title="Google Display Ads"
			description="Your Google Display ad assets are ready. Optimized for the Google Ad Network."
		>
			<div className="grid grid-cols-12 gap-8 items-start">
				<SideNav>
					<NavItem href="/social-media" icon="share-2" label="Social Media" />
					<NavItem href="/ads/facebook" icon="facebook" label="Facebook Ads" />
					<NavItem
						href="/ads/instagram"
						icon="instagram"
						label="Instagram Ads"
					/>
					<NavItem
						href="/ads/google"
						icon="image"
						label="Google Ads"
						isActive
					/>
				</SideNav>

				<div className="col-span-12 lg:col-span-9">
					<div className="grid grid-cols-1 gap-8">
						<AssetSection
							title="Display Banners"
							icon="image"
							iconBgColor="bg-accent-cyan/10 p-2 rounded-lg"
							iconColor="text-accent-cyan"
							borderColor="border-3 border-accent-cyan/50 shadow-glow"
							glowColor="#22d3ee20"
							buttonColor="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-navy"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<BannerAsset
									title="Medium Rectangle (300x250)"
									aspectRatio="aspect-[300/250]"
									imageUrl={googleAssets?.banners?.mediumRectangle}
								/>
								<BannerAsset
									title="Leaderboard (728x90)"
									aspectRatio="aspect-[728/90]"
									imageUrl={googleAssets?.banners?.leaderboard}
								/>
								<BannerAsset
									title="Wide Skyscraper (160x600)"
									aspectRatio="aspect-[160/600]"
									imageUrl={googleAssets?.banners?.wideSkyscraper}
								/>
								<BannerAsset
									title="Large Rectangle (336x280)"
									aspectRatio="aspect-[336/280]"
									imageUrl={googleAssets?.banners?.largeRectangle}
								/>
							</div>
						</AssetSection>

						<AssetSection
							title="Headline"
							icon="type"
							iconBgColor="bg-primary-from/10 p-2 rounded-lg"
							iconColor="text-primary-from"
							borderColor="border-3 border-primary-from/50 shadow-glow"
							glowColor="#ff6b6b20"
							buttonColor="border-primary-from text-primary-from hover:bg-primary-from hover:text-navy"
							buttonText="Copy"
							buttonIcon="copy"
							onButtonClick={copyHeadlines}
						>
							<ul className="space-y-4">
								{googleAssets?.headlines.map((headline, index) => (
									<ListItem key={index} text={headline} />
								)) || (
									<>
										<ListItem text="Walk The Future." />
										<ListItem text="Sustainable Style, Unboxed." />
										<ListItem text="Eco-Friendly Sneakers" />
										<ListItem text="Step Into Sustainability" />
										<ListItem text="Conscious Comfort." />
									</>
								)}
							</ul>
						</AssetSection>

						<AssetSection
							title="Description"
							icon="pilcrow"
							iconBgColor="bg-accent-yellow/10 p-2 rounded-lg"
							iconColor="text-accent-yellow"
							borderColor="border-3 border-accent-yellow/50 shadow-glow"
							glowColor="#ffd43b20"
							buttonColor="border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-navy"
							buttonText="Copy"
							buttonIcon="copy"
							onButtonClick={copyDescriptions}
						>
							<ul className="space-y-4">
								{googleAssets?.descriptions.map((description, index) => (
									<ListItem key={index} text={description} color="bg-accent-yellow" />
								)) || (
									<>
										<ListItem
											text="Step into the future with our new eco-friendly sneakers, crafted from recycled materials for ultimate comfort and sustainable style. Shop now!"
											color="bg-accent-yellow"
										/>
										<ListItem
											text="Engineered for the conscious urban explorer. Our sustainable sneakers blend innovative design with recycled materials. Walk your values."
											color="bg-accent-yellow"
										/>
										<ListItem
											text="Make a statement that matters. Our new line of sneakers combines sleek, city-ready design with a commitment to our planet. Explore the collection."
											color="bg-accent-yellow"
										/>
										<ListItem
											text="Comfort meets conscience. Discover sneakers made for the modern world, featuring sustainable materials without compromising on performance or style."
											color="bg-accent-yellow"
										/>
										<ListItem
											text="Your journey to sustainability starts here. Our eco-friendly sneakers are designed for comfort, durability, and a smaller footprint. Get your pair today."
											color="bg-accent-yellow"
										/>
									</>
								)}
							</ul>
						</AssetSection>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

interface BannerAssetProps {
	title: string;
	aspectRatio: string;
	imageUrl?: string;
}

function BannerAsset({ title, aspectRatio, imageUrl }: BannerAssetProps) {
	return (
		<div className="flex flex-col gap-4 items-center">
			<h4 className="text-lg font-bold text-slate-300 font-heading">{title}</h4>
			<div className="w-full max-w-md mx-auto">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={title}
						className={`${aspectRatio} w-full object-cover rounded-2xl border border-white/10`}
					/>
				) : (
					<div
						className={`${aspectRatio} w-full bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center`}
					>
						<p className="text-slate-600 text-sm">No banner generated</p>
					</div>
				)}
			</div>
			<Button
				variant="outline"
				className="mt-4 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-navy"
				icon={<i className="size-5" data-lucide="download" />}
				onClick={() => {
					if (imageUrl) {
						const link = document.createElement("a");
						link.href = imageUrl;
						link.download = `google-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
						link.click();
					}
				}}
			>
				Download
			</Button>
		</div>
	);
}

interface ListItemProps {
	text: string;
	color?: string;
}

function ListItem({ text, color = "bg-primary-from" }: ListItemProps) {
	return (
		<li className="flex items-start gap-3">
			<div className={`size-2 ${color} rounded-full mt-2.5 flex-shrink-0`} />
			<p className="text-lg font-medium text-slate-200">{text}</p>
		</li>
	);
}
