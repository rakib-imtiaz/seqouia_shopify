import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const URL = 'http://127.0.0.1:4173/';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile',  width: 390,  height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

// Sections we expect to render. Anchor IDs come from App.jsx.
const SECTIONS = [
  { id: 'top',      label: 'hero' },
  { id: 'why',      label: 'features' },
  { id: 'services', label: 'services' },
  { id: 'lakes',    label: 'lakes' },
  { id: 'booking',  label: 'booking' },
  { id: 'turo',     label: 'turo' },
  { id: 'about',    label: 'about' },
];

const report = {
  url: URL,
  startedAt: new Date().toISOString(),
  viewports: {},
};

async function ensureDir(p) { await mkdir(p, { recursive: true }); }

async function qaForViewport(browser, vp) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile || false,
    hasTouch: vp.hasTouch || false,
    userAgent: vp.isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  const consoleMsgs = [];
  const failedRequests = [];

  page.on('console', m => {
    if (m.type() === 'error' || m.type() === 'warning') {
      consoleMsgs.push({ type: m.type(), text: m.text() });
    }
  });
  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      failedRequests.push({ url: resp.url(), status: resp.status() });
    }
  });

  console.log(`\n=== ${vp.name} ${vp.width}x${vp.height} ===`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500); // let motion settle

  const dir = `${OUT}/${vp.name}`;
  await ensureDir(dir);

  // Full page screenshot
  await page.screenshot({ path: `${dir}/00-full-page.png`, fullPage: true });

  // Horizontal overflow check
  const overflow = await page.evaluate(() => {
    const html = document.documentElement;
    return {
      docW: html.scrollWidth,
      viewW: html.clientWidth,
      overflow: html.scrollWidth - html.clientWidth,
    };
  });
  console.log('  doc width / viewport / overflow:', overflow);

  // Per-section screenshots
  const sectionResults = [];
  for (const s of SECTIONS) {
    const found = await page.evaluate(id => !!document.getElementById(id), s.id);
    if (!found) {
      sectionResults.push({ ...s, present: false });
      continue;
    }
    await page.evaluate(id => {
      document.getElementById(id).scrollIntoView({ behavior: 'instant', block: 'start' });
    }, s.id);
    await page.waitForTimeout(900); // let scroll-triggered motion settle
    const fileName = `${dir}/${String(SECTIONS.indexOf(s) + 1).padStart(2, '0')}-${s.label}.png`;
    await page.screenshot({ path: fileName });
    const box = await page.evaluate(id => {
      const el = document.getElementById(id);
      const rect = el.getBoundingClientRect();
      return { offsetH: el.offsetHeight, scrollH: el.scrollHeight, top: rect.top };
    }, s.id);
    sectionResults.push({ ...s, present: true, ...box });
    console.log(`  ✓ ${s.label.padEnd(10)} h=${box.offsetH}px`);
  }

  // Interactivity tests
  // 1. Concierge accordion: hover each panel and screenshot
  if (vp.name === 'desktop') {
    console.log('  testing concierge accordion...');
    await page.evaluate(() => document.getElementById('services').scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(500);
    const accordion = await page.locator('button[aria-label^="Show "]').all();
    console.log(`    found ${accordion.length} accordion panels`);
    for (let i = 0; i < accordion.length; i++) {
      await accordion[i].hover();
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${dir}/10-concierge-panel-${i + 1}.png` });
    }
  }

  // 2. Lakes index strip: click each lake and screenshot
  if (vp.name === 'desktop') {
    console.log('  testing lakes index strip...');
    await page.evaluate(() => document.getElementById('lakes').scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(500);
    const buttons = await page.locator('#lakes .grid button').all();
    console.log(`    found ${buttons.length} lake buttons`);
    for (let i = 0; i < buttons.length; i++) {
      await buttons[i].click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${dir}/20-lake-${i + 1}.png` });
    }
  }

  // 3. Image load check
  const images = await page.evaluate(() => {
    return Array.from(document.images).map(img => ({
      src: img.currentSrc || img.src,
      complete: img.complete,
      natural: img.naturalWidth > 0,
    }));
  });
  const brokenImages = images.filter(i => !i.natural);

  await ctx.close();

  return {
    overflow,
    sections: sectionResults,
    consoleMsgs,
    failedRequests: failedRequests.filter(r => !r.url.includes('/__inspect') && !r.url.endsWith('favicon.ico')),
    imageCount: images.length,
    brokenImages,
  };
}

const browser = await chromium.launch({ headless: true });
try {
  for (const vp of VIEWPORTS) {
    report.viewports[vp.name] = await qaForViewport(browser, vp);
  }
} finally {
  await browser.close();
}

report.completedAt = new Date().toISOString();
await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));

// Console summary
console.log('\n========== QA SUMMARY ==========');
for (const [vp, r] of Object.entries(report.viewports)) {
  console.log(`\n[${vp}]`);
  console.log(`  Horizontal overflow: ${r.overflow.overflow}px`);
  console.log(`  Sections present: ${r.sections.filter(s => s.present).length}/${r.sections.length}`);
  console.log(`  Images: ${r.imageCount}, broken: ${r.brokenImages.length}`);
  console.log(`  Console errors/warnings: ${r.consoleMsgs.length}`);
  console.log(`  Failed requests: ${r.failedRequests.length}`);
  if (r.consoleMsgs.length) {
    r.consoleMsgs.slice(0, 5).forEach(m => console.log(`    - [${m.type}] ${m.text.slice(0, 200)}`));
  }
  if (r.failedRequests.length) {
    r.failedRequests.slice(0, 5).forEach(f => console.log(`    - ${f.status || f.failure}: ${f.url}`));
  }
  if (r.brokenImages.length) {
    r.brokenImages.slice(0, 5).forEach(i => console.log(`    - broken: ${i.src}`));
  }
}
console.log(`\nScreenshots: ${OUT}`);
console.log(`Report:      ${OUT}/report.json`);
