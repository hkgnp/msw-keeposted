const Paginate = (posts, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  if (pageNumber === 1) {
    return posts.slice(startIndex, pageSize);
  } else {
    let endIndex = (startIndex / (pageNumber - 1)) * pageNumber;
    return posts.slice(startIndex, endIndex);
  }
};

export default Paginate;
