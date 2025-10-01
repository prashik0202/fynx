import { Button } from "@/components/ui/button"
import { MoveRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom"

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-screen p-10 md:p-32 flex flex-col items-center gap-5'>
      <div className="flex items-center gap-2 text-lg font-bold mb-5 shadow-lg rounded-full px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        AI Powered
        <Sparkles className="h-5 w-5"/>
      </div>
      <h1 className='text-4xl md:text-6xl lg:text-8xl text-center'>Fynx</h1>
      <div className="flex flex-col gap-5 mt-1 items-center">
        <p className="text-md md:text-lg lg:text-xl text-muted-foreground">Create, Send & Analyze Smart Forms with AI.</p>
        <div className="flex gap-4">
          <Button className="w-fit" onClick={() => navigate("/auth/sign-up")}>Get Started <MoveRight /></Button>
          <Button className="w-fit" onClick={() => navigate("/auth/sign-up")} variant={"outline"}>Sign-Up</Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage