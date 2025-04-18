'use client'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
  


export default function UserInputFields() {

  return (
    <div className="w-full max-w-2xl">
            <div className="w-full flex items-center justify-between mb-8">
                <Input type="text" placeholder="Enter your name" className="inline w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                <Input type="email" placeholder="Enter your email" className="inline w-auto rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <label className="block items-center justify-center text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Enter your phone number below:
            </label>
        <div className="flex items-center justify-center w-full">
        <InputOTP maxLength={10} pattern={REGEXP_ONLY_DIGITS}>
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
            <Button className="text-center text-sm font-medium text-white hover:bg-emerald-800 mr-10 mb-3 cursor-pointer">Submit</Button>
            <Button className="text-center text-sm font-medium text-white hover:bg-red-800 mb-3 cursor-pointer">Cancel</Button>
        </div>
    </div>
  )
}
