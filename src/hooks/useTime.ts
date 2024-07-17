import { useEffect, useState } from 'react';

import { leadingZeroesNumber } from '@/utils/leadingZeroesNumber';

interface ReturnDate {
  time: string;
  date: string;
  wish: string;
  hour: string;
  minute: string;
}

export const useTime = (offsetUTC: number = 7): ReturnDate => {
  const locale = 'en';
  const today = new Date();
  const utc = today.getTime() + today.getTimezoneOffset() * 60000;
  const todayUtc = new Date(utc + 3600000 * offsetUTC);

  const day = todayUtc.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${todayUtc.getDate()} ${todayUtc.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const hour = todayUtc.getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

  const time = todayUtc.toLocaleTimeString(locale, {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  // const [timer, setTimer] = useState(
  //   todayUtc.toLocaleTimeString(locale, {
  //     hour: 'numeric',
  //     hour12: true,
  //     minute: 'numeric',
  //   }),
  // );

  // useEffect(() => {
  //   const watchDog = setInterval(() => {
  //     setTimer(
  //       new Date().toLocaleTimeString(locale, {
  //         hour: 'numeric',
  //         hour12: true,
  //         minute: 'numeric',
  //       }),
  //     );
  //   }, 1000);

  //   return () => {
  //     clearInterval(watchDog);
  //   };
  // }, []);

  const [dHour, setDHour] = useState(todayUtc.getHours());
  const [dMinute, setDMinute] = useState(todayUtc.getMinutes());

  useEffect(() => {
    const watchDog = setInterval(() => {
      const d = new Date();
      const nutc = d.getTime() + d.getTimezoneOffset() * 60000;
      const nd = new Date(nutc + 3600000 * offsetUTC);

      setDHour(nd.getHours());
      setDMinute(nd.getMinutes());
    }, 1000);

    return () => {
      clearInterval(watchDog);
    };
  }, [offsetUTC]);

  return {
    date,
    time,
    wish,
    hour: leadingZeroesNumber(dHour),
    minute: leadingZeroesNumber(dMinute),
  };
};
