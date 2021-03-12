import axios from 'axios';
import Joi from 'joi-browser';

const ValidateUser = async (props) => {
  // Destructure
  const { name, email, password } = props;

  // Set up schema for Joi
  const schema = {
    name: Joi.string().required().label('Name'),
    email: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  // Implement Joi validation
  const validationResult = Joi.validate({ name, email, password }, schema, {
    abortEarly: false,
  });

  if (validationResult.error === null) {
    const baseUrl = 'https://quiet-gorge-29042.herokuapp.com';
    /// Send to collection 'POST DETAILS'
    try {
      await axios({
        method: 'post',
        url: `${baseUrl}/user/register`,
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
    } catch (e) {
      const errors = 'Username is already taken';
      return errors;
    }
  } else {
    const errors = {};
    validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  }
};

export default ValidateUser;
