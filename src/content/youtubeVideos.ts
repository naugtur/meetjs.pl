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
  {
    id: '8-QdGOe_Pq8',
    title: 'Jak radzić sobie bez testerów manualnych w zespole? - Tomek Sochacki - meet.js #Poznań #10.2025 #61',
    description: 'Co zrobić, gdy w zespole lub całej organizacji brakuje testerów manualnych? Na podstawie własnych doświadczeń Tomek pokaże, jak efektywnie współpracować z deweloperami, UX designerami i biznesem, jakie narzędzia i metodyki stosować oraz jak minimalizować ryzyko błędów. Case study pozwoli uczestnikom zobaczyć zalety i wady różnych rozwiązań w praktyce.',
  },
  {
    id: 'EVEzJzkZfzI',
    title: 'Accessibility Driven Development (PL) – Adrian Romański - meet.js #Poznań #10.2025 #61',
    description: 'Brak podejścia accessibility-first prowadzi do długu technologicznego i obniżonej jakości UX. Podczas tej prezentacji prześledzimy historię dewelopera, który zbagatelizował dostępność na początku projektu, a następnie musiał przepisywać kod i cofać decyzje projektowe.',
  },
  {
    id: 'jqtVFeZyplA',
    title: 'meet.js Summit 2023 - Zbyszek Tenerowicz - Conference opening',
    description: 'A warm welcome to all participants and a big "Thank you!" to our sponsors from the Chief Officer of meet.js Poland - Zbyszek Tenerowicz.',
  },
];
