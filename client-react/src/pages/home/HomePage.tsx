import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-screen p-10 md:p-32'>
      <h1 className='text-3xl'>PERN Auth</h1>
      <div className="flex flex-col gap-1 mt-5">
        <p>This is kind of template we can use for authentication for projects.</p>
        <p>Future scope of this will be to add Multi User Support</p>
        <Button className="w-fit" onClick={() => navigate("/auth/sign-up")}>Sign-Up</Button>
      </div>
    </div>
  )
}

export default HomePage