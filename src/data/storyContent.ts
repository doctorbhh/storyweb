
export interface StorySection {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  background: string;
  character?: {
    name: string;
    image: string;
    position: 'left' | 'right' | 'center';
    description: string;
  };
  animation?: string;
}

export const storyContent: StorySection[] = [
  {
    id: "intro",
    title: "Eclipsed Hearts",
    subtitle: "日蝕の心 - Nisshoku no Kokoro",
    paragraphs: [
      "A Tale of Love, Fate, and Rebirth"
    ],
    background: "bg-eclipse-gradient",
    animation: "fade-in"
  },
  {
    id: "chapter1",
    title: "Chapter 1: The Meeting Before Time",
    subtitle: "",
    paragraphs: [],
    background: "bg-eclipse-dark bg-starry-sky",
    animation: "fade-in"
  },
  {
    id: "section1",
    title: "1. The Boy Who Dreamed",
    subtitle: "",
    paragraphs: [
      "Ren Kiryuu had always lived an ordinary life.",
      "From the outside, he was just another university student—quiet, reserved, never standing out in a crowd. His grades were average, his hobbies unremarkable. If someone were to describe him, they might say he was the kind of person you would forget after meeting once.",
      "But Ren held a secret.",
      "Every night, in the depths of his dreams, he saw her.",
      "A girl with hair like the midnight sky, her silhouette standing against the light of a crimson moon. He never saw her face, but he always woke up with a deep ache in his chest, as if he had lost something precious.",
      "These dreams had haunted him since childhood.",
      "His grandmother, the only family he had left, once told him that dreams were glimpses of past lives. But Ren had always laughed it off, thinking it was just an old woman's superstition.",
      "Yet, as he grew older, the dreams became more vivid—too vivid.",
      "And the worst part?",
      "Sometimes, when he was awake, he caught glimpses of her in the real world.",
      "A figure at the edge of his vision. A shadow disappearing around a corner. A name on the tip of his tongue, but one he could never quite remember.",
      "Then, one day, he saw her for real."
    ],
    background: "bg-eclipse-medium",
    character: {
      name: "Ren Kiryuu",
      image: "/boy.png", // You'll replace this with your own image
      position: "right",
      description: "A quiet university student haunted by mysterious dreams"
    },
    animation: "fade-in"
  },
  {
    id: "section2",
    title: "2. The Girl Who Waited",
    subtitle: "",
    paragraphs: [
      "Aoi Takamine had always felt out of place.",
      "She was beautiful in a quiet way—soft features, gray-blue eyes that reflected the sky on a rainy day. But there was always a distance in her gaze, as if her mind was somewhere else, lost in a memory she couldn't quite recall.",
      "She lived an orderly life, studying diligently, following the path expected of her. She was always polite, always smiling—but deep down, she felt hollow.",
      "Because something was missing.",
      "She didn't know what.",
      "She didn't know who.",
      "But she had felt the absence all her life, like a melody she had once known but forgotten.",
      "Then, on a golden autumn afternoon, she found herself in the library, flipping through an old art book.",
      "And that's when she felt it.",
      "A presence.",
      "Like someone was watching her.",
      "She turned her head.",
      "A boy stood at the other end of the library, frozen in place, staring at her with wide, disbelieving eyes.",
      "For a brief second, something passed between them. A spark of familiarity.",
      "Like she had seen him before.",
      "But before she could say anything, he turned and walked away."
    ],
    background: "bg-eclipse-light",
    character: {
      name: "Aoi Takamine",
      image: "/girl.png", // You'll replace this with your own image
      position: "left",
      description: "A beautiful student who feels incomplete, as if missing a part of herself"
    },
    animation: "fade-in"
  },
  {
    id: "section3",
    title: "3. The Sketches of the Past",
    subtitle: "",
    paragraphs: [
      "That night, Ren sat on his bed, flipping through his sketchbook.",
      "He didn't know why, but ever since he was young, he had been obsessed with drawing the same figure over and over again.",
      "A girl.",
      "Always standing beneath the moon.",
      "And now, for the first time, he had seen her in real life.",
      "\"Who is she?\"",
      "His fingers trembled as he picked up his pencil.",
      "The moment their eyes had met in the library, something inside him had cracked open.",
      "Memories—or something like them—had flashed through his mind.",
      "A flicker of long black hair caught in the wind. The echo of soft laughter. The warmth of a hand in his own.",
      "But these weren't memories from this life.",
      "Were they… from a dream?","Or from something else?"
    ],
    background: "bg-eclipse-medium",
    animation: "fade-in"
  },
  {
    id: "section4",
    title: "4. The Approaching Eclipse",
    subtitle: "",
    paragraphs: [
      "The news that evening was buzzing with excitement.",
      "\"A rare total solar eclipse will occur in just one week, visible across the entire country!\"",
      "\"This celestial event only happens once every 200 years. Scientists say it will last for exactly four minutes and sixteen seconds.\"",
      "Ren barely paid attention to the news.",
      "But somewhere in the back of his mind, a whisper stirred.",
      "Something about the eclipse… felt familiar.",
      "As if he had seen it before.",
      "As if it was waiting for him.",
      "To Be Continued in Chapter 2: The Shrine of the Eclipse"
    ],
    background: "bg-eclipse-dark bg-starry-sky",
    animation: "fade-in"
  }
];
