import React from 'react';
import { Clock } from './Clock';
import { ClockModel } from '../types/ClockModel';
import styles from './Clock.module.css';

interface ClockListProps {
  clocks: ClockModel[];
  onRemove: (id: number) => void;
}

export const ClockList: React.FC<ClockListProps> = ({ clocks, onRemove }) => {
  return (
    <div className={styles['clock-containers']}>
      {clocks.map(clock => (
        <Clock key={clock.id} clock={clock} onRemove={onRemove} />
      ))}
    </div>
  );
};
