import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Idioma español

// Plugins necesarios
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Extender dayjs con los plugins
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

// Establecer idioma por defecto a español
dayjs.locale('es');

// Personalizar el locale 'es' para formatos más comunes
dayjs.updateLocale('es', {
  formats: {
    L: 'DD/MM/YYYY', // Formato corto (input, tablas, etc)
    LL: 'D [de] MMMM [de] YYYY', // Formato largo (visualmente atractivo)
  },
});

export default dayjs;
