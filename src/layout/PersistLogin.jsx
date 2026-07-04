import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "/context/AuthProvider";
import useRefreshToken from "/hooks/useRefreshToken";

import Loading from "/components/Loading";


const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshtoken = async () => {
      try {
        await refresh();
      }
      catch(error) {
        console.log("Failed to refresh: ", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshtoken() : setIsLoading(false);
  }, []);

  return (
    <>
      {
        isLoading ?
          <Loading /> :
          <Outlet />
      }
    </>
  );
};

export default PersistLogin;
