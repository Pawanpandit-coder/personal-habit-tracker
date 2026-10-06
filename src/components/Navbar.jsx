"use client";

import React, { useEffect, useState } from "react";
import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Avatar, AvatarFallback } from "./ui/avatar";

import {
  Menu,
  Bell,
  Search,
  Brain,
  NotebookPen,
  MessageSquareText,
  User,
  Settings,
  LogOut,
  CreditCard,
  ChevronRight,
  House,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { setLoading } = useAuth()
  const [userData, setUserData] = useState({ name: '', email: "" })

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      try {
        if (!token) {
          return;
        }
        fetchMe(token)
      } catch (err) {
        console.error(err);
        return;
      } finally {
        setLoading(false)
      }

    }
    init();
  }, [])

  async function fetchMe(token) {
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        return
      }
      setIsLoggedIn(true)
      const uData = JSON.parse(localStorage.getItem('userData'))
      setUserData(uData)
    } catch (err) {
      console.error(err)
    }

  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    router.push("/login");
  }

  const router = useRouter();

  return (

    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 items-center justify-between px-2 md:px-4 lg:px-8">
        <div className="flex items-center gap-1">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="rounded-xl p-2 transition hover:bg-gray-100">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="flex w-75 flex-col border-r p-0"
              >
                <SheetHeader className="border-b p-4">
                  <SheetTitle className="text-left text-3xl font-semibold tracking-tight text-amber-600" onClick={() => router.push('/')}>
                    Recalit
                  </SheetTitle>
                </SheetHeader>

                {isLoggedIn && <div className="flex flex-1 flex-col gap-2 p-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <House className="h-5 w-5 text-black" />
                      <Link href="/dashboard" className="font-semibold">dashboard</Link>

                    </div>


                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold">Recall</h3>
                    </div>

                    <div className="flex flex-col">
                      <button className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-100" onClick={() => router.push('/dashboard/recall/new')}>
                        Add Recall
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <button className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-100" onClick={() => router.push('/dashboard/recall')}>
                        Show Recalls
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <NotebookPen className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Journal</h3>
                    </div>

                    <div className="flex flex-col">
                      <button className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-100" onClick={() => router.push('/dashboard/journal/new')}>
                        Add Journal
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      <button className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-100" onClick={() => router.push('/dashboard/journal')}>
                        Find Journal
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <MessageSquareText className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Remarks</h3>
                    </div>

                    <div className="flex flex-col">
                      <button className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-gray-100">
                        Add Remark
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>}

                {isLoggedIn && <div className="border-t p-4">
                  <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 hover:bg-gray-100">
                    <Settings className="h-5 w-5" />
                    Settings
                  </button>

                  <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-red-500 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>}

              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="text-3xl font-semibold tracking-tight text-amber-600">
            Recalit
          </Link>
        </div>

        <div className="flex flex-row gap-2 ">
          {isLoggedIn && <div className="hidden items-center gap-2 lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent px-2 text-[15px] font-medium mr-4" asChild>
                    <Link href="/dashboard">dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium ">
                    Recall
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="flex w-45 flex-col py-1 max-w-fit text-nowrap">
                      <NavigationMenuLink className="rounded-md px-3 py-2 text-sm hover:bg-gray-100" onClick={() => router.push('/dashboard/recall/new')} >
                        Add Recall
                      </NavigationMenuLink>

                      <NavigationMenuLink className="rounded-md px-3 py-2 text-sm hover:bg-gray-100 " onClick={() => router.push('/dashboard/recall')}>
                        Show Recalls
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium">
                    Journal
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="flex w-45 flex-col py-1 max-w-fit text-nowrap">
                      <NavigationMenuLink
                        className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                        onClick={() => router.push("/dashboard/journal/new")}
                      >
                        Add Journal
                      </NavigationMenuLink>

                      <NavigationMenuLink className="rounded-md px-3 py-2 text-sm hover:bg-gray-100" onClick={() => router.push("/dashboard/journal")}>
                        Find Journal
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent px-2 text-[15px] font-medium">
                    Remarks
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="flex w-45 flex-col py-1 max-w-fit text-nowrap">
                      <NavigationMenuLink className="rounded-md px-3 py-2 text-sm hover:bg-gray-100">
                        Add Remark
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>}

          <div className="flex items-center gap-3">
            {isLoggedIn && <button className="hidden rounded-xl border p-2 transition hover:bg-gray-100 lg:block">
              <Bell className="h-5 w-5" />
            </button>}


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none ring-2 ring-gray-200 transition hover:scale-105">
                  <Avatar className="h-10 w-10 flex justify-center items-center">
                    <AvatarFallback
                      className={`bg-amber-600 font-semibold text-background text-xl  ${!isLoggedIn && "text-xl"}`}
                    >
                      {isLoggedIn ? `${userData.name[0]?.toUpperCase()}` : "👤"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              {isLoggedIn ? (
                <DropdownMenuContent align="end" className="w-max rounded-xl">
                  <div className="border-b px-3 py-3">
                    <h2 className="font-medium">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>

                  <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>



                  <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="cursor-pointer gap-2 py-2 text-red-500 focus:text-red-500" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent align="end" className="w-min rounded-xl">
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 py-2"
                    onClick={() => router.push("/login")}
                  >
                    <User className="h-4 w-4" />
                    Login
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer gap-2 py-2"
                    onClick={() => router.push("/register")}
                  >
                    <CreditCard className="h-4 w-4" />
                    Register
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
