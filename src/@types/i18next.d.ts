import 'i18next'
import { resources, defaultNS } from 'src/i18n/i18n'

declare module "i18next" {
    // kế thừa( thêm vào type)
    interface CustomTypeOptions {
      defaultNS: typeof defaultNS;
      resources: typeof resources["vi"];
    }
  }