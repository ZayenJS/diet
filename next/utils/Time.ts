import dayjs from './dayjs';

export class Time {
  public static toHoursAndMinutes(totalMinutes: number) {
    if (totalMinutes < 0) {
      return '0min';
    }

    if (totalMinutes > 60 * 24) {
      return `${Math.floor(totalMinutes / (60 * 24))} days`;
    }

    const minutesAndHours = dayjs().startOf('day').add(totalMinutes, 'minutes');
    const minutes: string | number = minutesAndHours.format('mm');
    let hours: string | number = minutesAndHours.format('HH');

    if (hours.startsWith('0')) {
      hours = +hours;
    }

    if (!+hours && !+minutes) {
      return '0min';
    }

    if (!+hours) {
      return `${+minutes}min`;
    }

    if (minutes === '00') {
      return `${+hours}h`;
    }

    return `${+hours}h${minutes}min`;
  }
}
