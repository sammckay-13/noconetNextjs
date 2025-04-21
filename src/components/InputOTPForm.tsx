"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useEffect, useState } from "react"

const FormSchema = z.object({
  phonenumber: z.string().min(10, {
    message: "Your phonenumber must be 10 numbers.",
  }),
})


type User = {
    name: string;
    email: string;
    phoneNumber: string;
    mostrecentsignin: Date;
  }

  type InputOTPFormProps = {
    member: User;
    handleReset: () => void;
  }


export function InputOTPForm({member, handleReset}: InputOTPFormProps) {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showFailureDialog, setShowFailureDialog] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phonenumber: "",
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    //I need to check if the user is already in the database, if they are just update the most recent sign in date
    if (member.name.length > 0 && member.email.length > 0) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                name: member.name,
                email: member.email,
                phoneNumber: data.phonenumber,
                mostrecentsignin: member.mostrecentsignin
            }),
        });
        if (response.ok) {
            toast.success("User added successfully")
        } else {
            toast.error("Error adding user")
        }
        setShowSuccessDialog(true)
        form.reset()
        handleReset()
      } else {
        setShowFailureDialog(true)
      }
    }
        


    useEffect(() => {
    if (member.phoneNumber) {
      form.setValue("phonenumber", member.phoneNumber)
    }
  }, [member.phoneNumber])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem className="w-auto items-center justify-center text-white">
              <FormControl>
                <InputOTP maxLength={10} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
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
        <Button className="hover:bg-teal-600 cursor-pointer bg-[#27BDC7]" type="submit">Submit</Button>
        </div>


        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-[425px] items-center justify-center">
            <DialogHeader>
              <DialogTitle>Success!</DialogTitle>
              <DialogDescription>
              You have successfully signed in with NocoNet today!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowSuccessDialog(false)} type="submit" className="cursor-pointer">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        <Dialog open={showFailureDialog} onOpenChange={setShowFailureDialog}>
          <DialogContent className="sm:max-w-[425px] items-center justify-center">
            <DialogHeader>
              <DialogTitle>Oops!</DialogTitle>
              <DialogDescription>
              Make sure you have something in the username, email, and phone number fields!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowFailureDialog(false)} type="submit" className="cursor-pointer">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  )
}