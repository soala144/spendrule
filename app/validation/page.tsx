"use client";
import Card from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { Input, Select } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Drawer from "../../components/ui/Drawer";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/EmptyState";
import { useState } from "react";
import { invoices, validationLineItems, contracts, Invoice } from "../../lib/mockData";

export default function ValidationPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Real-Time Invoice Validation</div>
        <div className="flex items-center gap-2">
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setUploadOpen(true)}>Upload Invoice</button>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setLoading(true)}>Load State</button>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setError("Validation service unavailable")}>Error State</button>
          <button className="rounded-md border px-3 py-2 text-sm" onClick={() => { setLoading(false); setError(null); }}>Reset</button>
        </div>
      </div>

      <Card title="Invoices">
        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        )}
        {!loading && error && (
          <EmptyState title="Unable to load" description={error} />
        )}
        {!loading && !error && (
          <Table
            columns={[
              { key: "id", label: "Invoice" },
              { key: "date", label: "Date" },
              { key: "vendor", label: "Vendor" },
              { key: "status", label: "Status" },
              { key: "amount", label: "Amount" },
              { key: "actions", label: "Actions" },
            ]}
            rows={invoices.map((inv) => ({
              ...inv,
              amount: `$${inv.amount.toLocaleString()}`,
              actions: (
                <div className="flex gap-2">
                  <button className="rounded-md border px-2 py-1 text-xs" onClick={() => { setSelectedInvoice(inv); setComparisonOpen(true); }}>Compare</button>
                  <button className="rounded-md border px-2 py-1 text-xs">View Exceptions</button>
                </div>
              ),
            }))}
          />
        )}
      </Card>

      <Card title="Validation Preview" action={<button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm">Run Validation</button>}>
        <Table
          columns={[
            { key: "item_description", label: "Line Item" },
            { key: "matched_contract_item", label: "Matched Contract Item" },
            { key: "contract_price", label: "Contract Price" },
            { key: "variance", label: "Variance" },
            { key: "confidence", label: "Confidence" },
          ]}
          rows={validationLineItems.map((li) => ({
            ...li,
            confidence: `${Math.round(li.confidence * 100)}%`,
          }))}
        />
      </Card>

      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Invoice">
        <div className="space-y-3">
          <input type="file" className="w-full" />
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setUploadOpen(false)}>Upload</button>
        </div>
      </Modal>

      <Drawer open={comparisonOpen} onClose={() => setComparisonOpen(false)} title="Invoice vs Contract">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card title="Invoice">
              <div className="space-y-2 text-sm">
                <div>ID: {selectedInvoice?.id}</div>
                <div>Vendor: {selectedInvoice?.vendor}</div>
                <div>Amount: ${selectedInvoice?.amount?.toLocaleString?.() || selectedInvoice?.amount}</div>
              </div>
            </Card>
            <Card title="Contract">
              <Select>
                {contracts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Card>
          </div>
          <Card title="Line Item Comparison">
            <Table
              columns={[
                { key: "item_description", label: "Invoice Item" },
                { key: "matched_contract_item", label: "Contract Item" },
                { key: "contract_price", label: "Price" },
                { key: "variance", label: "Variance" },
                { key: "confidence", label: "Confidence" },
              ]}
              rows={validationLineItems.map((li) => ({ ...li, confidence: `${Math.round(li.confidence * 100)}%` }))}
            />
          </Card>
        </div>
      </Drawer>
    </div>
  );
}