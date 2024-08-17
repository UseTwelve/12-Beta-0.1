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
export const uploadRecord = async (axiosAuth: AxiosInstance, url:string) => {
  try {
    const response = await axiosAuth.get(url);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error uploading records:', error);
    throw error;
  }
};


export const deleteRecord = async (axiosAuth: AxiosInstance, id: number, url:string) => {
  try {
    const response = await axiosAuth.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
