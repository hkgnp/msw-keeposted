import React from 'react';
import { Button } from 'reactstrap';
import '../../App.css';

export default class MoreDetails extends React.Component {
  render() {
    const { activeDetails, handleReset } = this.props;
    const title = activeDetails.querySelector('h5').innerHTML;
    const category = activeDetails.querySelector('h6').innerHTML;
    const description = activeDetails.querySelectorAll('p')[0].innerHTML;
    const address = activeDetails.querySelectorAll('p')[1].innerHTML;
    const postalCode = activeDetails.querySelectorAll('p')[2].innerHTML;

    return (
      <React.Fragment>
        <h1>{title}</h1>
        <p>{category}</p>
        <p>{description}</p>
        <p>{address}</p>
        <p>{postalCode}</p>
        <Button color="danger" onClick={handleReset}>
          Reset
        </Button>
      </React.Fragment>
    );
  }
}
