import WritePage from "@/features/write"
import AuthGuard from "@/hoc/AuthGuard"

const Write = async() => {

  return  <WritePage/>
  
}

export default AuthGuard(Write)