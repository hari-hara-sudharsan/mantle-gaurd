import { jsPDF } from 'jspdf'

export interface AuditPDFData {
    securityScore: number
    scoreBreakdown: {
        accessControl: number
        reentrancy: number
        storageSafety: number
        inputValidation: number
        mantleCompatibility: number
    }
    issues: Array<{
        severity: string
        title: string
        description: string
        impact: string
        suggestedFix: string
        location?: string
    }>
    mantleInsights: string[]
}

export interface GasPDFData {
    totalGas: number
    daFee: number
    estimatedMNT: number
    optimizationScore: number
    functions: Array<{
        name: string
        gas: number
        severity: string
        estimatedSavings?: string
    }>
    optimizations: Array<{
        severity: string
        problem: string
        suggestion: string
        estimatedSavings: string
    }>
}

export function generateAuditPDF(data: AuditPDFData): void {
    const doc = new jsPDF()
    let yPos = 20

    // Helper function to add text with line wrapping
    const addText = (text: string, x: number, y: number, maxWidth: number = 170): number => {
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return y + (lines.length * 7)
    }

    // Title
    doc.setFontSize(24)
    doc.setTextColor(0, 0, 0)
    doc.text('MantleGuard Security Audit', 20, yPos)
    yPos += 15

    // Date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPos)
    yPos += 15

    // Security Score
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text('Security Overview', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    const scoreColor = data.securityScore >= 80 ? [34, 197, 94] : data.securityScore >= 60 ? [234, 179, 8] : [239, 68, 68]
    doc.setTextColor(...scoreColor)
    doc.text(`Overall Score: ${data.securityScore}/100`, 20, yPos)
    yPos += 10

    doc.setTextColor(0, 0, 0)
    const criticalCount = data.issues.filter(i => i.severity === 'critical').length
    const highCount = data.issues.filter(i => i.severity === 'high').length
    doc.text(`Critical Issues: ${criticalCount}`, 20, yPos)
    yPos += 7
    doc.text(`High Issues: ${highCount}`, 20, yPos)
    yPos += 7
    doc.text(`Total Issues: ${data.issues.length}`, 20, yPos)
    yPos += 15

    // Score Breakdown
    if (yPos > 250) {
        doc.addPage()
        yPos = 20
    }

    doc.setFontSize(16)
    doc.text('Score Breakdown', 20, yPos)
    yPos += 10

    doc.setFontSize(11)
    Object.entries(data.scoreBreakdown).forEach(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        doc.text(`${label}: ${value}/100`, 20, yPos)
        yPos += 7
    })
    yPos += 10

    // Critical and High Issues
    const highPriorityIssues = data.issues.filter(i => i.severity === 'critical' || i.severity === 'high')
    if (highPriorityIssues.length > 0) {
        if (yPos > 240) {
            doc.addPage()
            yPos = 20
        }

        doc.setFontSize(16)
        doc.text('Critical & High Priority Issues', 20, yPos)
        yPos += 10

        highPriorityIssues.forEach((issue, index) => {
            if (yPos > 250) {
                doc.addPage()
                yPos = 20
            }

            doc.setFontSize(12)
            doc.setFont(undefined, 'bold')
            const severityColor = issue.severity === 'critical' ? [239, 68, 68] : [249, 115, 22]
            doc.setTextColor(...severityColor)
            yPos = addText(`${index + 1}. ${issue.title}`, 20, yPos, 170)
            yPos += 3

            doc.setFont(undefined, 'normal')
            doc.setTextColor(0, 0, 0)
            doc.setFontSize(10)

            if (issue.location) {
                doc.text(`Location: ${issue.location}`, 25, yPos)
                yPos += 7
            }

            yPos = addText(`Impact: ${issue.impact}`, 25, yPos, 165)
            yPos += 3
            yPos = addText(`Fix: ${issue.suggestedFix}`, 25, yPos, 165)
            yPos += 10
        })
    }

    // Mantle Insights
    if (data.mantleInsights.length > 0) {
        if (yPos > 240) {
            doc.addPage()
            yPos = 20
        }

        doc.setFontSize(16)
        doc.setTextColor(0, 0, 0)
        doc.text('Mantle L2 Insights', 20, yPos)
        yPos += 10

        doc.setFontSize(10)
        data.mantleInsights.forEach((insight) => {
            if (yPos > 270) {
                doc.addPage()
                yPos = 20
            }
            yPos = addText(`• ${insight}`, 20, yPos, 170)
            yPos += 5
        })
    }

    // Footer on last page
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' })
        doc.text('Generated by MantleGuard AI Security Suite', 105, 290, { align: 'center' })
    }

    // Save PDF
    doc.save(`mantleguard-audit-${Date.now()}.pdf`)
}

export function generateGasPDF(data: GasPDFData): void {
    const doc = new jsPDF()
    let yPos = 20

    // Helper function to add text with line wrapping
    const addText = (text: string, x: number, y: number, maxWidth: number = 170): number => {
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return y + (lines.length * 7)
    }

    // Title
    doc.setFontSize(24)
    doc.setTextColor(0, 0, 0)
    doc.text('MantleGuard Gas Analysis', 20, yPos)
    yPos += 15

    // Date
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, yPos)
    yPos += 15

    // Gas Overview
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text('Gas Consumption Overview', 20, yPos)
    yPos += 10

    doc.setFontSize(12)
    doc.text(`Total Gas: ${data.totalGas.toLocaleString()}`, 20, yPos)
    yPos += 7
    doc.text(`DA Fee: ${data.daFee.toFixed(4)} ETH`, 20, yPos)
    yPos += 7
    doc.text(`Estimated MNT Cost: ${data.estimatedMNT.toFixed(2)} MNT`, 20, yPos)
    yPos += 10

    const scoreColor = data.optimizationScore >= 80 ? [34, 197, 94] : data.optimizationScore >= 60 ? [234, 179, 8] : [239, 68, 68]
    doc.setTextColor(...scoreColor)
    doc.text(`Optimization Score: ${data.optimizationScore}/100`, 20, yPos)
    yPos += 15

    // Function Analysis
    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text('Function Gas Consumption', 20, yPos)
    yPos += 10

    doc.setFontSize(10)
    data.functions.slice(0, 10).forEach((func) => {
        if (yPos > 260) {
            doc.addPage()
            yPos = 20
        }

        const severityColor = func.severity === 'high' ? [239, 68, 68] : func.severity === 'medium' ? [234, 179, 8] : [34, 197, 94]
        doc.setTextColor(...severityColor)
        doc.text(`• ${func.name}`, 20, yPos)

        doc.setTextColor(0, 0, 0)
        doc.text(`: ${func.gas.toLocaleString()} gas`, 80, yPos)

        if (func.estimatedSavings) {
            doc.setTextColor(34, 197, 94)
            doc.text(`(Save ${func.estimatedSavings})`, 120, yPos)
        }

        yPos += 7
    })
    yPos += 10

    // Optimization Opportunities
    if (data.optimizations.length > 0) {
        if (yPos > 230) {
            doc.addPage()
            yPos = 20
        }

        doc.setFontSize(16)
        doc.setTextColor(0, 0, 0)
        doc.text('Optimization Opportunities', 20, yPos)
        yPos += 10

        doc.setFontSize(10)
        data.optimizations.slice(0, 8).forEach((opt, index) => {
            if (yPos > 250) {
                doc.addPage()
                yPos = 20
            }

            doc.setFont(undefined, 'bold')
            const severityColor = opt.severity === 'high' ? [239, 68, 68] : opt.severity === 'medium' ? [234, 179, 8] : [100, 100, 100]
            doc.setTextColor(...severityColor)
            yPos = addText(`${index + 1}. ${opt.problem}`, 20, yPos, 170)

            doc.setFont(undefined, 'normal')
            doc.setTextColor(0, 0, 0)
            yPos += 3
            yPos = addText(`Solution: ${opt.suggestion}`, 25, yPos, 165)
            yPos += 3

            doc.setTextColor(34, 197, 94)
            doc.text(`Estimated Savings: ${opt.estimatedSavings}`, 25, yPos)
            yPos += 10
        })
    }

    // Footer on all pages
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' })
        doc.text('Generated by MantleGuard Gas Profiler', 105, 290, { align: 'center' })
    }

    // Save PDF
    doc.save(`mantleguard-gas-analysis-${Date.now()}.pdf`)
}
