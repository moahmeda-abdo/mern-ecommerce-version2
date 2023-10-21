import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";

// A functional component for rendering a search box
export default function SearchBox() {
  // Get the navigation function from React Router
  const navigate = useNavigate();

  // Define a state variable to store the search query
  const [query, setQuery] = useState("");

  // Event handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the provided query
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <Form className="searchbox" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        />
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i> {/* Render a search icon */}
        </Button>
      </InputGroup>
    </Form>
  );
}
