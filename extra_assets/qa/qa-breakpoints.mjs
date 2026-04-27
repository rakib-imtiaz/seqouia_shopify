// Multi-breakpoint hero + navbar QA.
// Captures hero (above-the-fold) and a navbar-only crop at each breakpoint.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const URL = 'http://127.0.0.1:4173/';
const OUT = '/home/noman/freelancing workspace/RH_workspace/seqouia_shopify/builds/qa/screenshots-bp';

const BREAKPOINTS = [
  { name: '01-mobile-390',     width: 390,  height: 844, isMobile: true,  deviceScaleFactor: 2 },
  { name: '02-tablet-768',     width: 768,  height: 1024 },
  { name: '03-laptop-1024',    width: 1024, height: 768 },
  { name: '04-laptop-1280',    width: 1280, height: 800 },
  { name: '05-desktop-1440',   width: 1440, height: 900 },
  { name: '06-desktop-1920',   width: 1920, height: 1080 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const summary = [];

for (const bp of BREAKPOINTS) {
  const ctx = await browser.newContext({
    viewport: { width: bp.width, height: bp.height },
    deviceScaleFactor: bp.deviceScaleFactor || 1,
    isMobile: bp.isMobile || false,
    hasTouch: bp.isMobile || false,
    userAgent: bp.isMobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile Safari/604.1'
      : undefined,
  });
  const page = await ctx.newPage();
  const failures = [];
  page.on('pageerror', err => failures.push({ kind: 'pageerror', text: err.message }));
  page.on('console', m => {
    if (m.type() === 'error') failures.push({ kind: 'console-error', text: m.text() });
  });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);

  // 1) Above-the-fold hero
  await page.screenshot({
    path: `${OUT}/${bp.name}-hero.png`,
    clip: { x: 0, y: 0, width: bp.width, height: bp.height },
  });

  // 2) Navbar only — crop top 96px
  await page.screenshot({
    path: `${OUT}/${bp.name}-navbar.png`,
    clip: { x: 0, y: 0, width: bp.width, height: 96 },
  });

  // 3) Diagnostics — BEFORE we open the menu, since opening flips the aria-label.
  const diag = await page.evaluate(() => {
    const html = document.documentElement;
    const h1 = document.querySelector('#top h1');
    const navbar = document.querySelector('header');
    const navbarRect = navbar ? navbar.getBoundingClientRect() : null;
    const cs = h1 ? getComputedStyle(h1) : null;
    const isVisible = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden';
    };
    // Count nav items in the inline <nav> only (not the slide-down menu)
    const inlineNav = document.querySelector('header > div > nav');
    const navItemsCount = inlineNav && getComputedStyle(inlineNav).display !== 'none'
      ? inlineNav.querySelectorAll('a').length
      : 0;
    return {
      docW: html.scrollWidth,
      viewW: html.clientWidth,
      overflow: html.scrollWidth - html.clientWidth,
      h1FontSize: cs?.fontSize,
      h1LineHeight: cs?.lineHeight,
      navbarHeight: navbarRect ? Math.round(navbarRect.height) : null,
      hamburgerVisible: isVisible('button[aria-label="Open menu"]'),
      navItemsVisible: navItemsCount,
      bookCtaVisible: isVisible('header a[href="#booking"]'),
      phoneFullVisible: isVisible('header a[href="tel:+12505557890"]'),
    };
  });

  // 4) Open mobile menu (after diag is captured)
  if (diag.hamburgerVisible) {
    await page.evaluate(() => document.querySelector('button[aria-label="Open menu"]').click());
    await page.waitForTimeout(600);
    await page.screenshot({
      path: `${OUT}/${bp.name}-navbar-open.png`,
      clip: { x: 0, y: 0, width: bp.width, height: Math.min(bp.height, 700) },
    });
  }

  summary.push({ ...bp, diag, failures });
  console.log(`[${bp.name}] overflow=${diag.overflow}px h1=${diag.h1FontSize} navItems=${diag.navItemsVisible} hamburger=${diag.hamburgerVisible} cta=${diag.bookCtaVisible} failures=${failures.length}`);

  await ctx.close();
}

await browser.close();

console.log('\n========== Summary table ==========');
console.log(
  ['breakpoint', 'overflow', 'h1Font', 'navItems', 'hamburger', 'CTA', 'failures'].join('\t')
);
for (const row of summary) {
  console.log(
    [
      `${row.width}×${row.height}`,
      row.diag.overflow + 'px',
      row.diag.h1FontSize,
      row.diag.navItemsVisible,
      row.diag.hamburgerVisible ? 'yes' : 'no',
      row.diag.bookCtaVisible ? 'yes' : 'no',
      row.failures.length,
    ].join('\t')
  );
}
console.log(`\nScreenshots: ${OUT}`);
