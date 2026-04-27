// Capture the hero at multiple time-offsets so the cycling stat shows
// different values, and the Turo ticker is at different scroll positions.
import { chromium } from 'playwright';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
// Hero at t=2s — first cycle stat showing
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/10-hero-t2s.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
// At t=7s — should be on second stat
await page.waitForTimeout(5000);
await page.screenshot({ path: `${OUT}/10-hero-t7s.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
// At t=13s — third stat
await page.waitForTimeout(6000);
await page.screenshot({ path: `${OUT}/10-hero-t13s.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Ticker bbox (no element.screenshot — animation makes it "not stable")
const tickerBox = await page.evaluate(() => {
  const el = document.querySelector('.turo-ticker-track')?.parentElement;
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
if (tickerBox && tickerBox.w > 0) {
  await page.screenshot({
    path: `${OUT}/10-turo-ticker.png`,
    clip: { x: tickerBox.x, y: tickerBox.y, width: tickerBox.w, height: tickerBox.h },
  });
}

await browser.close();
console.log('captured');
