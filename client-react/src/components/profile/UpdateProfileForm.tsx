
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type React from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { UpdateUserSchema, type UpdateUser } from "@/schema/authSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface UpdateProfileFormProps {
  trigger: React.ReactNode;
  data: UpdateUser;
}

const UpdateProfileForm = ({ trigger, data } : UpdateProfileFormProps) => {

  const form = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: data.email,
      name: data.name
    }
  });

  const handleFormSubmit = async(data: UpdateUser) => {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Profile</DialogTitle>
          <DialogDescription>
            You can update your profile data here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
            <FormField 
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileForm