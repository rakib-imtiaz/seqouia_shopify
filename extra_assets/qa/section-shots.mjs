// Capture features + turo sections at desktop (with hover state on a feature card)
import { chromium } from 'playwright';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// Features — full section
await page.evaluate(() => document.getElementById('why').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/07-features-desktop.png` });

// Features — hover the 3rd card
await page.evaluate(() => {
  const cards = document.querySelectorAll('#why article');
  if (cards[2]) {
    const rect = cards[2].getBoundingClientRect();
    const evt = new MouseEvent('mouseenter', { bubbles: true, clientX: rect.left + 100, clientY: rect.top + 100 });
    cards[2].dispatchEvent(evt);
  }
});
const card = await page.locator('#why article').nth(2);
await card.hover();
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/07-features-hover.png` });

// Turo
await page.evaluate(() => document.getElementById('turo').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/08-turo-desktop.png` });

// Mobile features
await ctx.close();
const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
const page2 = await ctx2.newPage();
await page2.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page2.evaluate(() => document.getElementById('why').scrollIntoView({ block: 'start' }));
await page2.waitForTimeout(1000);
await page2.screenshot({ path: `${OUT}/07-features-mobile.png`, fullPage: false });
await page2.evaluate(() => document.getElementById('turo').scrollIntoView({ block: 'start' }));
await page2.waitForTimeout(1500);
await page2.screenshot({ path: `${OUT}/08-turo-mobile.png`, fullPage: false });

await browser.close();
console.log('Captured features + turo screenshots');
