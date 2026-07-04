import { useEffect } from "react";

import { axiosPrivate } from "/api/axios";
import { useAuth } from "/context/AuthProvider";

import useRefreshToken from "./useRefreshToken";


const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if(auth != null && !config.headers["Authorization"] && auth?.token) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if(error?.response?.status === 403 && !prevRequest?.sent) {
          const newToken = await refresh();
          prevRequest.sent = true;
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      },
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  
  return axiosPrivate;
};

export default useAxiosPrivate;
