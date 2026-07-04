
import { useNavigate } from "react-router-dom";

import axios from "/api/axios";
import { useAuth } from "/context/AuthProvider";


const useRefreshToken = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const res = await axios.get("/api/auth/refresh", {
        withCredentials: true,
      });
      
      setAuth((prev) => {
        return { 
          ...prev,
          user: res.data.user,
          token: res.data.token,
        };
      });
      
      return res.data.token;
    }
    catch(error) {
      console.log("Expired session: ", error);
      navigate("/login");
    }
  };

  return refresh;
};

export default useRefreshToken;
