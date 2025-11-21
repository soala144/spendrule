"use client";
import Card from "../../components/ui/Card";
import { Input, Select } from "../../components/ui/Input";
import { useState } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState("system");
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Settings</div>
      <Card title="Appearance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
      </Card>
      <Card title="Notifications">
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" /> Email alerts</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Exception updates</label>
          <label className="flex items-center gap-2"><input type="checkbox" /> Validation results</label>
        </div>
      </Card>
    </div>
  );
}