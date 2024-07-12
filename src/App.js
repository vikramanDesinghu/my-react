import { useState } from "react";
import "./App.css";
import pokemon from "./pokemon.json";

function PokemonRow({ pokemon }) {
  return (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
    </tr>
  );
}
function App() {
  const [filter, setFilter] = useState("");
  return (
    <div
      className="App"
      style={{
        margin: "auto",
        width: 900,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon search</h1>
      <input
        type="text"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <table width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon
            .filter((p) => p.name.english.toLocaleLowerCase().includes(filter))
            .slice(0, 20)
            .map((p) => (
              <PokemonRow
                key={[p.id, p.name.english].join("")}
                pokemon={p}
              ></PokemonRow>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
