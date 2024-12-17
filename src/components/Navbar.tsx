"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToggleDarkMode } from "./ToggleDarkMode";

const Navbar = () => {
  const router = useRouter();
  const { data } = useSession();

  const user = data?.user;

  const logout = () => signOut();

  return (
    <nav className="sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Phone<span className="bg-orange-500">Hub</span>
          </Link>

          <div className="hidden cursor-pointer items-center gap-8 font-medium md:flex">
            <Link href="/"  className="hover:text-orange-500">Home</Link>
            <Link href="/"  className="hover:text-orange-500">Profile</Link>
            {!user?.id && <Link href="/login">Sign in</Link>}
            {!!user?.id && (
              <>
                <p onClick={() => router.push("/write")}  className="hover:text-orange-500">Write</p>
                <p onClick={logout} className="hover:text-orange-500">Logout</p>
              </>
            )}
            <ToggleDarkMode />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ToggleDarkMode />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/">Profile</Link>
                </DropdownMenuItem>

                {!user?.id && (
                  <DropdownMenuItem>
                    <Link href="/login">Sign in</Link>
                  </DropdownMenuItem>
                )}
                {!!user?.id && (
                  <>
                    <DropdownMenuItem>
                      <>
                        <p onClick={() => router.push("/write")}>Write</p>
                      </>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <>
                        <p onClick={logout}>Logout</p>
                      </>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
