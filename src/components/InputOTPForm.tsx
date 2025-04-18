"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
  phonenumber: z.string().min(10, {
    message: "Your phonenumber must be 10 numbers.",
  }),
})


type User = {
    name: string;
    email: string;
    phoneNumber: string;
  }

export function InputOTPForm(member: User) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phonenumber: member.phoneNumber,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                name: member.name,
                email: member.email,
                phoneNumber: data.phonenumber,
            }),
        });
        if (response.ok) {
            toast.success("User added successfully")
        } else {
            toast.error("Error adding user")
        }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem className="w-full items-center justify-center ml-5">
              <FormControl>
                <InputOTP maxLength={10} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator></InputOTPSeparator>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                  <InputOTPSeparator></InputOTPSeparator>
                  <InputOTPGroup>
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center w-full mt-6">
        <Button className="hover:bg-green-800 cursor-pointer" type="submit">Submit</Button>

        </div>
      </form>
    </Form>
  )
}
