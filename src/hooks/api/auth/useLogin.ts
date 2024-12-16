"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login success");
      dispatch(loginAction(data));
      localStorage.setItem("blog-storage", JSON.stringify(data));
      router.replace("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useLogin;

// CARA MANUAL
// const useRegister = () => {
//   const [isLoading, setLoading] = useState<Boolean>(false);

//   const handleRegister = async (payload) => {
//     try {
//       const { data } = await axios.post("http:localhost:8000", payload);
//       toast.success("Register success");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return {};
// };
