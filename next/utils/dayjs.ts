import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(require('dayjs/plugin/duration'));
dayjs.extend(require('dayjs/plugin/relativeTime'));

export default dayjs;
