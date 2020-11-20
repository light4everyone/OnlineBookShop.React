import config from "../../config";
import { Publisher } from "./models/Publisher";

const baseUrl = config.API_URL + 'publishers';

export const getAllPublishers =
  async (requestInit?: RequestInit) => {
    const response = await fetch(baseUrl, {
      ...requestInit,
      method: 'get',
      headers: {
        ...requestInit?.headers
      },
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data: Publisher[] = await response.json();
    return data;
  }