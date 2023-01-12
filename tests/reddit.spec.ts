const { chromium } = require('playwright');
import { test } from '@playwright/test';

// Test function for navigating to the Reddit website
test('navigate to Reddit website', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.reddit.com/');

  await browser.close();
});

// Test function for searching for the "gaming" subreddit
test('search for "gaming" subreddit', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.reddit.com/');

  await page.fill('input[name="q"]', 'gaming');
  await page.click('button[type="submit"]');

  await browser.close();
});

// Test function for opening the "gaming" subreddit
test('open "gaming" subreddit', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.reddit.com/');

  await page.fill('input[name="q"]', 'gaming');
  await page.click('button[type="submit"]');
  await page.click('a[data-click-id="body"]');

  await browser.close();
});

// Test function for printing the title of the top post
test('print top post title', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.reddit.com/');

  await page.fill('input[name="q"]', 'gaming');
  await page.click('button[type="submit"]');
  await page.click('a[data-click-id="body"]');

  const topPostTitle = await page.$eval(
    '.s1ua9il2-0',
    (element) => element.innerText
  );
  console.log(topPostTitle);

  await browser.close();
});

test('log in', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.reddit.com/');

  await page.click('button[data-click-id="signin"]');
  await page.fill('input[name="username"]', 'priyatest123');
  await page.fill('input[name="password"]', 'Test12344@');
  await page.click('button[type="submit"]');

  await browser.close();
});

test('downvote or upvote second post', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.reddit.com/');

  await page.fill('input[name="q"]', 'gaming');
  await page.click('button[type="submit"]');
  await page.click('a[data-click-id="body"]');

  const secondPost = await page.$('.s1ua9il2-0:nth-of-type(2)');
  const upvoteButton = await secondPost.$('button[aria-label="upvote"]');
  const upvoteButtonClass = await upvoteButton.getAttribute('class');
  if (upvoteButtonClass.includes('s1y8gf4b-1')) {
    await upvoteButton.click();
  } else {
    const downvoteButton = await secondPost.$('button[aria-label="downvote"]');
    await downvoteButton.click();
  }

  await browser.close();
});
