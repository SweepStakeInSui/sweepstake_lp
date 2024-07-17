import { useEffect, useState } from 'react';

import Flex from '@/components/Flex';
import { Typography } from '@/components/Typography';
import { useTime } from '@/hooks/useTime';

export default function Time() {
  const { date, hour, minute } = useTime();
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setTick((preTick) => !preTick);
      }, 500);

      return () => clearInterval(intervalId);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <Flex>
        <Typography variant="description">HCMC - {hour}</Typography>
        <Typography variant="description">
          {tick ? <span>:</span> : <span>&nbsp;</span>}
        </Typography>
        <Typography variant="description">{minute}</Typography>
      </Flex>
      <Typography variant="description">{date}</Typography>
    </div>
  );
}
