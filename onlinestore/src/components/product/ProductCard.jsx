import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/Api";
import "./productcard.css";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard() {
  const { data, isLoading, isError } = useQuery("products", fetchProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    // Add event listener to detect clicks outside the suggestions box and search input
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    }

    // Bind the event listener
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  // Extract unique categories from data
  const allCategories = ["all", ...new Set(data.map((item) => item.category))];

  // Filter products based on selected category, price range, and search query
  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesPriceRange =
      selectedPriceRange === "all" ||
      (selectedPriceRange === "0-50" && item.price <= 50) ||
      (selectedPriceRange === "50-100" &&
        item.price > 50 &&
        item.price <= 100) ||
      (selectedPriceRange === "100-200" &&
        item.price > 100 &&
        item.price <= 200) ||
      (selectedPriceRange === "200+" && item.price > 200);
    const matchesSearchQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPriceRange && matchesSearchQuery;
  });

  // Get autosuggest suggestions based on the user's input
  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchQuery(input);

    // Filter the data to get suggestions
    const suggestionList = data.filter(
      (item) =>
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.description.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(suggestionList);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="container my-3">
      <div className="col-md-3 mb-3">
        <div className="filter">
          <div className="filter-body">
            {/* Search input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products"
            />
            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
            </select>

            {/* Price range filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option value="all">All PRICES</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200+">$200+</option>
            </select>

            <div ref={suggestionsRef} className="suggestions">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="suggestion"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.title}
                </div>
              ))}
            </div>

            {/* Reset button */}
            <button onClick={handleResetFilters}>Reset</button>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredData.map((item) => (
          <div key={item.id} className="col-md-3 mb-3">
            <div className="card">
              <div className="tag">
                <FontAwesomeIcon icon={faTag} />
                <span>Sample Tag</span>
              </div>
              <img
                className="card-img-top img-card"
                src={item.image}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text"> Price : ${item.price}</p>

                <Link
                  to={`/productdetail/${item.id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
