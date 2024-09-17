import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/atoms/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/atoms/chart";
import { RootState, useAppSelector } from "@/store/store";
import { generateDate } from "@/utils";

export const description = "A donut chart with text";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  settled: {
    label: "Settled",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  ongoing: {
    label: "Ongoing",
    color: "hsl(212 95% 68%)",
  },
  mc: {
    label: "MC Matters",
    color: "hsl(216 92% 60%)",
  },
  chc: {
    label: "CHC",
    color: "hsl(210 98% 78%)",
  },
  dnma: {
    label: "DNMA",
    color: "hsl(212 97% 87%)",
  },
} satisfies ChartConfig;

export const DashboardPieChart = () => {
  const { casesCountByLabel } = useAppSelector(
    (state: RootState) => state.rootState
  );

  const chartData = [
    {
      browser: "settled",
      visitors: casesCountByLabel.Settled,
      fill: "var(--color-settled)",
    },
    {
      browser: "ongoing",
      visitors: casesCountByLabel.Ongoing,
      fill: "var(--color-ongoing)",
    },
    {
      browser: "mc",
      visitors: casesCountByLabel.MC_Matters,
      fill: "var(--color-mc)",
    },
    {
      browser: "chc",
      visitors: casesCountByLabel.CHC,
      fill: "var(--color-chc)",
    },
    {
      browser: "dnma",
      visitors: casesCountByLabel.DNMA,
      fill: "var(--color-dnma)",
    },
  ];
  const totalCases = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Overview</CardTitle>
        <CardDescription>{`Date: ${generateDate()}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCases.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Cases
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Only Settled, Ongoing, MC_Matters, CHC & DNMA cases
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          This graph is genereated based on the uploaded data.
        </div>
      </CardFooter>
    </Card>
  );
};
