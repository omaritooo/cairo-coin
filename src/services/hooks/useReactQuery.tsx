// // import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { useQuery } from "react-query";

// import { useState } from "react";
// import { HomeData } from "../types";

// interface IProps {
//   reqName: string;
//   request: any;
// }
// type QueryResult = {
//   data?: HomeData;
//   isLoading: boolean;
//   errorResponse?: Error;
// };

// const useReactQuery = ({ reqName, request }: IProps): QueryResult => {
//   const [errorResponse, setErrorResponse] = useState<Error>();
//   const { data, isLoading } = useQuery<HomeData, Error>({
//     queryKey: [reqName],
//     queryFn: async () => {
//       try {
//         const response = request;
//         return response;
//       } catch (error) {
//         throw error || "Unknown error occurred";
//       }
//     },
//     onError: (error: Error) => {
//       setErrorResponse(error);
//     },
//   });
//   return { data, isLoading, errorResponse };
// };
// export default useReactQuery;
