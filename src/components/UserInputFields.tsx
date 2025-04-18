'use client'
import {
    InputOTPForm } from "@/components/InputOTPForm"
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

  type User = {
    name: string;
    email: string;
    phoneNumber: string;
  }

export default function UserInputFields() {
    
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const {selectedUser} = useUserContext()
    
    useEffect(() => {
        const nameField = document.getElementById("nameField") as HTMLInputElement;
        const emailField = document.getElementById("emailField") as HTMLInputElement;
        if (!selectedUser) return;
        nameField.value = selectedUser.name;
        emailField.value = selectedUser.email;
    }, [selectedUser])

    const handleNameChange = (event: any) => {
        setUser({
            ...user,
            name: event.target.value,
        });
    }

    const handleEmailChange = (event: any) => {
        setUser({
            ...user,
            email: event.target.value,
        });
    }

  return (
    <div className="w-full max-w-sm">
            <div className="w-full flex items-center justify-between mb-8">
                <Input onChange={handleNameChange} id="nameField" type="text" placeholder="Enter your name" className="inline w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <Input onChange={handleEmailChange} id="emailField" type="email" placeholder="Enter your email" className="inline w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <label className="block items-center justify-center text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Enter your phone number below:
            </label>
        <div className="flex items-center justify-center w-full">
            <InputOTPForm {...user} />
        </div>
    </div>
  )
}
