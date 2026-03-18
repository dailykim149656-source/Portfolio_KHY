export type Locale = 'en' | 'ko';

export interface LocalizedText {
  en: string;
  ko?: string;
}

export interface LocalizedList {
  en: string[];
  ko?: string[];
}

export const DEFAULT_LOCALE: Locale = 'en';

export function resolveLocalizedText(value: LocalizedText, locale: Locale = DEFAULT_LOCALE) {
  return value[locale] ?? value.en;
}

export function resolveLocalizedList(value: LocalizedList, locale: Locale = DEFAULT_LOCALE) {
  return value[locale] ?? value.en;
}
