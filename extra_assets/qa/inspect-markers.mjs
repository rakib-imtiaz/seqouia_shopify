import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.getElementById('lakes').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
const data = await page.evaluate(() => {
  const fig = document.querySelector('#lakes figure');
  if (!fig) return { error: 'figure not found' };
  const buttons = fig.querySelectorAll('button[aria-label*="Lake"]');
  const figRect = fig.getBoundingClientRect();
  const img = fig.querySelector('img');
  const imgRect = img.getBoundingClientRect();
  return {
    figureSize: { w: Math.round(figRect.width), h: Math.round(figRect.height) },
    imgSize: { w: Math.round(imgRect.width), h: Math.round(imgRect.height), naturalW: img.naturalWidth, naturalH: img.naturalHeight },
    markerCount: buttons.length,
    markers: Array.from(buttons).map(b => {
      const r = b.getBoundingClientRect();
      const cs = getComputedStyle(b);
      return {
        label: b.getAttribute('aria-label'),
        rect: { x: Math.round(r.x - figRect.x), y: Math.round(r.y - figRect.y), w: Math.round(r.width), h: Math.round(r.height) },
        display: cs.display,
        visibility: cs.visibility,
        zIndex: cs.zIndex,
      };
    }),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
