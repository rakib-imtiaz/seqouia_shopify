import { chromium } from 'playwright';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.evaluate(() => document.getElementById('svc-rentals').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(2500); // let waterline + best-value rotator settle
await page.screenshot({ path: `${OUT}/11-rentals-t1.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Wait for next pricing highlight cycle
await page.waitForTimeout(4500);
await page.screenshot({ path: `${OUT}/11-rentals-t2.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

await page.waitForTimeout(4500);
await page.screenshot({ path: `${OUT}/11-rentals-t3.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

console.log('errors:', errs.length);
errs.slice(0, 5).forEach(e => console.log('  -', e.slice(0, 150)));
await browser.close();
