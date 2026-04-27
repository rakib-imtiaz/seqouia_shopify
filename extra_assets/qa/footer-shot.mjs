import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor || 1,
    isMobile: vp.isMobile || false,
  });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('footer').scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots/${vp.name}/30-footer.png` });
  await ctx.close();
  console.log(`Captured footer ${vp.name}`);
}
await browser.close();
