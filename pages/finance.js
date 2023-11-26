import React, { useState } from 'react';
import data from '../data/data.json'; // Import the JSON data
import Question from '@/components/Question';

export default function Finance() {
  const [i, setI] = useState(0);

  return (
    <Question question={data.Finance[i]} setI={setI} />
  );
}
