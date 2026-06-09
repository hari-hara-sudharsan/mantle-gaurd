"use client"

import { useMemo } from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/page-header"
import { SectionCard } from "@/components/shared/section-card"

interface LogEntry {
    timestamp: string
    event: string
    contract: string
    status: string
}

const data: LogEntry[] = [
    { timestamp: "09:12:24", event: "Transfer event", contract: "BridgeRouter", status: "Completed" },
    { timestamp: "09:17:53", event: "Approval call", contract: "Treasury", status: "Pending" },
    { timestamp: "09:35:07", event: "Rebase update", contract: "Vault", status: "Success" },
    { timestamp: "09:49:12", event: "Oracle sync", contract: "PriceOracle", status: "Success" },
    { timestamp: "10:04:31", event: "Liquidity add", contract: "SwapPool", status: "Warning" },
]

const columns: ColumnDef<LogEntry>[] = [
    { accessorKey: "timestamp", header: "Time" },
    { accessorKey: "event", header: "Event" },
    { accessorKey: "contract", header: "Contract" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const value = String(getValue())
            const tone = value === "Success" ? "success" : value === "Warning" ? "warning" : "default"
            return <Badge variant="outline" className={tone === "success" ? "border-emerald-400/20 text-emerald-300 bg-emerald-400/10" : tone === "warning" ? "border-amber-400/20 text-amber-300 bg-amber-400/10" : "border-white/10 text-white/60 bg-white/5"}>{value}</Badge>
        }
    }
]

export default function LogsPage() {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
    const rows = useMemo(() => table.getRowModel().rows, [table])

    return (
        <div className="min-h-screen">
            <PageHeader
                title="On-chain Logs"
                description="Correlate events, transaction status, and contract behavior across Mantle transactions."
            />

            <SectionCard
                title="Live ledger"
                description="Timestamped event stream"
            >
                <Table className="mt-4">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SectionCard>
        </div>
    )
}
