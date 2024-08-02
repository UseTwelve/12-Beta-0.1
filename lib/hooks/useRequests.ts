import { AxiosInstance } from "axios";

export const fetchRecords = async (axiosAuth: AxiosInstance, url:string) => {
  try {
    const response = await axiosAuth.get(url);
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


export const addRecord = async (axiosAuth: AxiosInstance, newRecord: any, url:string) => {
  try {
    const response = await axiosAuth.post(url, { newRecord });
    return response.data;
  } catch (error) {
    console.error('Error adding record:', error);
    throw error;
  }
};

export const updateRecord = async (axiosAuth: AxiosInstance, rowIndex: number, updatedRecord: any, url:string) => {
  try {
    const response = await axiosAuth.put(url, { rowIndex, updatedRecord });
    return response.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

export const deleteRecord = async (axiosAuth: AxiosInstance, rowIndex: number, url:string) => {
  try {
    const response = await axiosAuth.delete(url, { data: { rowIndex } });
    return response.data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
