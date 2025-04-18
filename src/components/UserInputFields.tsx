'use client'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useUserContext } from "./UserContext"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"


export default function UserInputFields() {
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const {selectedUser} = useUserContext()
    
    useEffect(() => {
        const nameField = document.getElementById("nameField") as HTMLInputElement;
        const emailField = document.getElementById("emailField") as HTMLInputElement;
        const phoneNumberField = document.getElementById("phoneNumberField") as HTMLInputElement;
        if (!selectedUser) return;
        nameField.value = selectedUser.name;
        emailField.value = selectedUser.email;
        phoneNumberField.value = selectedUser.phoneNumber;
        console.log(selectedUser.phoneNumber[0])
    }, [selectedUser])
    
    const handleSubmit = async () => {
        const nameField = document.getElementById("nameField") as HTMLInputElement;
        const emailField = document.getElementById("emailField") as HTMLInputElement;
        const phoneNumberField = document.getElementById("phoneNumberField") as HTMLInputElement;
        //Need to see if user already exists in db, if so don't add but update most recent attendance or something
        setUser({
            name: nameField.value,
            email: emailField.value,
            phoneNumber: phoneNumberField.value,
        });
        console.log(user.phoneNumber)
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({user}),
        });
    }

  return (
    <div className="w-full max-w-2xl">
            <div className="w-full flex items-center justify-between mb-8">
                <Input id="nameField" type="text" placeholder="Enter your name" className="inline w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <Input id="emailField" type="email" placeholder="Enter your email" className="inline w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <label className="block items-center justify-center text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Enter your phone number below:
            </label>
        <div className="flex items-center justify-center w-full">










        <InputOTP maxLength={10} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} id="phoneNumberField">
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
            </InputOTPGroup>
        <InputOTPSeparator/>
            <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
        </InputOTPGroup>
        <InputOTPSeparator />
            <InputOTPGroup>
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
                <InputOTPSlot index={8} />
                <InputOTPSlot index={9} />
        </InputOTPGroup>
    </InputOTP>
        </div>
        <div className="flex items-center justify-center w-full mt-4">
            <Button className="text-center text-sm font-medium text-white hover:bg-emerald-800 mb-3 cursor-pointer" onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  )
}
