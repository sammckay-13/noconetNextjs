import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import SearchBar from "@/components/SearchBar";
import UserInputFields from "@/components/UserInputFields";
import { UserProvider } from "@/components/UserContext";

export default function Home() {
  return (
    <UserProvider>
    <div className="flex flex-col items-center justify-center mt-20">
      <Card className=" flex w-250 h-250 items-center">
        <CardHeader className="flex items-center justify-center w-full">
          <CardTitle className="text-2xl">Sign in for NocoNet!</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center w-100 mt-10">
          <SearchBar></SearchBar>
        </CardContent>
          <div className="flex">
            <UserInputFields></UserInputFields>
          </div>
      </Card>
    </div>
    </UserProvider>
  );
}
