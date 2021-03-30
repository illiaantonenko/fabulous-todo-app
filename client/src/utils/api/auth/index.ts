import API from '../../controllers/api_controller';

const Auth : Record<string, API> = {};

// Auth calls
Auth.signUpRequest = new API<{}>(
  'POST',
  `${process.env.API_URL}/auth/signup`,
  'application/json',
  10000,
);

Auth.signInRequest = new API<{}>(
  'POST',
  `${process.env.API_URL}/auth/signin`,
  'application/json',
  10000,
);

export default Auth;
