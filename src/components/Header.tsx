"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Home, Info, Phone, UserPlus, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="z-10 bg-cyan-800 flex items-center w-full justify-between px-6 h-[4rem] text-white shadow-md">
      {/* Logo */}
      <div className="text-md font-bold ">Feedback.io</div>

      {/* Navigation Links */}
      <nav className="flex space-x-6 items-center text-sm font-semibold">
        <a href="#" className="flex items-center gap-1 hover:text-gray-400">
          <Home className="w-4 h-4" />
          Home
        </a>

        <a href="#" className="flex items-center gap-1 hover:text-gray-400">
          <Info className="w-4 h-4" />
          About
        </a>

        <a href="#" className="flex items-center gap-1 hover:text-gray-400">
          <Phone className="w-4 h-4" />
          Contact
        </a>

        {/* Register Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <UserPlus className="w-4 h-4" />
            Register
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Student</DropdownMenuItem>
            <DropdownMenuItem>Department</DropdownMenuItem>
            <DropdownMenuItem>Faculty</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Login Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
            <LogIn className="w-4 h-4" />
            Login
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <a href="http://localhost:3000/auth/login/student">Student</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="http://localhost:3000/auth/login/admin">Admin</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </nav>
    </header>
  );
};

export default Header;
