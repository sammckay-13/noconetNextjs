'use client'
import { useEffect, useState } from "react"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command"
import { useUserContext } from "@/components/UserContext";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export default function SearchBar() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState("")
  const [userNames, setUserNames] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])
  const {setSelectedUser} = useUserContext()

  useEffect(() => {
  const fetchUsers = async () => {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json()
    const members = data.map((member: any) => member.name)
    setUserNames(members)
    setUsers(data)
  }
  fetchUsers()
}, [])

const filtered = users.filter((user: User) =>
  user.name?.toLowerCase().includes(search.toLowerCase())
)

  return (
    <div className="w-full max-w-2xl">
      <Command>
        <CommandInput
          placeholder="Search your name..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className="bg-white border mt-2 rounded-md shadow-md">
          {filtered.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )} 
          {filtered.length > 0 &&  search.length > 0 && (
            filtered.map((user, index) => (
              <CommandItem
                key={index}
                value={user.name}
                onSelect={(value) => {
                  setSelectedUser(user)
                  setSelected(value)
                  setSearch("")
                }}
              >
                {user.name}
              </CommandItem>
            ))
          )}
        </CommandList>
      </Command>
    </div>
  )
}
