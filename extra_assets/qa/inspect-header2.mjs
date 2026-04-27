import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const data = await page.evaluate(() => {
  const right = document.querySelectorAll('header > div > div')[0]; // third div containing call/book/hamburger
  return Array.from(right.children).map(c => {
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    return {
      tag: c.tagName.toLowerCase(),
      class: c.className,
      display: cs.display,
      width: Math.round(r.width),
      text: (c.textContent || '').trim().slice(0, 40),
    };
  });
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
