"use client";
import Card from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { Input, Select } from "../../components/ui/Input";
import Drawer from "../../components/ui/Drawer";
import EmptyState from "../../components/EmptyState";
import { useState } from "react";
import { exceptions, contracts, Exception } from "../../lib/mockData";

export default function ExceptionsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [filterVendor, setFilterVendor] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [selected, setSelected] = useState<Exception | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = exceptions.filter((e) =>
    (!filterSeverity || e.severity === filterSeverity) &&
    (!filterType || e.type === filterType) &&
    (!filterVendor || e.vendor === filterVendor) &&
    (!filterStatus || e.status === filterStatus)
  );

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Exception Management</div>

      <Card title="Filters">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
            <option value="">Severity</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Select>
          <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Type</option>
            <option>Rate Mismatch</option>
            <option>Missing Data</option>
            <option>Quantity Variance</option>
          </Select>
          <Select value={filterVendor} onChange={(e) => setFilterVendor(e.target.value)}>
            <option value="">Vendor</option>
            {Array.from(new Set(exceptions.map((e) => e.vendor))).map((v) => (
              <option key={v}>{v}</option>
            ))}
          </Select>
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Status</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </Select>
        </div>
      </Card>

      <Card title="Exceptions">
        {filtered.length === 0 ? (
          <EmptyState title="No exceptions match filters" />
        ) : (
          <Table
            columns={[
              { key: "id", label: "ID" },
              { key: "severity", label: "Severity" },
              { key: "type", label: "Type" },
              { key: "vendor", label: "Vendor" },
              { key: "status", label: "Status" },
              { key: "variance", label: "Variance" },
              { key: "actions", label: "Actions" },
            ]}
            rows={filtered.map((e) => ({
              ...e,
              actions: (
                <div className="flex gap-2">
                  <button className="rounded-md border px-2 py-1 text-xs" onClick={() => { setSelected(e); setOpen(true); }}>View</button>
                  <button className="rounded-md border px-2 py-1 text-xs">Resolve</button>
                </div>
              ),
            }))}
          />
        )}
      </Card>

      <Drawer open={open} onClose={() => setOpen(false)} title={`Exception ${selected?.id}`}>
        <div className="space-y-4">
          <Card title="Details">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>Severity: {selected?.severity}</div>
              <div>Type: {selected?.type}</div>
              <div>Vendor: {selected?.vendor}</div>
              <div>Status: {selected?.status}</div>
              <div>Variance: {selected?.variance}</div>
            </div>
          </Card>
          <Card title="Timeline">
            <div className="space-y-2 text-sm">
              <div>2025-10-12 Created</div>
              <div>2025-10-13 Assigned</div>
              <div>2025-10-14 Comment added</div>
            </div>
          </Card>
          <Card title="Comments">
            <div className="space-y-2">
              <Input placeholder="Add a comment" />
              <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm">Post</button>
            </div>
          </Card>
          <Card title="Contract Clause Reference">
            <div className="text-sm">Select contract</div>
            <Select>
              {contracts.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </Select>
            <div className="mt-3 text-sm">Clause snippet is shown here</div>
          </Card>
          <Card title="Similar Exceptions">
            <div className="space-y-2 text-sm">
              <div>Rate mismatch on TechCorp March invoice</div>
              <div>Quantity variance on Cloud Storage April invoice</div>
            </div>
          </Card>
        </div>
      </Drawer>
    </div>
  );
}