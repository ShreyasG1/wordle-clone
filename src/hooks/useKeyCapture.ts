import { useEffect } from 'react';
import { gridState } from '../types';

type setState<T> = React.Dispatch<React.SetStateAction<T>>;
type Props = {
  setGrid: setState<gridState>;
  setCurrentRow: setState<number>;
  setCurrentWord: setState<string>;
  currentWord: string;
  grid: gridState;
  currentRow: number;
};

const useKeyCapture = ({
  setGrid,
  setCurrentRow,
  setCurrentWord,
  currentWord,
  grid,
  currentRow,
}: Props) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const currentWordLength = currentWord.length;

      if (/^[a-zA-Z]$/.test(key) && currentWordLength < 5) {
        setGrid((prev) => {
          prev[currentRow][currentWordLength] = key.toUpperCase();
          return prev;
        });
        setCurrentWord((prev) => prev + key.toUpperCase());
      } else if (key === 'Backspace' && currentWordLength) {
        setGrid((prev) => {
          prev[currentRow][currentWordLength - 1] = '';
          return prev;
        });
        setCurrentWord((prev) => prev.slice(0, -1));
      } else if (key === 'Enter' && currentWordLength === 5 && currentRow < 5) {
        setGrid((prev) => {
          prev[currentRow] = currentWord.split('');
          return prev;
        });
        setCurrentWord('');
        setCurrentRow((prev) => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentRow, currentWord, grid, setCurrentRow, setCurrentWord, setGrid]);

  return {};
};

export default useKeyCapture;
