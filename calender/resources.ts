import axios, { AxiosInstance } from 'axios';
import { useQuery } from 'react-query';

const baseURL = 'https://eaapi3.qc.arabiansystems.com/api/Landing/';

const API: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAuctionCalender = async ({ DateFrom, DateTo }: { DateFrom: string; DateTo: string }) => {
  const { data } = await API.post(`AuctionCalender`, {
    DateFrom,
    DateTo,
  });
  return data.Data;
};

export const useAuctionCalender = (body: { DateFrom: string; DateTo: string }) => {
  return useQuery(['auction_calender', body], () => fetchAuctionCalender(body));
};
