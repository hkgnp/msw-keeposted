import React from 'react';
import Post from '../components/Post';

export default class PostContent extends React.Component {
  state = {
    posts: [
      {
        _id: 0,
        title: 'Title 123',
        category: 'Category 123',
        description: 'Description 123',
        location: 310098,
      },
      {
        _id: 1,
        title: 'Title ABC',
        category: 'Category ABC',
        description: 'Description ABC',
        location: 119074,
      },
      {
        _id: 2,
        title: 'Title John Smith',
        category: 'Category Smith',
        description: 'Description Smith',
        location: 650626,
      },
    ],
  };

  renderPosts = () => {
    return this.state.posts.map((p) => (
      <Post
        key={p._id}
        title={p.title}
        category={p.category}
        description={p.description}
        location={p.location}
      />
    ));
  };

  render() {
    return <React.Fragment>{this.renderPosts()}</React.Fragment>;
  }
}
