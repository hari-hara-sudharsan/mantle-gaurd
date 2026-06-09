import { Search, Bell, Sun, Moon, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "./sidebar"

export function Topbar() {
    return (
        <header className="h-16 border-b border-border glass flex items-center justify-between px-4 md:px-6 z-10 sticky top-0">
            <div className="flex items-center gap-4 flex-1">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground mr-2">
                            <Menu className="w-5 h-5" />
                        </Button>
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

            <div className="flex items-center gap-4">
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

                {/* Placeholder for RainbowKit ConnectButton */}
                <Button className="bg-primary text-black hover:bg-primary/90 shadow-neon font-semibold rounded-full h-9 px-6 font-sans">
                    Connect Wallet
                </Button>
            </div>
        </header>
    )
}
