'use client'
import { Shield } from 'lucide-react'
import React, { useState } from 'react'

const RoleManagement = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSaveRole = () => {
        setRefreshTrigger((prev) => prev + 1);
    };
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                                <Shield
                                    className="w-8 h-8 text-primary" />
                                Role Management
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Manage team members, assign roles, and configure permissions
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default RoleManagement