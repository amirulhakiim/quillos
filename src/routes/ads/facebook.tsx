import { createFileRoute } from "@tanstack/react-router";
import { AssetSection } from "../../components/ui/asset-section";
import { Button } from "../../components/ui/button";
import { PageLayout } from "../../components/ui/page-layout";
import { NavItem, SideNav } from "../../components/ui/side-nav";

export const Route = createFileRoute("/ads/facebook")({
	component: FacebookAdsPage,
});

function FacebookAdsPage() {
	return (
		<PageLayout
			title="Facebook Ads"
			description="Your Facebook ad assets are ready. Review, refine, and export for your campaigns."
		>
			<div className="grid grid-cols-12 gap-8 items-start">
				<SideNav>
					<NavItem href="/social-media" icon="share-2" label="Social Media" />
					<NavItem
						href="/ads/facebook"
						icon="facebook"
						label="Facebook Ads"
						isActive
					/>
					<NavItem
						href="/ads/instagram"
						icon="instagram"
						label="Instagram Ads"
					/>
					<NavItem href="/ads/google" icon="image" label="Google Ads" />
				</SideNav>

				<div className="col-span-12 lg:col-span-9">
					<div className="grid grid-cols-1 gap-8">
						<AssetSection
							title="Image"
							icon="image"
							iconBgColor="bg-accent-yellow/10 p-2 rounded-lg"
							iconColor="text-accent-yellow"
							borderColor="border-3 border-accent-yellow/50 shadow-glow"
							glowColor="#ffd43b20"
							buttonColor="border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-navy"
						>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<ImageAsset
									title="Image (1:1 Aspect Ratio)"
									aspectRatio="aspect-square"
									maxWidth="max-w-xs"
								/>
								<ImageAsset
									title="Image (9:16 Aspect Ratio)"
									aspectRatio="aspect-[9/16]"
									maxWidth="max-w-[180px]"
								/>
								<ImageAsset
									title="Image (1.91:1 Aspect Ratio)"
									aspectRatio="aspect-[1.91/1]"
									maxWidth="max-w-sm"
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
						>
							<ul className="space-y-4">
								<ListItem text="Walk The Future." />
								<ListItem text="Sustainable Style, Unboxed." />
								<ListItem text="Eco-Friendly Sneakers" />
								<ListItem text="Step Into Sustainability" />
								<ListItem text="Conscious Comfort." />
							</ul>
						</AssetSection>

						<AssetSection
							title="Primary Text"
							icon="pilcrow"
							iconBgColor="bg-accent-cyan/10 p-2 rounded-lg"
							iconColor="text-accent-cyan"
							borderColor="border-3 border-accent-cyan/50 shadow-glow"
							glowColor="#22d3ee20"
							buttonColor="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-navy"
						>
							<ul className="space-y-4">
								<ListItem text="Step into the future with our new eco-friendly sneakers, crafted from recycled materials for ultimate comfort and sustainable style. Shop now!" />
								<ListItem text="Engineered for the conscious urban explorer. Our sustainable sneakers blend innovative design with recycled materials. Walk your values." />
								<ListItem text="Make a statement that matters. Our new line of sneakers combines sleek, city-ready design with a commitment to our planet. Explore the collection." />
								<ListItem text="Comfort meets conscience. Discover sneakers made for the modern world, featuring sustainable materials without compromising on performance or style." />
								<ListItem text="Your journey to sustainability starts here. Our eco-friendly sneakers are designed for comfort, durability, and a smaller footprint. Get your pair today." />
							</ul>
						</AssetSection>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

interface ImageAssetProps {
	title: string;
	aspectRatio: string;
	maxWidth: string;
}

function ImageAsset({ title, aspectRatio, maxWidth }: ImageAssetProps) {
	return (
		<div className="flex flex-col gap-4 items-center">
			<h4 className="text-lg font-bold text-slate-300 font-heading">{title}</h4>
			<div className={`w-full ${maxWidth} mx-auto`}>
				<div
					className={`${aspectRatio} w-full bg-cover bg-center rounded-2xl border border-white/10`}
					style={{
						backgroundImage:
							"url('https://lh3.googleusercontent.com/aida-public/AB6AXuADJAapoS-tGjTVv6tVHWLAfjhJ6dSY8EGAraLGZJ8XUtgSP3KrA0oUR5x76PUDDD2Sw11KKpY1vi3gY-IYJWLjIUcIUOpM3tClYU_xGkvGzZlQwdn91nyH_API3Vsk8gjmsLSOshOJdgxwG77xuHmLUrK2yZwI80DXmVxp1MCZEApL5Itow-bdPrUtw6Meefd3Wcsz7iRjCLEQZdwwdJXoE5etKLskzPlwCNh5Hk4aTuT6zAGRfz1hDXzgXZUtVzi-DMfCb1AkPDxw')",
					}}
				/>
			</div>
			<Button
				variant="outline"
				className="mt-4 border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-navy"
				icon={<i className="size-5" data-lucide="download" />}
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
