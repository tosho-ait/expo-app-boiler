import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    output: "standalone",
    transpilePackages: ['@appboiler/shared'],
    outputFileTracingRoot: path.join(__dirname, '../'),
    webpack: (config) => {
        config.resolve.modules.push(path.resolve(__dirname, 'node_modules'));
        return config;
    },
    experimental: {
        proxyClientMaxBodySize: '50mb',
        cpus: 1,
    },
};

export default nextConfig;
