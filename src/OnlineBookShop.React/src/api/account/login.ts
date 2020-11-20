import config from "../../config";

const baseUrl = config.API_URL + 'account/';

export interface UserForLogin {
  username: string;
  password: string;
}

export interface BearerToken {
  accessToken: string;
}

export const login = async (form: UserForLogin) => {
  const response = await fetch(baseUrl + 'login/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data: BearerToken = await response.json();
  return data;
}
