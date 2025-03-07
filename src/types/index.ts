// add types

export interface Store {
  id: string;
  "Seq No.": number;
  Label: string;
  City: string;
  State: string;
}

export interface SKU {
  id: string;
  Label: string;
  Class: string;
  Department: string;
  Price: string;
  Cost: string;
}

export interface ChartData {
  Week: string;
  "GM Dollars": string;
  "Sales Dollars": string;
  "GM %": string;
}

export interface CalculationData {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
  "Sales Dollars": string;
  "Cost Dollars": string;
  "GM Dollars": string;
  "GM %": string;
}
