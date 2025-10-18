// YouTube Videos Configuration
// To add videos: Go to a YouTube video, copy the ID from the URL
// Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ -> ID is "dQw4w9WgXcQ"

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
}

// Add your latest video IDs here
export const featuredVideos: YouTubeVideo[] = [
  // Example - replace with actual video IDs:
  // {
  //   id: 'YOUR_VIDEO_ID_1',
  //   title: 'Talk Title',
  //   description: 'Brief description',
  // },
  // {
  //   id: 'YOUR_VIDEO_ID_2',
  //   title: 'Another Talk',
  //   description: 'Brief description',
  // },
  // {
  //   id: 'YOUR_VIDEO_ID_3',
  //   title: 'Workshop Recording',
  //   description: 'Brief description',
  // },
];
