export const SERVER_URL = 'https://api.mfapi.in';
export function config() {
    const confs = {

stable: {
    url: `${SERVER_URL}/mf/`,
  },
}

const conf = confs['stable'];

  return conf;
}