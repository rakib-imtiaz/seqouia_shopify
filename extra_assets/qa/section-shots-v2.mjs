import { chromium } from 'playwright';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// 1) New region map (top of Lakes section)
await page.evaluate(() => document.getElementById('lakes').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/09-region-map.png` });

// 2) Features hover (3rd card)
await page.evaluate(() => document.getElementById('why').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1000);
await page.locator('#why article').nth(2).hover();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/07b-features-hover-invert.png` });

// 3) Features hover (5th card — different ornament)
await page.locator('#why article').nth(4).hover();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/07c-features-hover-bottom.png` });

// 4) Add-ons section + hover state
await page.evaluate(() => {
  const sections = document.querySelectorAll('#services > div > div');
  // Scroll to bottom of services where add-ons are
  document.querySelector('#services').scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollBy(0, 2000));
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/08-addons-pre-hover.png` });

// Hover on the 2nd addon (JBL Speaker)
const addons = await page.locator('#services [class*="bg-ink"]').filter({ hasText: 'JBL' }).first();
if (await addons.count() > 0) {
  await addons.hover();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/08-addons-hover.png` });
}

await browser.close();
console.log('Captured');
