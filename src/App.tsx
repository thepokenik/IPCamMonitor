import "./App.css";
import 'filepond/dist/filepond.min.css';

import Home from "./pages/Home/Home";

import WindowBar from "./components/layout/WindowBar/WindowBar";

function App() {
    return (
        <main className="h-screen p-4">
            <WindowBar />
            <Home />
        </main>
    );
}

export default App;
