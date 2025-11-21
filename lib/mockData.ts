export type Contract = {
  id: string;
  name: string;
  vendor: string;
  status: string;
  confidence: number;
  billable_items: { name: string; unit: string; rate: number }[];
  pricing_models: { type: string; detail: string }[];
  service_requirements: { name: string; value: string }[];
  slas: { name: string; response: string; resolution: string }[];
  locations: string[];
  variance_rules: { name: string; threshold: number }[];
};

export const contracts: Contract[] = [
  {
    id: "C-001",
    name: "Global IT Services",
    vendor: "TechCorp",
    status: "Active",
    confidence: 0.92,
    billable_items: [
      { name: "Managed Support", unit: "hour", rate: 120 },
      { name: "Cloud Storage", unit: "GB", rate: 0.25 },
    ],
    pricing_models: [
      { type: "Tiered", detail: "0-1000 GB: $0.25, 1000+ GB: $0.20" },
      { type: "Hourly", detail: "$120/hr for support" },
    ],
    service_requirements: [
      { name: "Response Time", value: "< 2 hours" },
      { name: "Uptime", value: "99.9%" },
    ],
    slas: [
      { name: "Severity 1", response: "1h", resolution: "4h" },
      { name: "Severity 2", response: "4h", resolution: "24h" },
    ],
    locations: ["US-East", "EU-West"],
    variance_rules: [
      { name: "Rate variance", threshold: 5 },
      { name: "Quantity variance", threshold: 10 },
    ],
  },
  {
    id: "C-002",
    name: "Facilities Maintenance",
    vendor: "MaintainCo",
    status: "Pending",
    confidence: 0.78,
    billable_items: [{ name: "On-site visit", unit: "visit", rate: 250 }],
    pricing_models: [{ type: "Fixed", detail: "$250 per visit" }],
    service_requirements: [{ name: "Visit window", value: "48h" }],
    slas: [{ name: "Response", response: "8h", resolution: "72h" }],
    locations: ["HQ", "Warehouse"],
    variance_rules: [{ name: "Visit variance", threshold: 2 }],
  },
];

export type Invoice = { id: string; date: string; vendor: string; status: string; amount: number };
export const invoices: Invoice[] = [
  { id: "INV-1001", date: "2025-10-02", vendor: "TechCorp", status: "Ready", amount: 12450 },
  { id: "INV-1002", date: "2025-10-12", vendor: "MaintainCo", status: "Exception", amount: 980 },
];

export type ValidationLineItem = {
  item_description: string;
  matched_contract_item: string;
  contract_price: string;
  variance: string;
  confidence: number;
};
export const validationLineItems: ValidationLineItem[] = [
  {
    item_description: "Managed Support - 100 hours",
    matched_contract_item: "Managed Support",
    contract_price: "$120/hr",
    variance: "+3%",
    confidence: 0.88,
  },
  {
    item_description: "Cloud Storage - 1500 GB",
    matched_contract_item: "Cloud Storage",
    contract_price: "$0.25/GB tiered",
    variance: "-2%",
    confidence: 0.91,
  },
];

export type Exception = { id: string; severity: string; type: string; vendor: string; status: string; variance: string };
export const exceptions: Exception[] = [
  { id: "EX-01", severity: "High", type: "Rate Mismatch", vendor: "TechCorp", status: "Open", variance: "+12%" },
  { id: "EX-02", severity: "Medium", type: "Missing Data", vendor: "MaintainCo", status: "Investigating", variance: "N/A" },
];

export type Vendor = { id: string; name: string; compliance: number; recentUploads: number };
export const vendors: Vendor[] = [
  { id: "V-001", name: "TechCorp", compliance: 92, recentUploads: 3 },
  { id: "V-002", name: "MaintainCo", compliance: 84, recentUploads: 1 },
];