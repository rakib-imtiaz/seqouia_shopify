import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.getElementById('why').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(2000);
const data = await page.evaluate(() => {
  const h2 = document.querySelector('#why h2');
  const lines = h2 ? Array.from(h2.querySelectorAll(':scope > span')) : [];
  return {
    h2OuterHTML: h2 ? h2.outerHTML.slice(0, 500) : null,
    lines: lines.map(l => {
      const inner = l.firstElementChild;
      const cs = inner ? getComputedStyle(inner) : null;
      return {
        outerOverflow: getComputedStyle(l).overflow,
        innerTransform: cs?.transform,
        innerText: inner?.textContent?.slice(0, 80),
      };
    }),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
