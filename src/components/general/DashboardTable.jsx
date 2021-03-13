import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardTable = (props) => {
  const {
    key,
    title,
    categories,
    description,
    address1,
    address2,
    postalcode,
  } = props;

  return (
    <React.Fragment>
      <tr key={key}>
        <td>{title}</td>
        <td>{categories.join(', ')}</td>
        <td>{description}</td>
        <td>
          {address1} {address2}
        </td>
        <td>{postalcode}</td>
      </tr>
    </React.Fragment>
  );
};
export default DashboardTable;
