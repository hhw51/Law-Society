export interface LexiconEntry {
  term: string
  definition: string
  reference: string
  category: string
  contextNotes?: string
}

export const lexicon: LexiconEntry[] = [
  {
    term: "Inherent Worth",
    definition: "The idea that dignity is not earned but intrinsic to every human being regardless of status.",
    reference: "Beyleveld & Brownsword, 2001",
    category: "Foundational Principles",
    contextNotes: "Core to the Universal Declaration of Human Rights.",
  },
  {
    term: "Eudaimonia",
    definition:
      "A Greek word commonly translated as 'happiness' or 'flourishing', representing the highest human good.",
    reference: "Aristotle, Nicomachean Ethics",
    category: "Foundational Principles",
    contextNotes: "Often linked to the realization of human potential and dignity.",
  },
  {
    term: "Dignity Jurisprudence",
    definition:
      "A legal philosophy that places human dignity at the center of judicial interpretation and human rights law.",
    reference: "Aharon Barak, 2015",
    category: "Legal & Political Dimensions",
    contextNotes: "Key in modern constitutional law, particularly in Germany and South Africa.",
  },
  {
    term: "Social Dignity",
    definition: "The recognition and respect afforded to individuals within their community and social structures.",
    reference: "Margalit, 1996",
    category: "Social Dignity",
    contextNotes: "Focuses on the avoidance of humiliation by institutions.",
  },
  // Add more terms here as needed
]

export function getWordOfTheWeek(): LexiconEntry {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

  return lexicon[weekNumber % lexicon.length]
}
