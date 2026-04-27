import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp/sec';
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const sections = ['why', 'services', 'lakes', 'booking', 'turo', 'about'];
for (const id of sections) {
  await page.evaluate((sid) => document.getElementById(sid).scrollIntoView({ block: 'start' }), id);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${id}.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('overflow:', overflow, '| console errors:', errors.length);
if (errors.length) errors.slice(0, 5).forEach(e => console.log('  -', e.slice(0, 150)));
await browser.close();
