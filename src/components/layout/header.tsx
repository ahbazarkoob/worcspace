"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import logo from "../../../public/icon.png";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { BellIcon, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const workspace_items = [
  "Worcspace 1",
  "Worcspace 2",
  "Worcspace 3",
  "Worcspace 4",
];

const Header = () => {
  const [selectedWorcspace, setSelectedWorcspace] = useState<string>(
    workspace_items[0]
  );
  return (
    <div className="h-14 py-2 px-4 bg-linear-to-r from-[#15102f] via-[#25205a] to-[#181741] flex justify-between flex-row items-center text-white/80 rounded-lg">
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-row gap-2 text-white font-semibold items-center">
          <Image src={logo} alt="Logo" className="h-8 w-8" />
          <div className="text-white/80">Worcspace</div>
        </div>
        <Select value={selectedWorcspace} onValueChange={setSelectedWorcspace}>
          <SelectTrigger className="bg-[#1e2e6b] border-none text-white  data-[size=default]:h-6 data-[size=sm]:h-6 data-placeholder:text-white/80 font-bold text-xs">
            <SelectValue
              className="text-white"
              placeholder="Select a worcspace"
            />
          </SelectTrigger>
          <SelectContent>
            {workspace_items.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <InputGroup className="max-w-xs border-none bg-[#423d78] rounded-sm hidden sm:flex">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">⌘K</InputGroupAddon>
      </InputGroup>
      <div className="flex flex-row gap-4 items-center">
        <BellIcon className="size-4" />
        <Avatar className="size-6">
          <AvatarFallback className="bg-[#574cb2] text-[#130f32] font-medium text-xs">
            GK
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
