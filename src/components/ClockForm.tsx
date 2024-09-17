import React, { useState } from 'react';
import { ClockModel } from '../types/ClockModel';
import styles from './Clock.module.css';

interface ClockFormProps {
  onAdd: (clock: ClockModel) => void;
}

export const ClockForm: React.FC<ClockFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [timezoneOffset, setTimezoneOffset] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const localOffset = -new Date().getTimezoneOffset() / 60;
    const adjustedOffset = timezoneOffset - localOffset;

    if (name ) {
      onAdd({ id: Date.now(), name, timezoneOffset: adjustedOffset });
      setName('');
      setTimezoneOffset(0);
    }
  };

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <div className={styles['form-block']}>
        <label htmlFor="name">Название</label>
        <input
          id='name'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles['form-block']}>
        <label htmlFor="zone">Временная зона</label>
        <input
          id='zone'
          type="number"
          value={timezoneOffset}
          onChange={(e) => {
            setTimezoneOffset(Number(e.target.value))
          }}
          required
        />
      </div>
      <div className={styles['submit-container']}>
        <button className={styles['submit']} type="submit">Добавить</button>
      </div>
    </form>
  );
};
