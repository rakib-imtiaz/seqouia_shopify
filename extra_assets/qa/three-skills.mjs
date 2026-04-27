import { chromium } from 'playwright';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);

// Lakes — active spread w/ tilt
await page.evaluate(() => document.getElementById('lakes').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollBy(0, 700));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/12-lakes-3d.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
// Hover the main image to trigger tilt
const mainImg = await page.locator('#lakes img').first();
const box = await mainImg.boundingBox();
if (box) {
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.3);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/12-lakes-3d-hover.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
}

// Booking — package picker view transitions
await page.evaluate(() => document.getElementById('booking').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/13-booking-vt-pkg1.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
// Click second package to trigger transition
const pkg2 = await page.locator('#booking button').filter({ hasText: 'Family Fun' }).first();
if (await pkg2.count() > 0) {
  await pkg2.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/13-booking-vt-pkg2.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
}

// About — pillars motion-framer
await page.evaluate(() => document.getElementById('about').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollBy(0, 400));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/14-about-pillars.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Click via JS (Playwright .click() hangs on perpetually animating elements)
await page.evaluate(() => {
  const items = document.querySelectorAll('#about li');
  if (items[0]) items[0].click();
});
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/14-about-pillars-expanded.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });

// DOM proof — confirm each new component rendered
const proof = await page.evaluate(() => {
  return {
    lakeTilt: !!document.querySelector('#lakes [style*="transform-style"]'),
    lakeImg:  !!document.querySelector('#lakes img'),
    pkgPicker: !!document.querySelector('#booking button[style*="view-transition-name"]') ||
               !!document.querySelector('[style*="pkg-indicator"]') ||
               !!document.querySelector('#booking [data-vt-direction]'),
    pkgCount: document.querySelectorAll('#booking button:has(.numeral)').length,
    pillarReorder: document.querySelectorAll('#about li[draggable]').length,
    htmlVtDir: document.documentElement.dataset.vtDirection || null,
  };
});
console.log('DOM proof:', JSON.stringify(proof, null, 2));

await browser.close();
console.log('done');
