'use client'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command"

const options = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
]

export default function SearchBar() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState("")

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full max-w-2xl">
      <Command>
        <CommandInput
          placeholder="Search for a fruit..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className="bg-white border mt-2 rounded-md shadow-md">
          {filtered.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )} 
          {filtered.length > 0 &&  search.length > 0 && (
            filtered.map((item, index) => (
              <CommandItem
                key={index}
                value={item}
                onSelect={(value) => {
                  setSelected(value)
                  setSearch(value)
                }}
              >
                {item}
              </CommandItem>
            ))
          )}
        </CommandList>
      </Command>
    </div>
  )
}
