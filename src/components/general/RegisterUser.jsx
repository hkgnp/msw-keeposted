import axios from 'axios';
import Joi from 'joi-browser';

const RegisterUser = async (props) => {
  // Destructure
  const { name, email, password } = props;

  // Set up schema for Joi
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  // Implement Joi validation
  const validationResult = Joi.validate({ name, email, password }, schema, {
    abortEarly: false,
  });

  if (!validationResult) {
    const baseUrl = 'https://7000-amethyst-elk-z1e2nqxe.ws-us03.gitpod.io';

    /// Send to collection 'POST DETAILS'
    await axios({
      method: 'post',
      url: `${baseUrl}/user/register`,
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
  }
  const errors = {};
  validationResult.error.details.map((e) => (errors[e.path[0]] = e.message));
  console.log(errors);
};

export default RegisterUser;
