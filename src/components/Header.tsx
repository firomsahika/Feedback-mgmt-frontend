"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@/context/userContext";
import { Home, Info, Phone, UserPlus, LogIn, LogOut } from "lucide-react";

const Header = () => {
  const { user, logout } = useUser();

  return (
    <header className="z-10 bg-cyan-800 flex items-center w-full justify-between px-6 h-[4rem] text-white shadow-md">
      {/* Logo or User Info */}
      <div className="text-md font-bold">
        {user ? user.email : "Feedback.io"}
      </div>

      {/* Right Side Navigation */}
      <nav className="flex space-x-6 items-center text-sm font-semibold">
        {!user ? (
          <>
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

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-400 cursor-pointer">
                <LogIn className="w-4 h-4" />
                Login
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="/auth/login/student">Student</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/auth/login/admin">Admin</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <button
            onClick={logout}
            className="flex items-center gap-1 hover:text-gray-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
