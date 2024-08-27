import { AxiosInstance } from "axios";

export const fetchRecords = async (axiosAuth: AxiosInstance, url:string) => {
  try {
    const response = await axiosAuth.get(`${url}?sort=-id`);
    const data = response.data.data;
    return data.results;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const createLinkToken = async (axiosAuth: AxiosInstance) => {
  try {
    const response = await axiosAuth.post(`/banks/create-link-token`);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('CreateLinkToken Error:', error);
    throw error;
  }
};

export const exchangePublicToken = async (axiosAuth: AxiosInstance,publicToken:string) => {
  try {
    const response = await axiosAuth.post(`/banks/exchange-public-token/${publicToken}`);
    return response.data.data.newBank;
  } catch (error) {
    console.error('ExchangePublicToken Error:', error);
    throw error;
  }
};

