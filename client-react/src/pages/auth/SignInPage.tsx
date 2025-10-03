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
import { SignInSchema, type SignInInput } from "@/schema/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { AuthService } from "@/service/auth.service"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import type { ErrorResponse } from "@/types"
import { useAuthMiddleware } from "@/store/authstore"
import { StatusCode } from "@/constants/statusCode"

const SignInPage = () => {

  const navigate = useNavigate();
  const { setAuthState } = useAuthMiddleware();

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      hashedPassword: ""
    }
  });

  const handleFormSubmit = async(data: SignInInput) => {
    try {
      const response = await AuthService.signIn(data);
      console.log(response);
      if(response.status === StatusCode.OK) {
        toast.success("Successfully SignIn!");
        setAuthState();
        navigate("/home");
      }
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;

        const status = axiosError.status;
        const data = axiosError.response?.data;

        if(status === 409 && data) {
          toast.error(data.message);
        }

        if(status === StatusCode.BAD_REQUEST && data) {
          toast.error(data.message);
        }

        if(status === StatusCode.NOT_FOUND && data) {
          toast.error(data.message);
        }
      } else {
        toast.error("Unexpected error occurred.")
      }
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">SignIn</CardTitle>
        <CardDescription>
          Enter your email below to SignIn to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-6">
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
                    <FormDescription>
                      <Link to={"#"} className="text-neutral-800 font-medium">Forgot your Password?</Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <CardAction className="w-full flex items-center justify-center gap-2">
          <span className="text-sm text-neutral-500">Don't have an account?</span>
          <Link to="/auth/sign-up" className="text-sm underline-offset-4 hover:underline">
            Sign Up
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  )
}

export default SignInPage