"use client";
import Card from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { Input, Select } from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { useState } from "react";
import { contracts, validationLineItems } from "../../lib/mockData";

export default function AIInvoicePage() {
  const [wizardOpen, setWizardOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [contractId, setContractId] = useState(contracts[0]?.id || "");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">AI Invoice Generator</div>
        <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setWizardOpen(true)}>Open Generator</button>
      </div>
      <Card title="Generated Invoice Preview" action={<div className="flex gap-2"><button className="rounded-md border px-3 py-2 text-sm">Submit for validation</button><button className="rounded-md border px-3 py-2 text-sm">Save as draft</button></div>}>
        <Table
          columns={[
            { key: "item_description", label: "Item" },
            { key: "matched_contract_item", label: "Contract Item" },
            { key: "contract_price", label: "Price" },
            { key: "variance", label: "Variance" },
            { key: "confidence", label: "Confidence" },
          ]}
          rows={validationLineItems.map((li) => ({ ...li, confidence: `${Math.round(li.confidence * 100)}%` }))}
        />
        <div className="mt-4 text-sm">Confidence and explanation appear here</div>
      </Card>

      <Modal open={wizardOpen} onClose={() => setWizardOpen(false)} title="AI Invoice Generator">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button className={`rounded-md px-3 py-2 text-sm border ${step === 1 ? "bg-zinc-900 text-white" : ""}`} onClick={() => setStep(1)}>Select Contract</button>
            <button className={`rounded-md px-3 py-2 text-sm border ${step === 2 ? "bg-zinc-900 text-white" : ""}`} onClick={() => setStep(2)}>Select Services</button>
            <button className={`rounded-md px-3 py-2 text-sm border ${step === 3 ? "bg-zinc-900 text-white" : ""}`} onClick={() => setStep(3)}>Amounts</button>
            <button className={`rounded-md px-3 py-2 text-sm border ${step === 4 ? "bg-zinc-900 text-white" : ""}`} onClick={() => setStep(4)}>Review</button>
          </div>
          {step === 1 && (
            <div className="space-y-2">
              <div className="text-sm">Select contract</div>
              <Select value={contractId} onChange={(e) => setContractId(e.target.value)}>
                {contracts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
              <div className="flex justify-end">
                <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setStep(2)}>Next</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <div className="text-sm">Select delivered services</div>
              <Input value={service} onChange={(e) => setService(e.target.value)} placeholder="Service description" />
              <div className="flex justify-between">
                <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setStep(1)}>Back</button>
                <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setStep(3)}>Next</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <div className="text-sm">Amounts and units</div>
              <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount/units" />
              <div className="flex justify-between">
                <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setStep(2)}>Back</button>
                <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setStep(4)}>Next</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-2 text-sm">
              <div>Review generated invoice preview</div>
              <div>Contract: {contracts.find((c) => c.id === contractId)?.name}</div>
              <div>Service: {service}</div>
              <div>Amount: {amount}</div>
              <div className="flex justify-between mt-2">
                <button className="rounded-md border px-3 py-2 text-sm" onClick={() => setStep(3)}>Back</button>
                <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm" onClick={() => setWizardOpen(false)}>Finish</button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}