import { useEffect, useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { gridState } from "./types";
import useKeyCapture from "./hooks/useKeyCapture";
import { getStoredGrid } from "./common/utils";

function App() {
    const [grid, setGrid] = useState<gridState>(
        new Array(6).fill(0).map(() =>
            new Array(5).fill({
                isAbsent: false,
                isInRightPosition: false,
                isInWrongPosition: false,
                letter: "",
            })
        )
    );
    const { pressedKeys } = useKeyCapture({
        setGrid,
        grid,
    });

    useEffect(() => {
        const setGridStateFromStorage = async () => {
            const grid: gridState = await getStoredGrid();
            if (grid) setGrid(grid);
        };
        setGridStateFromStorage();
    }, []);

    return (
        <div className="wrapper">
            <Grid grid={grid} pressedKeys={pressedKeys} />
            <VirtualKeyboard pressedKeys={pressedKeys} />
        </div>
    );
}

export default App;
