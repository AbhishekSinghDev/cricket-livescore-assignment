"use client";

import React from "react";
import { Button } from "../ui/button";
import { removeAuthTokens } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const router = useRouter();

  const handleLogoutUser = () => {
    removeAuthTokens();
    toast.success("Logout successfull.");
    router.push("/auth/sign-in");
  };

  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-xl font-medium">Cricket Live Score</h1>
      <Button onClick={handleLogoutUser}>Logout Admin</Button>
    </nav>
  );
};

export default Navbar;
