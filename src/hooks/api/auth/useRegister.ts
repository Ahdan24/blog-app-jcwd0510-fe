"use client";

import  { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router =useRouter()
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Register success");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRegister;

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
