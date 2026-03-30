import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChampionSearch.css";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [championsList, setChampionsList] = useState([]);
  const [version, setVersion] = useState("14.4.1");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json",
        );
        const versions = await versionRes.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);

        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`,
        );
        const data = await res.json();

        const champsArray = Object.values(data.data).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        setChampionsList(champsArray);
      } catch (err) {
        console.error("Error fetching champion list:", err);
      }
    };
    fetchChampions();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    const regex = new RegExp(`^${value}`, "i");
    const filtered = championsList.filter((champ) => regex.test(champ.name));
    setSuggestions(filtered);
  };

  const goToChampion = (champId) => {
    if (!champId) return;
    setIsOpen(false);
    navigate(`/champions/${champId}`);
    setSearch("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      goToChampion(suggestions[0].id);
    }
  };

  return (
    <div className="search-dropdown-wrapper">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <input
          type="text"
          className="champ-search-input"
          placeholder="Search Champion..."
          value={search}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          style={{ padding: "18px 30px", fontSize: "1.4rem" }}
        />
      </form>

      {isOpen && suggestions.length > 0 && (
        <ul className="champ-dropdown-list">
          {suggestions.map((c) => (
            <li key={c.id} onMouseDown={() => goToChampion(c.id)}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.image.full}`}
                alt={c.name}
              />
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
