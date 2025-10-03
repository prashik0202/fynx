import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifyEmailSchema, type VerifyEmailInput } from "@/schema/authSchema"
import { useAuthMiddleware } from "@/store/authstore"
import { redirect, useNavigate } from "react-router-dom"
import { AuthService } from "@/service/auth.service"
import { AxiosError } from "axios"
import type { ErrorResponse } from "@/types"
import { toast } from "react-toastify"

const VerificationPage = () => {

  const { userId, setAuthState } = useAuthMiddleware();
  const navigate = useNavigate();

  if(!userId) {
    redirect("/auth/sign-up");
    return;
  }

  const form = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: "",
      userId: userId
    }
  });

  const handleFormSubmit = async(data: VerifyEmailInput) => {
    try {
      const response = await AuthService.verifyEmail(data);
      if(response.status === 200 && response.data) {
        setAuthState();
        toast.success(response.data.message);
        navigate('/home')
      }
    } catch (error: unknown) {
      if(error instanceof AxiosError) {
        const status = error.status;
        const data = error.response?.data as ErrorResponse;

        if(status === 400 && data) {
          toast.error(data.message);
        }
      }
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Email Verification</CardTitle>
        <CardDescription>
          Enter OTP sent to your email to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Verify
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default VerificationPage