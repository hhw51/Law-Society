import { DIGNITY_LEXICON, LexiconEntry } from "@/components/lexiconData";

export function getWordOfTheWeek(): LexiconEntry {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const weekIndex = Math.floor(dayOfYear / 7);

  // Modulo ensures we loop back to start if the lexicon is shorter than 52 weeks
  return DIGNITY_LEXICON[weekIndex % DIGNITY_LEXICON.length];
}