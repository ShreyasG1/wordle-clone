import "./App.css";
import Grid from "./components/Grid";
import VirtualKeyboard from "./components/VirtualKeyboard";

function App() {
    return (
        <div className="wrapper">
            <Grid />
            <VirtualKeyboard />
        </div>
    );
}

export default App;
