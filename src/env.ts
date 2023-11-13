import Surenv from 'surenv';

const { required } = new Surenv();

const env = required(
  'PORT',
  'APP',
  'SEARCHSTAX_API_URL',
  'SEARCHSTAX_API_TOKEN_READ',
  'SEARCHSTAX_API_TOKEN_WRITE',
);

export default env;
