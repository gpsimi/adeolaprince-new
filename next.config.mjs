/** @type {import('next').NextConfig} */
const nextConfig = {
	// Explicitly set Turbopack root to this project to avoid warnings when multiple
	// lockfiles exist on the machine (e.g. a global package-lock.json in the user folder).
	turbopack: {
		root: '.',
	},
};

export default nextConfig;
