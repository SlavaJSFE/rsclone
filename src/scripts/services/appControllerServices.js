import { changeLocal } from '../constants/language';

const services = {
  setLanguage() {
    const language = localStorage.getItem('lang');
    if (!language) {
      localStorage.setItem('lang', JSON.stringify('ru'));
      changeLocal('ru');
    } else {
      const lang = JSON.parse(language);
      changeLocal(lang);
    }
  },

  changeLanguage(lang) {
    localStorage.setItem('lang', JSON.stringify(lang));
  },
};

export default services;
