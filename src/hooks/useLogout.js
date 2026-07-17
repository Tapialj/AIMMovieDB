import axios from "/api/axios";
import { useAuth } from "/context/AuthProvider";


const useLogout = () => {
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const res = await axios.post(
        "api/logout",
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("res", res);
      setAuth({});
    }
    catch(e) {
      console.error(e);
    }
  };

  return logout;
};

export default useLogout;
