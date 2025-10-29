# Social Feed Setup Guide

The Community Buzz section on the homepage displays posts with the #meetjs hashtag from multiple social media platforms.

## Supported Platforms

### 1. Mastodon ✅ (Active by Default)
- **Status**: Always enabled, no API key required
- **Cost**: Free
- **Setup**: None needed
- Fetches from multiple instances: mastodon.social, fosstodon.org, mas.to

### 2. Bluesky ✅ (Active by Default)
- **Status**: Always enabled, no API key required
- **Cost**: Free
- **Setup**: None needed
- Uses public Bluesky API for hashtag search
- Growing platform with active developer community

### 3. Twitter/X ⚠️ (Optional - Requires API Key)
- **Status**: Disabled until API key is added
- **Cost**: Free tier available (10,000 tweets/month)
- **Setup Required**: Yes

#### How to Enable Twitter/X:

1. **Create a Twitter Developer Account**
   - Go to https://developer.twitter.com/
   - Sign up for a developer account
   - Create a new app

2. **Get Your Bearer Token**
   - In your app dashboard, go to "Keys and tokens"
   - Generate a Bearer Token
   - Copy the token (you won't be able to see it again)

3. **Add to Environment Variables**
   ```bash
   # In your .env.local file
   TWITTER_BEARER_TOKEN=your_bearer_token_here
   ```

4. **Restart the Development Server**
   ```bash
   pnpm dev
   ```

#### Twitter API Limits (Free Tier):
- 10,000 tweets per month
- 450 requests per 15-minute window
- Search tweets from the last 7 days

### 4. LinkedIn ⚠️ (Optional - Requires OAuth)
- **Status**: Disabled until API token is added
- **Cost**: Free but requires approval
- **Setup Required**: Yes (more complex)

#### How to Enable LinkedIn:

1. **Create a LinkedIn App**
   - Go to https://www.linkedin.com/developers/
   - Create a new app
   - Request access to the required APIs

2. **OAuth Setup**
   - LinkedIn requires OAuth 2.0 authentication
   - You'll need to implement a token refresh mechanism
   - More complex than Twitter/Mastodon

3. **Add to Environment Variables**
   ```bash
   # In your .env.local file
   LINKEDIN_ACCESS_TOKEN=your_access_token_here
   ```

**Note**: LinkedIn doesn't have a public hashtag search API. You would need to:
- Fetch posts from your company page, OR
- Use LinkedIn's Share API with proper permissions

## Current Implementation

The social feed currently works with:
- ✅ **Mastodon** - Active and working
- ✅ **Bluesky** - Active and working
- ⏳ **Twitter/X** - Placeholder ready, needs API key
- ⏳ **LinkedIn** - Placeholder ready, needs OAuth setup

## Testing

To test the social feed:

1. **Without API Keys** (Mastodon only):
   ```bash
   pnpm dev
   # Visit http://localhost:3000
   # You'll see posts from Mastodon
   ```

2. **With Twitter API Key**:
   ```bash
   # Add TWITTER_BEARER_TOKEN to .env.local
   pnpm dev
   # You'll see posts from both Mastodon and Twitter
   ```

## Troubleshooting

### No Posts Showing
- Check if Mastodon instances are accessible
- Verify there are recent #meetjs posts on Mastodon
- Check browser console for errors

### Twitter Posts Not Showing
- Verify `TWITTER_BEARER_TOKEN` is set in `.env.local`
- Check if the token is valid
- Ensure you haven't exceeded rate limits
- Check server logs for API errors

### Images Not Loading
- Some Mastodon instances may have CORS restrictions
- Images are loaded with lazy loading and error handling
- Broken images are automatically hidden

## Code Structure

```
src/
├── lib/
│   └── mastodon.ts          # Social feed API integration
├── components/
│   └── SocialFeed.tsx       # Social feed UI component
├── types/
│   └── social.ts            # TypeScript types
└── app/
    └── page.tsx             # Homepage integration
```

## Future Enhancements

Potential improvements:
- Add Bluesky support (no API key needed)
- Add Instagram support (requires API key)
- Implement caching layer for better performance
- Add admin panel to manage which platforms are active
- Add fallback content when no posts are available

## Support

For questions or issues:
- Check the code comments in `src/lib/mastodon.ts`
- Review the TypeScript types in `src/types/social.ts`
- Contact the development team
