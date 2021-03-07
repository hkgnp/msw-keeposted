import axios from 'axios';

const RegisterUser = async (props, req, res) => {
  const baseUrl = 'https://7000-amethyst-elk-z1e2nqxe.ws-us03.gitpod.io';

  /// Send to collection 'POST DETAILS'
  await axios({
    method: 'post',
    url: `${baseUrl}/user/register`,
    data: {
      name: props.name,
      email: props.email,
      password: props.password,
    },
  });
};

export default RegisterUser;
