import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
});
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const offenders = await page.evaluate(() => {
  const VW = document.documentElement.clientWidth;
  const all = document.querySelectorAll('*');
  const out = [];
  for (const el of all) {
    const rect = el.getBoundingClientRect();
    if (rect.right > VW + 0.5) {
      // skip if any ancestor is `overflow: hidden` AND the element is fully outside the ancestor's clip box
      // simple heuristic: report only if the element isn't inside an `overflow:hidden` clip
      let clipped = false;
      let p = el.parentElement;
      while (p) {
        const s = getComputedStyle(p);
        if ((s.overflow === 'hidden' || s.overflowX === 'hidden') && p.getBoundingClientRect().right <= VW + 0.5) {
          clipped = true;
          break;
        }
        p = p.parentElement;
      }
      if (clipped) continue;
      const path = [];
      let n = el;
      while (n && n !== document.body && path.length < 6) {
        const cls = (n.className && typeof n.className === 'string') ? '.' + n.className.split(/\s+/).filter(Boolean).slice(0, 2).join('.') : '';
        const id = n.id ? '#' + n.id : '';
        path.unshift(`${n.tagName.toLowerCase()}${id}${cls}`);
        n = n.parentElement;
      }
      out.push({
        path: path.join(' > '),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
        text: (el.textContent || '').trim().slice(0, 60),
      });
    }
  }
  return { vw: VW, count: out.length, offenders: out.slice(0, 20) };
});

console.log(JSON.stringify(offenders, null, 2));
await browser.close();
