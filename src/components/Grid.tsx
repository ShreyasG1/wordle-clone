import { useState } from 'react';
import '../styles/Grid.css';
import LetterBox from './LetterBox';
import { gridState } from '../types';
import useKeyCapture from '../hooks/useKeyCapture';

const Grid = () => {
  const [grid, setGrid] = useState<gridState>(
    new Array(6).fill(0).map(() => new Array(5).fill(''))
  );
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>('');

  useKeyCapture({
    setGrid,
    setCurrentRow,
    setCurrentWord,
    grid,
    currentRow,
    currentWord,
  });

  return (
    <div className="word-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((letter, cellIndex) => (
            <LetterBox key={`box-${cellIndex + 1}`} letter={letter} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
