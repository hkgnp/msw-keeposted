import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const DropdownSearchFilter = (props) => {
  return (
    <React.Fragment>
      <FormGroup>
        <Input
          type="select"
          name="searchIn"
          className="searchintitle"
          onChange={props.setStateSearchFilter}
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
          <option value="address">Address</option>
          <option value="postalcode">Postal Code</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Input
          type="select"
          name="setFilter"
          className="searchfilter"
          onChange={props.setFilter}
        >
          <option value="All">All</option>
          <option value="Jobs">Jobs</option>
          <option value="Long-term care">Long-term care</option>
          <option value="Donations">Donations</option>
          <option value="Misc">Misc</option>
        </Input>
      </FormGroup>
    </React.Fragment>
  );
};

export default DropdownSearchFilter;
