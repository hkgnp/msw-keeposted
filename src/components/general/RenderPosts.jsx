import React from 'react';
import Post from '../views/Post';
import { Paginate } from '../general/ManagePagination';

const RenderPosts = (props) => {
  const allPosts = Paginate(props.posts, props.currentPage, props.pageSize);

  return allPosts.map((p) => (
    <Post
      key={p._id}
      title={p.title}
      category={p.category}
      description={p.description}
      location={p.location}
    />
  ));
};

export default RenderPosts;
