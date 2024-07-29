import { AxiosInstance } from "axios";

export const fetchRecords = async (axiosAuth: AxiosInstance) => {
  try {
    const response = await axiosAuth.get('/client/church/records');
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};


export const addRecord = async (axiosAuth: AxiosInstance, newRecord: any) => {
  try {
    const response = await axiosAuth.post('/client/church/record', { newRecord });
    return response.data;
  } catch (error) {
    console.error('Error adding record:', error);
    throw error;
  }
};

export const updateRecord = async (axiosAuth: AxiosInstance, rowIndex: number, updatedRecord: any) => {
  try {
    const response = await axiosAuth.put(`/client/church/record`, { rowIndex, updatedRecord });
    return response.data;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
};

export const deleteRecord = async (axiosAuth: AxiosInstance, rowIndex: number) => {
  try {
    const response = await axiosAuth.delete(`/client/church/record`, { data: { rowIndex } });
    return response.data;
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};
