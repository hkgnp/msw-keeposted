import React from 'react';
import { Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = (props) => {
  return (
    <React.Fragment>
      <Input
        onChange={props.handleSearchString}
        type="text"
        name="searchTerm"
        placeholder="Search for a resource ..."
        value={props.searchTerm}
      />
    </React.Fragment>
  );
};

export default SearchBar;
