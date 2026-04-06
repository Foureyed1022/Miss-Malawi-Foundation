"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-gray-900">Dashboard Settings</h1>
        <p className="text-gray-600 mt-1">Configure your administrative preferences and site-wide options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Display Name</Label>
              <Input id="siteName" defaultValue="Miss Malawi Foundation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Notification Email</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@missmalawi.foundation" />
            </div>
            <Button className="bg-emerald-800">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Registration Alerts</Label>
                <p className="text-xs text-gray-500">Get notified when someone registers for the pageant.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Donation Notifications</Label>
                <p className="text-xs text-gray-500">Receive an email for every donation received.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Analytics Summary</Label>
                <p className="text-xs text-gray-500">A high-level report sent every Monday.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
