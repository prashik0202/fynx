import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchema, type SignUpInput } from "@/schema/authSchema"
import { AuthService } from "@/service/auth.service"
import { useAuthMiddleware } from "@/store/authstore"
import { AxiosError } from "axios"
import type { ErrorResponse } from "@/types"
import { Loader } from "lucide-react"

const SignUpPage = () => {

  const navigate = useNavigate();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      hashedPassword: "",
      confirmPassword: "",
    }
  })
  const {setUserId} = useAuthMiddleware();

  const handleFormSubmit = async(data: SignUpInput) => {
    try {
      const response = await AuthService.signUp(data);
      console.log(response);
      if(response.status === 201) {
        setUserId(response.data.userId);
        toast.success(response.data.message);
        navigate("/auth/verify");
      }
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;

        const status = axiosError.status;
        const data = axiosError.response?.data;

        if(status === 409 && data) {
          toast.error(data.message);
        }
      }
    }
  }

  return (
    <Card className="w-full max-w-sm shadow-2xl">
      <CardHeader className="gap-2">
        <CardTitle className="text-xl">SignUp</CardTitle>
        <CardDescription>
          Enter your name and email below to SignUp to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="hashedPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full disabled:bg-primary/45" disabled={form.formState.isSubmitting} >
                { form.formState.isLoading ? <Loader className="animate-spin h-5 w-5"/> : "Sign Up" }
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardAction className="w-full flex items-center justify-center gap-2">
          <span className="text-sm text-neutral-500">Already have an account?</span>
          <Link to="/auth/sign-in" className="text-sm underline-offset-4 hover:underline">
            Sign In
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  )
}

export default SignUpPage