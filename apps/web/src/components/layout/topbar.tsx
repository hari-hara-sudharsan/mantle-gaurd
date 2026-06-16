"use client"

import { useState } from "react"
import { Search, Bell, Sun, Moon, Menu, LogIn, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "./sidebar"
import { useAuth } from "@/providers/auth-provider"
import { UserMenu } from "@/components/auth/user-menu"
import { LoginDialog } from "@/components/auth/login-dialog"
import { SignupDialog } from "@/components/auth/signup-dialog"

export function Topbar() {
    const { isAuthenticated, isLoading } = useAuth()
    const [loginOpen, setLoginOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)

    const handleSwitchToSignup = () => {
        setLoginOpen(false)
        setSignupOpen(true)
    }

    const handleSwitchToLogin = () => {
        setSignupOpen(false)
        setLoginOpen(true)
    }

    return (
        <>
            <header className="h-16 border-b border-border glass flex items-center justify-between px-4 md:px-6 z-10 sticky top-0">
                <div className="flex items-center gap-4 flex-1">
                    <Sheet>
                        <SheetTrigger className="md:hidden text-muted-foreground mr-2 inline-flex size-8 items-center justify-center rounded-lg hover:bg-muted">
                            <Menu className="w-5 h-5" />
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 border-r border-white/5 w-64 bg-background">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>

                    <div className="relative w-full max-w-md hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search transactions, blocks, or addresses..."
                            className="pl-10 bg-black/20 border-white/5 focus-visible:ring-primary h-9 rounded-full"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="hidden lg:inline-flex border-primary text-primary bg-primary/10">
                        Mantle Network
                    </Badge>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Bell className="w-5 h-5" />
                    </Button>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Sun className="w-5 h-5 dark:hidden" />
                        <Moon className="w-5 h-5 hidden dark:block" />
                    </Button>

                    {!isLoading && (
                        isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setLoginOpen(true)}
                                    className="gap-2"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span className="hidden sm:inline">Login</span>
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => setSignupOpen(true)}
                                    className="gap-2"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    <span className="hidden sm:inline">Sign Up</span>
                                </Button>
                            </div>
                        )
                    )}
                </div>
            </header>

            <LoginDialog
                open={loginOpen}
                onOpenChange={setLoginOpen}
                onSwitchToSignup={handleSwitchToSignup}
            />
            <SignupDialog
                open={signupOpen}
                onOpenChange={setSignupOpen}
                onSwitchToLogin={handleSwitchToLogin}
            />
        </>
    )
}
