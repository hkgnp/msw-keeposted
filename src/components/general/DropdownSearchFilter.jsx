import React from 'react';
import {
  FormGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default class DropdownSearchFilter extends React.Component {
  state = {
    dropdownOpenSearch: false,
    dropdownOpenFilter: false,
  };

  toggleSearch = () => {
    this.state.dropdownOpenSearch === false
      ? this.setState({ dropdownOpenSearch: true })
      : this.setState({ dropdownOpenSearch: false });
  };

  toggleFilter = () => {
    this.state.dropdownOpenFilter === false
      ? this.setState({ dropdownOpenFilter: true })
      : this.setState({ dropdownOpenFilter: false });
  };

  render() {
    const { dropdownOpenFilter } = this.state;

    return (
      <React.Fragment>
        <FormGroup>
          <Input
            type="select"
            name="searchIn"
            className="searchintitle"
            onChange={this.props.setStateSearchIn}
          >
            <option value="title">Title</option>
            <option value="description">Description</option>
            <option value="address">Address</option>
            <option value="postalcode">Postal Code</option>
          </Input>
        </FormGroup>
        <Dropdown
          name="filter"
          isOpen={dropdownOpenFilter}
          toggle={this.toggleFilter}
          className="ml-1"
        >
          <DropdownToggle caret style={{ backgroundColor: 'purple' }}>
            Filter
          </DropdownToggle>
          <DropdownMenu style={{ marginRight: '5rem' }}>
            <DropdownItem>Donations</DropdownItem>
            <DropdownItem>Long-term care</DropdownItem>
            <DropdownItem>Jobs</DropdownItem>
            <DropdownItem>Misc</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}
