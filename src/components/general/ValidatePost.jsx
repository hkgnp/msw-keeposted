import axios from 'axios';
import Joi from 'joi-browser';

const ValidatePost = async (props) => {
  // Destructure
  const {
    postId,
    username,
    title,
    categories,
    description,
    address1,
    address2,
    postalcode,
    file,
    editingPost,
  } = props;

  // Set up schema for Joi
  const schema = {
    username: Joi.string().required().label('Username'),
    title: Joi.string().required().label('Title'),
    categories: Joi.array().required().label('Category'),
    description: Joi.string().required().label('Description'),
    address1: Joi.string().required().label('Address'),
    postalcode: Joi.string().min(6).max(6).required().label('Postal Code'),
    file: Joi.string().required().label('File'),
  };

  // Implement Joi validation
  const validationResult = Joi.validate(
    {
      username,
      title,
      categories,
      description,
      address1,
      postalcode,
      file,
    },
    schema,
    {
      abortEarly: false,
    }
  );

  // Check for errors
  if (validationResult.error !== null) {
    const errors = {};
    validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  } else if (validationResult.error === null) {
    const baseUrl = 'https://quiet-gorge-29042.herokuapp.com';

    let postDetails;
    if (editingPost === true) {
      // Editing existing resource
      postDetails = await axios({
        method: 'put',
        url: baseUrl + '/edit-resource',
        data: {
          id: postId,
          username: username,
          title: title,
          categories: categories,
          description: description,
          location: {
            address1: address1,
            address2: address2,
            postalcode: postalcode,
          },
        },
      });

      // Start the process of sending to S3
      const file = document.getElementById('mediafile').files[0];

      // Fetch the signed url
      const key = postId;
      const response = await axios.get(
        `${baseUrl}/uploader/sign?key=${key}&type=${file.type}`
      );
      const url = response.data.url;

      // Attempt the upload of media
      try {
        const options = { headers: { 'Content-Type': file.type } };
        await axios.put(url, file, options);
      } catch (e) {
        console.log(e);
      }
    } else {
      // New resource
      postDetails = await axios({
        method: 'post',
        url: baseUrl + '/post-resource',
        data: {
          username: username,
          title: title,
          categories: categories,
          description: description,
          location: {
            address1: address1,
            address2: address2,
            postalcode: postalcode,
          },
        },
      });

      // Start the process of sending to S3
      let postObjectId = await postDetails.data;
      const file = document.getElementById('mediafile').files[0];

      // Fetch the signed url
      const key = postObjectId;
      const response = await axios.get(
        `${baseUrl}/uploader/sign?key=${key}&type=${file.type}`
      );
      const url = response.data.url;

      // Attempt the upload of media
      try {
        const options = { headers: { 'Content-Type': file.type } };
        await axios.put(url, file, options);
      } catch (e) {
        console.log(e);
      }

      // Send S3 URL to collection 'MEDIA
      // - Include ObjectID of post-details and amazon URL
      await axios({
        method: 'post',
        url: baseUrl + '/media',
        data: {
          postId: postObjectId,
          mediaUrl: `https://msw-keeposted-images.s3-ap-southeast-1.amazonaws.com/${postObjectId}`,
        },
      });
    }
  }
};

export default ValidatePost;
