# Bluesky Integration Setup Guide

## What This Does

**Searches ALL public posts with #meetjs from ANYONE on Bluesky** - not just from your account!

The authentication is only needed because Bluesky requires you to be logged in to use their search API. You can use any Bluesky account (personal, company, or create a new one just for this).

## Quick Setup (5 minutes)

### Step 1: Create an App Password

1. Go to https://bsky.app/settings/app-passwords
2. Click **"Add App Password"**
3. Give it a name (e.g., "meetjs.pl website")
4. Click **"Create App Password"**
5. **Copy the password immediately** (you won't be able to see it again)

### Step 2: Add Credentials to Environment

Add these to your `.env.local` file:

```bash
BLUESKY_HANDLE=your.handle.bsky.social
BLUESKY_APP_PASSWORD=your-app-password-here
```

**Example:**
```bash
BLUESKY_HANDLE=meetjs.bsky.social
BLUESKY_APP_PASSWORD=abcd-1234-efgh-5678
```

### Step 3: Restart the Development Server

```bash
pnpm dev
```

That's it! Bluesky posts will now appear in the social feed.

## How It Works

- Uses the official `@atproto/api` SDK
- Authenticates with your app password on each request
- Searches for posts containing "meetjs"
- No token refresh needed (SDK handles it)

## Security Notes

- ✅ **App passwords are safe** - they're separate from your main password
- ✅ **Can be revoked anytime** at https://bsky.app/settings/app-passwords
- ✅ **Limited scope** - can only post/read, not change account settings
- ⚠️ **Keep `.env.local` private** - never commit it to git

## Troubleshooting

### No posts showing up?
- Check that your credentials are correct
- Verify there are actually posts with "meetjs" on Bluesky
- Check server logs for authentication errors

### Authentication errors?
- Make sure you copied the app password correctly
- Try creating a new app password
- Verify your handle is correct (include `.bsky.social`)

### Want to disable Bluesky?
Just remove or comment out the credentials in `.env.local`:
```bash
# BLUESKY_HANDLE=
# BLUESKY_APP_PASSWORD=
```

## API Limits

Bluesky doesn't publish specific rate limits, but they're generally generous for read operations. The social feed caches results for 5 minutes to minimize API calls.
