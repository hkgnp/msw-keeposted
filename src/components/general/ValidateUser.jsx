import axios from 'axios';
import Joi from 'joi-browser';

const ValidateUser = async (props) => {
  // Destructure
  const { name, email, password } = props;

  // Set up schema for Joi
  const schema = {
    name: Joi.string().required().label('Name'),
    email: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
  };

  // Implement Joi validation
  const validationResult = Joi.validate({ name, email, password }, schema, {
    abortEarly: false,
  });

  if (validationResult.error !== null) {
    const errors = {};
    validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
    return errors;
  } else {
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
      return 'User successfully registered';
    } catch (e) {
      return 'Username has already been taken';
    }
  }
};

export default ValidateUser;
