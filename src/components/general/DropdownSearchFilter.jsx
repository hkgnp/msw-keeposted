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
          onChange={props.setStateSearchIn}
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
          name="searchIn"
          className="searchfilter"
          onChange={props.setStateSearchIn}
        >
          <option>Filter</option>
          <option value="jobs">Jobs</option>
          <option value="longtermcare">Long-term care</option>
          <option value="donations">Donations</option>
          <option value="misc">Misc</option>
        </Input>
      </FormGroup>
    </React.Fragment>
  );
};

export default DropdownSearchFilter;
