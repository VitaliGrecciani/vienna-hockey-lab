import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;
const DIST_DIR = path.resolve(__dirname, 'dist');

const routes = [
    '/',
    '/de',
    '/skills',
    '/individual-training',
    '/hockey-iq',
    '/skating-mechanics'
];

async function run() {
    const app = express();
    app.use(express.static(DIST_DIR));
    app.use((req, res) => {
        res.sendFile(path.resolve(DIST_DIR, 'index.html'));
    });

    const server = app.listen(PORT, async () => {
        console.log(`Prerender server running on port ${PORT}`);
        let browser;
        try {
            browser = await puppeteer.launch({ 
                headless: "new",
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();

            for (const route of routes) {
                console.log(`Prerendering ${route} ...`);
                await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });
                
                // Allow some time for animations (e.g. framer-motion)
                await new Promise(r => setTimeout(r, 1000));

                let html = await page.content();
                
                // Remove the script injected by puppeteer (if any)
                // Just write out the HTML
                const routePath = route === '/' ? '/index' : route;
                const outPath = path.join(DIST_DIR, routePath);
                
                if (route !== '/') {
                    fs.mkdirSync(outPath, { recursive: true });
                    fs.writeFileSync(path.join(outPath, 'index.html'), html);
                } else {
                    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
                }
                console.log(`✅ Saved ${routePath}/index.html`);
            }
        } catch (e) {
            console.error('Error during prerendering:', e);
            if (process.env.VERCEL) {
                console.warn('⚠️ Prerendering skipped on Vercel. Using client-side SPA fallback.');
                if (browser) {
                    try { await browser.close(); } catch (_) {}
                }
                server.close();
                process.exit(0);
            }
            process.exit(1);
        } finally {
            if (browser) await browser.close();
            server.close();
            console.log('✅ Prerendering completed!');
        }
    });
}

run();
