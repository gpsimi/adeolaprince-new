/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nkdacamjnhqwkgdtwseq.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/**',
			},
		],
	},
	// Explicitly set Turbopack root to this project to avoid warnings when multiple
	// lockfiles exist on the machine (e.g. a global package-lock.json in the user folder).
	turbopack: {
		root: '.',
	},
};

export default nextConfig;
