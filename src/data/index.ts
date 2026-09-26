import { Division } from "./types";
import { accountingDivision } from "./divisions/accounting";
import { marketingDivision } from "./divisions/marketing";
import { hrDivision } from "./divisions/hr";

export const DIVISIONS: Division[] = [
  accountingDivision,
  marketingDivision,
  hrDivision,
];
