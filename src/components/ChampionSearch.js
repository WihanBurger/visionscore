import { useState } from "react";

function ChampionSearch({ allChampsList, version, onSelect, placeholder = "Search Champion..." }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredChamps = allChampsList.filter((c) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (champId) => {
    setIsOpen(false);
    setSearchTerm("");
    onSelect(champId);
  };

  return (
    <div className="search-dropdown-wrapper">
      <input 
        type="text" 
        className="champ-search-input" 
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {isOpen && (
        <ul className="champ-dropdown-list">
          {filteredChamps.map((c) => (
            <li key={c.id} onMouseDown={() => handleSelect(c.id)}>
              <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.image.full}`} alt={c.name} />
              {c.name}
            </li>
          ))}
          {filteredChamps.length === 0 && <li className="no-results">No champions found</li>}
        </ul>
      )}
    </div>
  );
}

export default ChampionSearch;