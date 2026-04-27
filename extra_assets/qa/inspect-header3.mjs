import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const data = await page.evaluate(() => {
  const headerInner = document.querySelector('header > div');
  return Array.from(headerInner.children).map(c => {
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    return { class: c.className.slice(0, 70), display: cs.display, width: Math.round(r.width), text: c.textContent.trim().slice(0, 60) };
  });
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
