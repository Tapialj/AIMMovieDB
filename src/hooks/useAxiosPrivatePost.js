import { useAuth } from "/context/AuthProvider";
import useAxiosPrivate from "/hooks/useAxiosPrivate";


const useAxiosPrivatePost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const axiosPrivatePost = async (url, postObject = null) => {
    
    return await axiosPrivate.post(
      url,
      JSON.stringify(postObject),
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-type": "application/json",
        },
        withCredentials: true,
      },
    );
  };

  return axiosPrivatePost;
};

export default useAxiosPrivatePost;
