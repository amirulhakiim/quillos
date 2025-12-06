export type PlatformAssets = {
	facebook: FacebookAssets;
	instagram: InstagramAssets;
	google: GoogleAssets;
};

export type FacebookAssets = {
	images: {
		square: string;
		vertical: string;
		landscape: string;
	};
	headlines: string[];
	primaryTexts: string[];
};

export type InstagramAssets = {
	images: {
		square: string;
		vertical: string;
		portrait: string;
	};
	headlines: string[];
	primaryTexts: string[];
};

export type GoogleAssets = {
	banners: {
		mediumRectangle: string;
		leaderboard: string;
		wideSkyscraper: string;
		largeRectangle: string;
	};
	headlines: string[];
	descriptions: string[];
};
