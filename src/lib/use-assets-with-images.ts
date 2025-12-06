import { useEffect, useState } from "react";
import type { PlatformAssets } from "./assets";
import { getImage } from "./indexeddb";

export function useAssetsWithImages() {
	const [assets, setAssets] = useState<PlatformAssets | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadAssets() {
			try {
				const stored = localStorage.getItem("platformAssets");
				if (!stored) {
					setLoading(false);
					return;
				}

				const textAssets = JSON.parse(stored);

				const [
					fbSquare,
					fbVertical,
					fbLandscape,
					igSquare,
					igVertical,
					igPortrait,
					googleMedRect,
					googleLeader,
					googleSkyscraper,
					googleLargeRect,
				] = await Promise.all([
					getImage("fb-square"),
					getImage("fb-vertical"),
					getImage("fb-landscape"),
					getImage("ig-square"),
					getImage("ig-vertical"),
					getImage("ig-portrait"),
					getImage("google-med-rect"),
					getImage("google-leader"),
					getImage("google-skyscraper"),
					getImage("google-large-rect"),
				]);

				const fullAssets: PlatformAssets = {
					facebook: {
						images: {
							square: fbSquare || "",
							vertical: fbVertical || "",
							landscape: fbLandscape || "",
						},
						headlines: textAssets.facebook.headlines,
						primaryTexts: textAssets.facebook.primaryTexts,
					},
					instagram: {
						images: {
							square: igSquare || "",
							vertical: igVertical || "",
							portrait: igPortrait || "",
						},
						headlines: textAssets.instagram.headlines,
						primaryTexts: textAssets.instagram.primaryTexts,
					},
					google: {
						banners: {
							mediumRectangle: googleMedRect || "",
							leaderboard: googleLeader || "",
							wideSkyscraper: googleSkyscraper || "",
							largeRectangle: googleLargeRect || "",
						},
						headlines: textAssets.google.headlines,
						descriptions: textAssets.google.descriptions,
					},
				};

				setAssets(fullAssets);
			} catch (error) {
				console.error("Failed to load assets:", error);
			} finally {
				setLoading(false);
			}
		}

		loadAssets();
	}, []);

	return { assets, loading };
}
