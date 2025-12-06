import { useEffect, useState } from "react";
import type { PlatformAssets } from "./assets";

export function usePlatformAssets() {
	const [assets, setAssets] = useState<PlatformAssets | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("platformAssets");
		if (stored) {
			try {
				setAssets(JSON.parse(stored));
			} catch (error) {
				console.error("Failed to parse platform assets:", error);
			}
		}
	}, []);

	return assets;
}
