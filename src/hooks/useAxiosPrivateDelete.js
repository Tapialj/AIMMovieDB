import { useAuth } from "/context/AuthProvider";
import useAxiosPrivate from "/hooks/useAxiosPrivate";


const useAxiosPrivateDelete = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const axiosPrivateDelete = async (url) => {
    return await axiosPrivate.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-type": "application/json",
        },
        withCredentials: true,
      },
    );
  };

  return axiosPrivateDelete;
};

export default useAxiosPrivateDelete;
