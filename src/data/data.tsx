import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "dnma",
    label: "DNMA",
  },
  {
    value: "withdrawn",
    label: "Withdrawn",
  },
  {
    value: "settled",
    label: "Settled",
  },
  {
    value: "ongoing",
    label: "Ongoing",
  },
  {
    value: "mc matters",
    label: "MC Matters",
  },
  {
    value: "chc",
    label: "CHC",
  },
  {
    value: "outstation",
    label: "Outstation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const companies = ["Idle", "MBSL", "COMMERCIAL", "HNB"];

export const Labels = [
  "Idle",
  "DNMA",
  "Withdrawn",
  "Settled",
  "Ongoing",
  "MC Matters",
  "CHC",
  "Outstation",
];
