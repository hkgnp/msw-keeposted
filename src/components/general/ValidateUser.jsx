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
    const baseUrl = 'https://7000-ivory-rattlesnake-glx98tol.ws-us03.gitpod.io';

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

      //Login user
      let response = '';

      try {
        response = await axios({
          method: 'post',
          url: `${baseUrl}/user/login`,
          data: {
            email: email,
            password: password,
          },
        });
        // Get token
        const jwt = response.data.date.token;

        // Store token in local storage
        localStorage.setItem('token', jwt);

        // Redirect to main page
        window.location.href = '/';
      } catch (e) {
        this.setState({
          loginerror: e.response.data,
          loaded: true,
        });
      }
    } catch (e) {
      return 'Username is already taken';
    }
  }
};

export default ValidateUser;
