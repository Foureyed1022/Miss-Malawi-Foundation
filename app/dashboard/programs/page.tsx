"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, FolderOpen, Settings2 } from "lucide-react"

export default function ProgramsManagementPage() {
  const [programs] = useState([
    { id: 1, title: "Girl Child Education", status: "Active", impact: "1,200 Girls" },
    { id: 2, title: "Healthcare Outreach", status: "Planning", impact: "Target: 5,000" },
    { id: 3, title: "Youth Empowerment", status: "Completed", impact: "300 Youth" },
  ])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-gray-900">Programs</h1>
          <p className="text-gray-600 mt-1">Manage, add, and track the organization's programs.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" /> New Program
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><FolderOpen className="mr-2 h-5 w-5"/> Current Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-xl overflow-hidden divide-y">
              {programs.map((prog) => (
                <div key={prog.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">{prog.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        prog.status === 'Active' ? 'bg-emerald-50 text-emerald-800' : 
                        prog.status === 'Planning' ? 'bg-amber-50 text-amber-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {prog.status}
                      </span>
                      <span className="text-xs text-gray-500">Impact: {prog.impact}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-emerald-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
