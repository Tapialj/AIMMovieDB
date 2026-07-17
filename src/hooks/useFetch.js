import { useEffect, useState } from "react";

import useAxiosPrivate from "./useAxiosPrivate";


function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const res = await axiosPrivate.get(url);
        
        setData(res?.data);
      }
      catch(e) {
        setError(e);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  },[url]);

  return { data, setData, loading, error };
}

export default useFetch;
