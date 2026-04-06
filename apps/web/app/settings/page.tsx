'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    defaultProtocol: 'huffman',
    roiLevel: 'high',
    autoSave: true,
    enableNotifications: true,
  });

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="font-headline text-5xl text-on-surface mb-2">Settings</h1>
        <p className="text-on-surface-variant font-body">Manage your encryption preferences and account settings.</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8">
          <h2 className="font-headline text-2xl text-on-surface mb-6">Encryption Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">Default Protocol</label>
              <select
                value={settings.defaultProtocol}
                onChange={(e) => setSettings({ ...settings, defaultProtocol: e.target.value })}
                className="w-full p-2 border border-outline-variant/30"
              >
                <option value="huffman">Standard Huffman</option>
                <option value="gray">Gray Coding</option>
                <option value="rotation">Rotation-3</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">ROI Sensitivity</label>
              <select
                value={settings.roiLevel}
                onChange={(e) => setSettings({ ...settings, roiLevel: e.target.value })}
                className="w-full p-2 border border-outline-variant/30"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-8">
          <h2 className="font-headline text-2xl text-on-surface mb-6">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-on-surface">Enable encryption completion notifications</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-primary text-white py-3 font-medium hover:opacity-90">Save Changes</button>
          <button className="flex-1 bg-white border border-outline-variant text-on-surface py-3 font-medium hover:bg-surface-container-low">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}