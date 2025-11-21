"use client";
import Card from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { Input } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { useState } from "react";
import { vendors } from "../../lib/mockData";

export default function VendorPortalPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Vendor Portal</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Vendor Dashboard">
          <Table
            columns={[
              { key: "name", label: "Vendor" },
              { key: "compliance", label: "Compliance" },
              { key: "recentUploads", label: "Recent Uploads" },
            ]}
            rows={vendors.map((v) => ({ ...v, compliance: `${v.compliance}%` }))}
          />
        </Card>
        <Card title="Upload Invoice" action={<button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setUploadOpen(true)}>Upload</button>}>
          <div className="text-sm">Pre-validation preview appears here</div>
        </Card>
        <Card title="Compliance Checklist">
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" /> Contract referenced</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Items match SLA</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Pricing model applied</label>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Notification Center">
          <div className="space-y-2 text-sm">
            <div>Invoice INV-1002 flagged for exception</div>
            <div>Compliance score updated</div>
          </div>
        </Card>
        <Card title="Messages">
          <div className="space-y-3">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message" />
            <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm">Send</button>
          </div>
        </Card>
      </div>
      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Upload Invoice">
        <div className="space-y-3">
          <input type="file" className="w-full" />
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setUploadOpen(false)}>Upload</button>
        </div>
      </Modal>
    </div>
  );
}