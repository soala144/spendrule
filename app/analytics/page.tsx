"use client";
import Card from "../../components/ui/Card";
import ChartPlaceholder from "../../components/ui/ChartPlaceholder";
import { Table } from "../../components/ui/Table";
import { Input, Select } from "../../components/ui/Input";
import Drawer from "../../components/ui/Drawer";
import { useState } from "react";
import { validationLineItems } from "../../lib/mockData";

export default function AnalyticsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Line-Item Analytics</div>
      <Card title="Filters">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input placeholder="Date range" />
          <Input placeholder="Vendor" />
          <Input placeholder="Category" />
          <Select>
            <option>Contract</option>
            <option>Global IT Services</option>
            <option>Facilities Maintenance</option>
          </Select>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartPlaceholder title="Spend Trend" />
        <ChartPlaceholder title="Anomalies" />
        <ChartPlaceholder title="Patterns" />
      </div>
      <Card title="Benchmarking">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm mb-2">Similarity Threshold</div>
            <input type="range" min={0} max={100} defaultValue={70} className="w-full" />
          </div>
          <div>
            <div className="text-sm mb-2">Variance Tolerance</div>
            <input type="range" min={0} max={20} defaultValue={5} className="w-full" />
          </div>
          <div>
            <div className="text-sm mb-2">Benchmark Group</div>
            <Select>
              <option>Industry Peer</option>
              <option>Internal</option>
            </Select>
          </div>
        </div>
      </Card>
      <Card title="Line-Item Spend" action={<button className="rounded-md border px-3 py-2 text-sm" onClick={() => setOpen(true)}>Drill Down</button>}>
        <Table
          columns={[
            { key: "item_description", label: "Item" },
            { key: "matched_contract_item", label: "Contract Item" },
            { key: "variance", label: "Variance" },
            { key: "confidence", label: "Confidence" },
          ]}
          rows={validationLineItems.map((li) => ({ ...li, confidence: `${Math.round(li.confidence * 100)}%` }))}
        />
      </Card>
      <Card title="Explore Savings Opportunities">
        <div className="flex items-center justify-between">
          <div className="text-sm">Identify renegotiation candidates and rate optimization</div>
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm">Explore</button>
        </div>
      </Card>
      <Drawer open={open} onClose={() => setOpen(false)} title="Drill-down Analytics">
        <div className="space-y-4">
          <ChartPlaceholder title="Item Distribution" />
          <ChartPlaceholder title="Vendor Comparison" />
          <ChartPlaceholder title="Monthly Trend" />
        </div>
      </Drawer>
    </div>
  );
}