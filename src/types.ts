export type LetterBoxProps = {
    letter: string;
};

export type gridState = string[][];

export type setState<T> = React.Dispatch<React.SetStateAction<T>>;
export type useKeyCaptureProps = {
    grid: gridState;
    setGrid: setState<gridState>;
};
