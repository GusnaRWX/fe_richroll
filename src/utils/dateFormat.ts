import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import id from 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.locale({ ...id });
