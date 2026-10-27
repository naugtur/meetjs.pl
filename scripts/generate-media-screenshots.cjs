#!/usr/bin/env node

/**
 * Script to automatically generate screenshots for media items
 * Usage: node scripts/generate-media-screenshots.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Import media items (we'll read the file and parse it)
const mediaItemsPath = path.join(__dirname, '../src/content/mediaItems.ts');
const mediaItemsContent = fs.readFileSync(mediaItemsPath, 'utf8');

// Extract URLs from the mediaItems array
const urlMatches = mediaItemsContent.matchAll(/url:\s*['"]([^'"]+)['"]/g);
const urls = Array.from(urlMatches).map((match) => match[1]);

// Extract IDs for filenames
const idMatches = mediaItemsContent.matchAll(/id:\s*['"]([^'"]+)['"]/g);
const ids = Array.from(idMatches).map((match) => match[1]);

const screenshotsDir = path.join(__dirname, '../public/media/screenshots');

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  console.log('✅ Created screenshots directory');
}

async function generateScreenshots() {
  console.log('🚀 Starting screenshot generation...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const id = ids[i];
    const filename = `${id}.jpg`;
    const filepath = path.join(screenshotsDir, filename);

    try {
      console.log(`📸 Capturing: ${url}`);

      const page = await browser.newPage();

      // Set viewport for consistent screenshots
      await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 1,
      });

      // Navigate to the page
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait a bit for any animations or lazy-loaded content
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Take screenshot
      await page.screenshot({
        path: filepath,
        type: 'jpeg',
        quality: 85,
        fullPage: false, // Only capture viewport
      });

      console.log(`   ✅ Saved: /media/screenshots/${filename}\n`);

      await page.close();
    } catch (error) {
      console.error(`   ❌ Failed to capture ${url}:`, error.message, '\n');
    }
  }

  await browser.close();

  console.log('✨ Screenshot generation complete!\n');
  console.log('📝 Next steps:');
  console.log('1. Check the screenshots in public/media/screenshots/');
  console.log('2. Update mediaItems.ts to add thumbnail paths:');
  console.log("   thumbnail: '/media/screenshots/[id].jpg'\n");
}

// Run the script
generateScreenshots().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});
