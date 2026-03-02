'use client'
import { useMeQuery, useUpdateProfileMutation } from '@/lib'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    Button,
    Input,
    Label,
    Switch,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Spinner,
    Textarea
} from '@/components/ui'
import { toast } from 'sonner'
import {
    User,
    Shield,
    Lock,
    Users,
    Camera,
    Check,
    Bell,
    Smartphone,
    Layout,
    MessageSquare,
    History,
    Send,
    LogOut,
    Monitor,
    Settings,
    Activity
} from 'lucide-react'

const ProfileMainPage = () => {
    const { data: profile, isLoading } = useMeQuery();
    const [mounted, setMounted] = useState(false);
    const updateProfile = useUpdateProfileMutation({
        onSuccess: () => toast.success('Profile updated successfully')
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setMounted(true);
        if (profile?.name) {
            const parts = profile.name.split(' ');
            setFirstName(parts[0] || '');
            setLastName(parts.slice(1).join(' ') || '');
        }
        if (profile?.bio) {
            setBio(profile.bio);
        }
    }, [profile]);

    if (!mounted || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spinner size="lg" className="text-primary" />
            </div>
        )
    }

    const isAdmin = profile?.role === 'ADMIN';
    const initials = profile?.name
        ? profile.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
        : 'U';

    const handleSaveBasic = () => {
        updateProfile.mutate({
            name: `${firstName} ${lastName}`.trim(),
            bio: bio
        });
    };

    const handleToggleNotification = (field: 'telegramEnabled' | 'emailNotificationsEnabled', value: boolean) => {
        updateProfile.mutate({ [field]: value });
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-8 p-0 bg-transparent border-none w-full flex justify-start rounded-none h-auto gap-8 overflow-x-auto no-scrollbar pb-1">
                    <TabsTrigger
                        value="details"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        My Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        Notifications
                    </TabsTrigger>
                    {isAdmin && (
                        <TabsTrigger
                            value="admin"
                            className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap flex items-center gap-2"
                        >
                            <Shield className="h-4 w-4" /> Admin Console
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="details" className="mt-0 space-y-8 animate-slide-up focus-visible:outline-none">
                    {/* Basic Details Section */}
                    <Card className="border-border/50 bg-gradient-to-br from-card/80 via-card/50 to-background/50 backdrop-blur-md shadow-premium overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-display">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="flex flex-col lg:flex-row gap-12">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative group cursor-pointer">
                                        <div className="h-32 w-32 rounded-full border-4 border-dashed border-brand-teal/20 flex items-center justify-center p-1 transition-all duration-500 group-hover:border-brand-teal/50 group-hover:rotate-6">
                                            <div className="h-full w-full rounded-full bg-muted overflow-hidden ring-4 ring-background shadow-inner">
                                                {profile?.avatarUrl ? (
                                                    <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-teal/10 text-brand-blue text-3xl font-bold font-display transition-transform duration-700 group-hover:scale-110">
                                                        {initials}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button className="absolute bottom-1 right-1 h-10 w-10 bg-background border border-border rounded-full flex items-center justify-center shadow-premium hover:bg-muted transition-all">
                                            <Camera className="h-5 w-5 text-brand-teal" />
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-foreground">{profile?.role}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Global ID: {profile?.id.slice(0, 8)}</p>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                className="h-14 bg-muted/20 border-border/40 focus:border-brand-teal/50 focus:bg-background transition-all rounded-xl px-5 text-base"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                className="h-14 bg-muted/20 border-border/40 focus:border-brand-teal/50 focus:bg-background transition-all rounded-xl px-5 text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">Professional Bio</Label>
                                        <Textarea
                                            id="bio"
                                            placeholder="Tell us about yourself..."
                                            value={bio}
                                            onChange={e => setBio(e.target.value)}
                                            className="min-h-[120px] bg-muted/20 border-border/40 focus:border-brand-teal/50 focus:bg-background transition-all rounded-2xl p-5 text-base resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            onClick={handleSaveBasic}
                                            disabled={updateProfile.isPending}
                                            className="h-12 px-10 font-bold shadow-premium bg-brand-blue hover:bg-brand-blue/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            {updateProfile.isPending ? 'Saving...' : 'Save Profile Changes'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Email Display */}
                    <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-brand-blue/10 rounded-2xl">
                                        <Shield className="h-6 w-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Verified Email Address</h4>
                                        <p className="text-sm text-muted-foreground font-mono">{profile?.email}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="h-12 px-6 rounded-xl border-border/50">Request Change</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delete Zone */}
                    <div className="pt-8 border-t border-destructive/20 mt-12">
                        <h4 className="text-destructive font-black uppercase tracking-widest text-xs mb-4">Dangerous Actions</h4>
                        <Card className="border-destructive/30 bg-destructive/5 overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-destructive">Account Termination</h4>
                                        <p className="text-sm text-muted-foreground max-w-xl">This will permanently delete your learning records, earned certificates, and community interactions. This action is final.</p>
                                    </div>
                                    <Button variant="destructive" className="h-12 px-8 font-black uppercase tracking-widest text-xs">Delete My Account</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0 space-y-8 animate-slide-up focus-visible:outline-none">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Change Password */}
                        <Card className="border-border/50 bg-card/50 backdrop-blur-md shadow-premium">
                            <CardHeader className="p-8 pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Lock className="h-5 w-5 text-brand-blue" />
                                    <CardTitle>Update Password</CardTitle>
                                </div>
                                <CardDescription>Secure your account with a unique, hidden credential.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Current Password</Label>
                                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/20" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">New Password</Label>
                                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-muted/20" />
                                </div>
                                <Button className="w-full h-12 font-bold shadow-soft bg-brand-blue hover:bg-brand-blue/90">Update Password</Button>
                            </CardContent>
                        </Card>

                        {/* Telegram Bot Setup */}
                        <Card className="border-border/50 bg-gradient-to-br from-brand-blue/10 to-transparent backdrop-blur-md shadow-premium">
                            <CardHeader className="p-8 pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Send className="h-5 w-5 text-brand-teal" />
                                    <CardTitle>Telegram Bot Sync</CardTitle>
                                </div>
                                <CardDescription>Receive real-time learning alerts and direct messages on Telegram.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
                                <div className="bg-background/40 p-6 rounded-2xl border border-border/50 flex flex-col items-center text-center gap-4">
                                    <div className="h-16 w-16 bg-brand-teal/20 rounded-full flex items-center justify-center">
                                        <MessageSquare className="h-8 w-8 text-brand-teal" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">Sync Token: <code className="bg-muted px-2 py-1 rounded text-primary">CAM-88F4-X</code></p>
                                        <p className="text-xs text-muted-foreground mt-2">Message this code to @CamNextGen_Bot to link your account.</p>
                                    </div>
                                    <Button variant="outline" className="w-full rounded-xl border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10">Open Telegram</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Active Sessions */}
                    <Card className="border-border/50 bg-card/30">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-lg">Active Login Devices</CardTitle>
                            <CardDescription>Review and manage where you are currently signed in.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/30 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                                            <Monitor className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold">MacBook Pro (Current)</p>
                                            <p className="text-xs text-muted-foreground">Phnom Penh, Cambodia • Chrome Browser</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-brand-blue">
                                        <span className="flex items-center gap-1.5 px-2 py-1 bg-brand-blue/10 rounded-full">
                                            <div className="h-1.5 w-1.5 rounded-full bg-brand-blue animate-pulse" /> Online
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-card border border-border/10 rounded-2xl group transition-all hover:border-border/50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                                            <Smartphone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold">iPhone 15 Pro</p>
                                            <p className="text-xs text-muted-foreground">Siem Reap, Cambodia • iOS App • 2 days ago</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                        Sign out <LogOut className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 space-y-8 animate-slide-up focus-visible:outline-none">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-md shadow-premium">
                        <CardHeader className="p-8 pb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <Bell className="h-5 w-5 text-brand-teal" />
                                <CardTitle>Notification Channels</CardTitle>
                            </div>
                            <CardDescription>Choose how you want to be alerted about updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-4">
                            <div className="space-y-10">
                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => handleToggleNotification('telegramEnabled', !profile?.telegramEnabled)}>
                                    <div className="space-y-1.5 pr-8">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-foreground group-hover:text-brand-teal transition-colors">Telegram Notifications</h4>
                                            {profile?.telegramEnabled && <span className="px-2 py-0.5 bg-brand-teal/10 text-brand-teal text-[10px] font-black rounded-full border border-brand-teal/20">ACTIVE</span>}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Direct messages for course deadlines, platform announcements, and peer messages via our bot.</p>
                                    </div>
                                    <Switch
                                        checked={profile?.telegramEnabled}
                                        onCheckedChange={v => handleToggleNotification('telegramEnabled', v)}
                                        className="data-[state=checked]:bg-brand-teal"
                                    />
                                </div>

                                <div className="flex items-center justify-between group cursor-pointer" onClick={() => handleToggleNotification('emailNotificationsEnabled', !profile?.emailNotificationsEnabled)}>
                                    <div className="space-y-1.5 pr-8">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Email Newsletters</h4>
                                            {profile?.emailNotificationsEnabled && <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full border border-primary/20">ACTIVE</span>}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">Weekly summaries of your learning progress, new course recommendations, and monthly reports.</p>
                                    </div>
                                    <Switch
                                        checked={profile?.emailNotificationsEnabled}
                                        onCheckedChange={v => handleToggleNotification('emailNotificationsEnabled', v)}
                                        className="data-[state=checked]:bg-primary"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-brand-teal/5">
                        <CardContent className="p-8 py-6">
                            <div className="flex items-center gap-4">
                                <Activity className="h-5 w-5 text-brand-teal/40" />
                                <p className="text-xs text-muted-foreground italic">
                                    Pro-tip: Telegram notifications are 4x faster than email and completely free.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {isAdmin && (
                    <TabsContent value="admin" className="mt-0 space-y-8 animate-slide-up focus-visible:outline-none">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="border-brand-teal/20 bg-brand-teal/5 flex flex-col justify-between hover:border-brand-teal/40 transition-all cursor-pointer group">
                                <CardHeader>
                                    <Users className="h-8 w-8 text-brand-teal mb-2 group-hover:scale-110 transition-transform" />
                                    <CardTitle>User Management</CardTitle>
                                    <CardDescription>Control access, roles, and permissions for all users.</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <Button variant="outline" className="w-full border-brand-teal/30 text-brand-teal">Open Manager</Button>
                                </CardContent>
                            </Card>
                            <Card className="border-primary/20 bg-primary/5 flex flex-col justify-between hover:border-primary/40 transition-all cursor-pointer group">
                                <CardHeader>
                                    <Activity className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                    <CardTitle>Global Audit Logs</CardTitle>
                                    <CardDescription>View every critical system event and administrative action.</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <Button variant="outline" className="w-full border-primary/30 text-primary">View History</Button>
                                </CardContent>
                            </Card>
                            <Card className="border-ink-400/20 bg-ink-900/5 flex flex-col justify-between hover:border-ink-400/40 transition-all cursor-pointer group">
                                <CardHeader>
                                    <Settings className="h-8 w-8 text-ink-900 mb-2 group-hover:scale-110 transition-transform" />
                                    <CardTitle>System Config</CardTitle>
                                    <CardDescription>Environment variables, API keys, and global feature flags.</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <Button variant="outline" className="w-full border-ink-400/30 text-ink-900">Configure System</Button>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-border/50 bg-card/60 overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Recent Administrative Actions</CardTitle>
                                    <CardDescription>A live feed of the latest changes across the platform.</CardDescription>
                                </div>
                                <Button variant="ghost" className="text-xs font-bold gap-1 text-primary"><History className="h-3 w-3" /> Full Log</Button>
                            </CardHeader>
                            <CardContent className="p-0 border-t">
                                <div className="divide-y divide-border/50">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/10 transition-colors">
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">JD</div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">User Role Updated <span className="text-xs text-muted-foreground font-normal ml-2">by You</span></p>
                                                <p className="text-xs text-muted-foreground">Changed @tony_student from STUDENT to INSTRUCTOR</p>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground font-mono">14:02 PM</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                )}
            </Tabs>
        </div>
    )
}

export default ProfileMainPage
