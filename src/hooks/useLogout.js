import axios from "/api/axios";
import { useAuth } from "/context/AuthProvider";


const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    
    try {
      await axios.get(
        "api/auth/logout",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          withCredentials: true,
        },
      );
      
      setAuth({});
    }
    catch(e) {
      console.error(e);
    }
  };

  return logout;
};

export default useLogout;
