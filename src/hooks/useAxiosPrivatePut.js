import { useAuth } from "/context/AuthProvider";
import useAxiosPrivate from "/hooks/useAxiosPrivate";


const useAxiosPrivatePut = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  
  const axiosPrivatePut = async (url, putObject) => {
    return await axiosPrivate.put(
      url,
      JSON.stringify(putObject),
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-type": "application/json",
        },
        withCredentials: true,
      },
    );
  };

  return axiosPrivatePut;
};

export default useAxiosPrivatePut;
