import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [championsList, setChampionsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion.json"
        );
        const data = await res.json();
        const keys = Object.keys(data.data);
        setChampionsList(keys);
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
    const filtered = championsList.filter((champ) => regex.test(champ));
    setSuggestions(filtered);
  };

  const goToChampion = (champ) => {
    if (!champ) return;
    navigate(`/champions/${champ}`);
    setSearch("");
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToChampion(search);
  };

  return (
    <div style={{ position: "relative" }}>
      <Form onSubmit={handleSubmit}>
        <div className="custom-search">
          <InputGroup className="inner-search">
            <Form.Control
              type="search"
              placeholder="Search Champion"
              value={search}
              onChange={handleChange}
            />
            <Button type="submit">Search</Button>
          </InputGroup>
        </div>
      </Form>

      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#012831",
            border: "2px solid #D4BB73",
            borderRadius: "10px",
            zIndex: 10,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((champ, idx) => (
            <div
              key={idx}
              onClick={() => goToChampion(champ)}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                color: "#D4BB73",
              }}
              onMouseOver={(e) =>
                (e.target.style.background = "rgba(212,187,115,0.2)")
              }
              onMouseOut={(e) => (e.target.style.background = "transparent")}
            >
              {champ}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;