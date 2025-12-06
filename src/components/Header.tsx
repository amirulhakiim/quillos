import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
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
					>
						<title>Quillos Logo</title>
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
					<Link
						to="/"
						className="text-slate-300 hover:text-white text-base font-medium leading-normal transition-colors"
					>
						Dashboard
					</Link>
					<Link
						to="/social-media"
						className="text-slate-300 hover:text-white text-base font-medium leading-normal transition-colors"
					>
						Assets
					</Link>
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
	);
}
