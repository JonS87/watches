import React, { useState } from 'react';
import { ClockForm } from './components/ClockForm.tsx';
import { ClockList } from './components/ClockList.tsx';
import { ClockModel } from './types/ClockModel';

const App: React.FC = () => {
  const [clocks, setClocks] = useState<ClockModel[]>([]);

  const addClock = (clock: ClockModel) => {
    setClocks([...clocks, clock]);
  };

  const removeClock = (id: number) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  };

  return (
    <>
      <ClockForm onAdd={addClock} />
      <ClockList clocks={clocks} onRemove={removeClock} />
    </>
  );
};

export default App;
