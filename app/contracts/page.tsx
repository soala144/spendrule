"use client";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import { Table } from "../../components/ui/Table";
import { Tabs } from "../../components/ui/Tabs";
import Drawer from "../../components/ui/Drawer";
import Modal from "../../components/ui/Modal";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/EmptyState";
import { Input } from "../../components/ui/Input";
import { useState } from "react";
import { contracts, Contract } from "../../lib/mockData";

export default function ContractsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Contract | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = contracts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Contract Intelligence</div>
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setUploadOpen(true)}>Upload Contract</button>
        </div>
      </div>

      <Card title="Key Metrics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500">Billable Items</div>
            <div className="text-2xl font-semibold">{contracts.reduce((acc, c) => acc + c.billable_items.length, 0)}</div>
          </div>
          <div className="rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500">Pricing Models</div>
            <div className="text-2xl font-semibold">{contracts.reduce((acc, c) => acc + c.pricing_models.length, 0)}</div>
          </div>
          <div className="rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-xs text-zinc-500">Service Requirements</div>
            <div className="text-2xl font-semibold">{contracts.reduce((acc, c) => acc + c.service_requirements.length, 0)}</div>
          </div>
        </div>
      </Card>

      <Card title="Contracts">
        <div className="flex items-center gap-3 mb-4">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contracts" />
          <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setLoading(true)}>Load State</button>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setError("Failed to load contracts")}>Error State</button>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={() => { setLoading(false); setError(null); }}>Reset</button>
        </div>
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        )}
        {!loading && error && (
          <EmptyState title="Unable to load" description={error} action={<button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setError(null)}>Retry</button>} />
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <div key={c.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.name}</div>
                  <Badge variant={c.status === "Active" ? "success" : "warning"}>{c.status}</Badge>
                </div>
                <div className="text-sm text-zinc-500">Vendor: {c.vendor}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Confidence</span>
                  <span className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded overflow-hidden">
                    <span style={{ width: `${Math.round(c.confidence * 100)}%` }} className="block h-full bg-green-500" />
                  </span>
                  <span>{Math.round(c.confidence * 100)}%</span>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md border px-3 py-2 text-sm" onClick={() => { setSelected(c); setDrawerOpen(true); }}>Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected?.name}>
        {selected && (
          <Tabs
            tabs={[
              {
                key: "overview",
                label: "Overview",
                content: (
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Contract ID: {selected.id}</div>
                      <div>Vendor: {selected.vendor}</div>
                      <div>Contract Title: [[Not Specified]]</div>
                      <div>Contract Type: [[Not Specified]]</div>
                      <div>Effective Date: [[Not Specified]]</div>
                      <div>Expiration Date: [[Not Specified]]</div>
                      <div>Governing Law: [[Not Specified]]</div>
                      <div>Auto-renewal: [[Not Specified]]</div>
                    </div>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                      <div className="font-medium mb-2">Parties</div>
                      <div>Primary: [[Not Specified]]</div>
                      <div>Participants: [[Not Specified]]</div>
                    </div>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                      <div className="font-medium mb-2">Payment Terms</div>
                      <div>Schedule: [[Not Specified]]</div>
                      <div>Method: [[Not Specified]]</div>
                      <div>Net Days: [[Not Specified]]</div>
                      <div>Currency: [[Not Specified]]</div>
                    </div>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                      <div className="font-medium mb-2">External IDs</div>
                      <div>ERP: [[Not Specified]]</div>
                      <div>CRM: [[Not Specified]]</div>
                    </div>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                      <div className="font-medium mb-2">Locations</div>
                      <div>{selected.locations.join(", ")}</div>
                    </div>
                  </div>
                ),
              },
              {
                key: "items",
                label: "Items",
                content: (
                  <Table
                    columns={[
                      { key: "name", label: "Item" },
                      { key: "unit", label: "Unit" },
                      { key: "rate", label: "Rate" },
                    ]}
                    rows={selected.billable_items}
                  />
                ),
              },
              {
                key: "pricing",
                label: "Pricing Models",
                content: (
                  <Table
                    columns={[
                      { key: "type", label: "Type" },
                      { key: "detail", label: "Detail" },
                    ]}
                    rows={selected.pricing_models}
                  />
                ),
              },
              {
                key: "slas",
                label: "SLAs",
                content: (
                  <Table
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "response", label: "Response" },
                      { key: "resolution", label: "Resolution" },
                    ]}
                    rows={selected.slas}
                  />
                ),
              },
              {
                key: "locations",
                label: "Locations",
                content: (
                  <div className="text-sm">{selected.locations.join(", ")}</div>
                ),
              },
              {
                key: "variance",
                label: "Variance Rules",
                content: (
                  <Table
                    columns={[
                      { key: "name", label: "Rule" },
                      { key: "threshold", label: "Threshold (%)" },
                    ]}
                    rows={selected.variance_rules}
                  />
                ),
              },
            ]}
          />
        )}
      </Drawer>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Contract">
        <div className="space-y-3">
          <input type="file" className="w-full" />
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setUploadOpen(false)}>Upload</button>
        </div>
      </Modal>
    </div>
  );
}