import "../styles/LetterBox.css";
import { LetterBoxProps } from "../types";

const LetterBox = ({ letter }: LetterBoxProps) => {
    return <div className="letter-box">{letter}</div>;
};

export default LetterBox;
