'use client'
import {
    InputOTPForm } from "@/components/InputOTPForm"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useUserContext } from "./UserContext"


  type User = {
    name: string;
    email: string;
    phoneNumber: string;
    mostrecentsignin: Date;
  }
  

export default function UserInputFields() {
    
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        phoneNumber: "",
        mostrecentsignin: new Date(),
    });
    const {selectedUser} = useUserContext()
    const [isValidEmail, setIsValidEmail] = useState(false);
    
    useEffect(() => {
        const nameField = document.getElementById("nameField") as HTMLInputElement;
        const emailField = document.getElementById("emailField") as HTMLInputElement;
        if (!selectedUser) return;
        nameField.value = selectedUser.name;
        emailField.value = selectedUser.email;
        setUser({
            ...user,
            name: nameField.value,
            email: emailField.value,
            phoneNumber: selectedUser.phoneNumber,
        });
    }, [selectedUser])

    const handleNameChange = (event: any) => {
        setUser({
            ...user,
            name: event.target.value,
        });
    }

    const handleEmailChange = (event: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(event.target.value));
        setUser({
            ...user,
            email: event.target.value,
        });
    }

    function handleReset() {
        setUser({
            name: "",
            email: "",
            phoneNumber: "",
            mostrecentsignin: new Date(),
        });
        const nameField = document.getElementById("nameField") as HTMLInputElement;
        const emailField = document.getElementById("emailField") as HTMLInputElement;
        if (!selectedUser) return;
        nameField.value = "";
        emailField.value = "";
    }

  return (
    <div className="w-full max-w-sm">
            <div className="w-full flex items-center justify-between mb-8">
                <Input onChange={handleNameChange} id="nameField" type="text" placeholder="John Doe" className={"mr-5"} />
                <Input onChange={handleEmailChange} id="emailField" type="email" placeholder="example@example.com" className={isValidEmail ? "w-auto" : "border-red-500"} />
            </div>
            <label className="block items-center justify-center text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Enter your phone number below:
            </label>
        <div className="flex items-center justify-center w-auto">
            <InputOTPForm member={user} handleReset={handleReset} />
        </div>
    </div>
  )
}
