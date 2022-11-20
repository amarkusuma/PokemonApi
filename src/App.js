import logo from './logo.svg';
import './App.css';
import {PokemonList, PokemonDetail, PokemonMy} from './Pages';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route index element={<PokemonList />} />
          <Route path="pokemon-list" element={<PokemonList />} />
          <Route path="pokemon-detail/:name" element={<PokemonDetail />} />
          <Route path="pokemon-my" element={<PokemonMy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
