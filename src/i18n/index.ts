export type Locale = 'en' | 'km';

const dictionaries = {
  en: {
    common: {
      appName: 'CamNextGen',
      startLearning: 'Start Learning',
      browseCourses: 'Browse Courses'
    }
  },
  km: {
    common: {
      appName: 'CamNextGen',
      startLearning: 'Start Learning',
      browseCourses: 'Browse Courses'
    }
  }
};

export const t = (locale: Locale, path: keyof typeof dictionaries['en']['common']) =>
  dictionaries[locale].common[path];
