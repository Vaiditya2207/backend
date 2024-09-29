import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = [];

const loadRoutes = async () => {
    const files = await fs.promises.readdir(path.join(__dirname, 'functions'));
    for (const file of files) {
        const filePath = path.join(__dirname, 'functions', file);
        const module = await import(filePath);
        routes.push(module.default);
    }
};

export default { routes, loadRoutes };