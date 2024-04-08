import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import ResponsiveAppBar from './components/AppBar/AppBar';
import PokemonList from "./pages/PokemonList";
import Sample from "./pages/Sample";
import StarredList from "./pages/StarredList";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/starred" element={<StarredList />} />
            <Route path="/sample" element={<Sample />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
