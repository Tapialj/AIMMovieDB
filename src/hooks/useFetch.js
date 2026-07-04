import { useEffect, useState } from "react";

import { useAuth } from "/context/AuthProvider";

import useAxiosPrivate from "./useAxiosPrivate";


function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { auth, setExpired } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const res = await axiosPrivate.get(url);
        // {
        //   headers: {
        //     Authorization: `Bearer ${auth?.token}`,
        //   },
        // },
        // );
        
        setData(res?.data);
      }
      catch(e) {
        setError(e);
        if(e.status === 403) {
          setExpired(true);
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  },[url]);

  return { data, loading, error };
}

export default useFetch;
