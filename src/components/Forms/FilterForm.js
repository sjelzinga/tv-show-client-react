import React from "react";
import SearchField from "./SearchField";
import SearchGenre from "./SearchGenre";
import "./FilterForm.css";

const FilterForm = () => {
  return (
    <div className="filter-form">
      <div className="search-field-wrapper">
        <label style={{ fontWeight: 700 }}>Search Tv Show</label>
        <SearchField />
      </div>
      <div className="search-dropdown-wrapper">
        <label style={{ fontWeight: 700 }}>Genre</label>
        <SearchGenre />
      </div>
    </div>
  );
};

export default FilterForm;
