"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/app/components/ui/chart"

const chartData = [
    { month: "Jan", special: 2, personal: 5, mandatory: 3 },
    { month: "Feb", special: 4, personal: 6, mandatory: 2 },
    { month: "Mar", special: 1, personal: 4, mandatory: 1 },
    { month: "Apr", special: 3, personal: 7, mandatory: 4 },
    { month: "May", special: 5, personal: 3, mandatory: 2 },
    { month: "Jun", special: 2, personal: 5, mandatory: 3 },
]

const chartConfig = {
    mandatory: {
        label: "Mandatory",
        color: "var(--chart-3)",
    },
    personal: {
        label: "Personal",
        color: "var(--chart-2)",
    },
    special: {
        label: "Special",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function LeaveChart() {
    return (
        <Card className="rounded-md border-none shadow-none">
            <CardHeader>
                <CardDescription>
                    Showing leave requests for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillMandatory" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillPersonal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillSpecial" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="mandatory"
                            type="natural"
                            fill="url(#fillMandatory)"
                            fillOpacity={0.4}
                            stroke="var(--chart-3)"
                            stackId="a"
                        />
                        <Area
                            dataKey="personal"
                            type="natural"
                            fill="url(#fillPersonal)"
                            fillOpacity={0.4}
                            stroke="var(--chart-2)"
                            stackId="a"
                        />
                        <Area
                            dataKey="special"
                            type="natural"
                            fill="url(#fillSpecial)"
                            fillOpacity={0.4}
                            stroke="var(--chart-1)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}