import React from 'react';
import { Col } from 'reactstrap';

export default class About extends React.Component {
  componentDidMount = () => {
    document.title = 'msw keeposted: About This App';
  };

  render() {
    return (
      <Col>
        <h1>About This App</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          quasi sunt consectetur possimus explicabo placeat deserunt repudiandae
          provident illum sequi, laboriosam cumque temporibus facere qui ex
          voluptates aliquid fuga obcaecati?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          quasi sunt consectetur possimus explicabo placeat deserunt repudiandae
          provident illum sequi, laboriosam cumque temporibus facere qui ex
          voluptates aliquid fuga obcaecati?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          quasi sunt consectetur possimus explicabo placeat deserunt repudiandae
          provident illum sequi, laboriosam cumque temporibus facere qui ex
          voluptates aliquid fuga obcaecati?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          quasi sunt consectetur possimus explicabo placeat deserunt repudiandae
          provident illum sequi, laboriosam cumque temporibus facere qui ex
          voluptates aliquid fuga obcaecati?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          quasi sunt consectetur possimus explicabo placeat deserunt repudiandae
          provident illum sequi, laboriosam cumque temporibus facere qui ex
          voluptates aliquid fuga obcaecati?
        </p>
      </Col>
    );
  }
}
