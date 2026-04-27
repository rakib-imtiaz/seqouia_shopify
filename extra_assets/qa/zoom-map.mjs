import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.getElementById('lakes').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
// scroll down a bit so the map is in full view
await page.evaluate(() => window.scrollBy(0, 200));
await page.waitForTimeout(800);
const map = await page.locator('figure').first();
await map.screenshot({ path: '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp/09b-region-map-zoom.png' });

// hover on a marker
const marker = await page.locator('button[aria-label*="Lake"]').nth(1);
if (await marker.count() > 0) {
  await marker.hover();
  await page.waitForTimeout(600);
  await map.screenshot({ path: '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp/09c-region-map-hover.png' });
}
await browser.close();
console.log('done');
