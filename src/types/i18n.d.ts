import "i18next";

// src/types/i18n.d.ts
import "i18next";
import translationTypes from '../translation/translation.json'

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof translationTypes;
    };
  }
}
