export type DeckCard = {
  kind: "deck";
  n: string;
  id: "ppt1" | "ppt3";
  title: string;
  type: string;
  slideCount: number;
  cover: string;
  slides: string[];
};

export const DECKS: DeckCard[] = [
  {
    kind: "deck",
    n: "01",
    id: "ppt1",
    title: "Workplace Guidance",
    type: "Presentation Deck",
    slideCount: 8,
    cover: "/works/corporate/ppt1/1.jpg",
    slides: Array.from({ length: 8 }, (_, i) => `/works/corporate/ppt1/${i + 1}.jpg`),
  },
  {
    kind: "deck",
    n: "02",
    id: "ppt3",
    title: "Corporate Slides",
    type: "Presentation Deck",
    slideCount: 20,
    cover: "/works/corporate/ppt3/slide1.jpg",
    slides: Array.from({ length: 20 }, (_, i) => `/works/corporate/ppt3/slide${i + 1}.jpg`),
  },
];
