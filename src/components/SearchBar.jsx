import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchBar() {
  return (
    <Form>
      <div className="custom-search">
        <InputGroup className="inner-search">
          <Form.Control
            className="search-input"
            type="search"
            placeholder="Search Champion"
            aria-label="Search"
          />
          <Button className="search-button">
            Search
          </Button>
        </InputGroup>
      </div>
    </Form>
  );
}

export default SearchBar;