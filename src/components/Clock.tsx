import React, { useEffect, useState } from 'react';
import { ClockModel } from '../types/ClockModel';
import styles from './Clock.module.css';

interface ClockProps {
  clock: ClockModel;
  onRemove: (id: number) => void;
}

export const Clock: React.FC<ClockProps> = ({ clock, onRemove }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date(Date.now() + clock.timezoneOffset * 3600000));
    }, 1000);

    return () => clearInterval(interval);
  }, [clock.timezoneOffset]);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60 + seconds / 3600) * 360;
  const hourAngle = (hours / 12 + minutes / 720) * 360;

  return (
    <div className={styles['clock-container']}>
      <h2 className={styles['clock-name']} >{clock.name}</h2>
      <button className={styles['clock-delete']} onClick={() => onRemove(clock.id)}>×</button>
      <div className={styles['clock']}>
        <svg width="200" height="200">
          <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="2" fill="white" />

          <text x="100" y="35" textAnchor="middle" fontSize="16">12</text>
          <text x="175" y="105" textAnchor="middle" fontSize="16">3</text>
          <text x="100" y="175" textAnchor="middle" fontSize="16">6</text>
          <text x="25" y="105" textAnchor="middle" fontSize="16">9</text>

          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
            const angle = (h / 12) * 360;
            return (
              <line
                key={h}
                x1={100 + 80 * Math.cos((angle - 90) * (Math.PI / 180))}
                y1={100 + 80 * Math.sin((angle - 90) * (Math.PI / 180))}
                x2={100 + 90 * Math.cos((angle - 90) * (Math.PI / 180))}
                y2={100 + 90 * Math.sin((angle - 90) * (Math.PI / 180))}
                stroke="black"
                strokeWidth="3"
              />
            );
          })}

          {[1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24, 
            26, 27, 28, 29, 31, 32, 33, 34, 36, 37, 38, 39, 41, 42, 43, 44, 46, 47, 
            48, 49, 51, 52, 53, 54, 56, 57, 58, 59].map((m) => {
            const angle = (m / 60) * 360;
            return (
              <line
                key={m}
                x1={100 + 85 * Math.cos((angle - 90) * (Math.PI / 180))}
                y1={100 + 85 * Math.sin((angle - 90) * (Math.PI / 180))}
                x2={100 + 90 * Math.cos((angle - 90) * (Math.PI / 180))}
                y2={100 + 90 * Math.sin((angle - 90) * (Math.PI / 180))}
                stroke="black"
                strokeWidth="1"
              />
            );
          })}

          <line
            x1="100"
            y1="100"
            x2={100 + 60 * Math.cos((hourAngle - 90) * (Math.PI / 180))}
            y2={100 + 60 * Math.sin((hourAngle - 90) * (Math.PI / 180))}
            stroke="black"
            strokeWidth="6"
          />
          <line
            x1="100"
            y1="100"
            x2={100 + 80 * Math.cos((minuteAngle - 90) * (Math.PI / 180))}
            y2={100 + 80 * Math.sin((minuteAngle - 90) * (Math.PI / 180))}
            stroke="black"
            strokeWidth="4"
          />
          <line
            x1="100"
            y1="100"
            x2={100 + 90 * Math.cos((secondAngle - 90) * (Math.PI / 180))}
            y2={100 + 90 * Math.sin((secondAngle - 90) * (Math.PI / 180))}
            stroke="red"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};
