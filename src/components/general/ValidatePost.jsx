import axios from 'axios';
import Joi from 'joi-browser';

const ValidatePost = async (props) => {
  // Destructure
  const {
    title,
    category,
    description,
    address1,
    address2,
    postalcode,
    file,
  } = props;

  // Set up schema for Joi
  const schema = {
    title: Joi.string().required().label('Title'),
    category: Joi.string().required().label('Category'),
    description: Joi.string().required().label('Description'),
    address1: Joi.string().required().label('Address'),
    address2: Joi.string().label('Address'),
    postalcode: Joi.number().required().label('Postal Code'),
    file: Joi.string().required().label('File'),
  };

  // Implement Joi validation
  const validationResult = Joi.validate(
    { title, category, description, address1, address2, postalcode, file },
    schema,
    {
      abortEarly: false,
    }
  );

  if (validationResult.error === null) {
    const baseUrl = 'https://7000-sapphire-vole-ebkuduij.ws-us03.gitpod.io';

    // Send to collection 'POST-DETAILS'
    let postDetails = await axios({
      method: 'post',
      url: baseUrl + '/posts',
      data: {
        title: title,
        category: category,
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

  if (validationResult.error !== null) {
    const errors = {};
    validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  }
};

export default ValidatePost;
