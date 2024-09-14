import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../atoms/card";

type IProps = {
  title: string;
  value: number;
  comparison: string;
  icon: LucideIcon;
};

export const SummaryCard = ({
  title,
  value,
  comparison,
  icon: Icon,
}: IProps) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-8 w-8 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{comparison}</p>
      </CardContent>
    </Card>
  );
};
