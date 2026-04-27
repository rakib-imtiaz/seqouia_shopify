import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const data = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const headerInner = document.querySelector('header > div');
  const childData = Array.from(headerInner.children).map(c => {
    const cs = getComputedStyle(c);
    const r = c.getBoundingClientRect();
    return {
      tag: c.tagName.toLowerCase(),
      className: c.className,
      display: cs.display,
      width: Math.round(r.width),
      right: Math.round(r.right),
    };
  });
  return { vw, headerInnerWidth: headerInner.getBoundingClientRect().width, childData };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
