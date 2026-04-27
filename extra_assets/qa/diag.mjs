import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text()); });
try {
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(3000);
} catch(e) {
  console.log('GOTO ERR:', e.message);
}
console.log('errors:', errs.length);
errs.slice(0, 10).forEach(e => console.log('  -', e.slice(0, 250)));
await browser.close();
