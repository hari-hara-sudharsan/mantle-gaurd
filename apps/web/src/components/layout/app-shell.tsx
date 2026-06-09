import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-background overflow-hidden selection:bg-primary selection:text-black">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 relative">
                {/* Ambient background glow */}
                <div className="fixed top-0 right-0 p-[30rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 -translate-y-1/2 translate-x-1/2" />
                <div className="fixed bottom-0 left-0 p-[20rem] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10 translate-y-1/2 -translate-x-1/2" />

                <Topbar />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
