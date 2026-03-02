'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Button,
    Badge,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    EmptyState
} from '@/components/ui';
import {
    Bell,
    BookOpen,
    CheckCircle2,
    Clock,
    MessageSquare,
    Star,
    Trophy,
    MoreHorizontal,
    Trash2,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NotificationType = 'course' | 'system' | 'social' | 'achievement';

interface NotificationItem {
    id: string;
    type: NotificationType;
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    link?: string;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
    {
        id: '1',
        type: 'course',
        title: 'New Content Released',
        description: 'Module 4: Advanced React Patterns is now available in "Modern Web Development".',
        timestamp: '2 hours ago',
        isRead: false,
        link: '/catalog/modern-web'
    },
    {
        id: '2',
        type: 'achievement',
        title: 'Badge Earned!',
        description: 'Congratulations! You\'ve earned the "Fast Learner" badge for completing 3 modules in 24 hours.',
        timestamp: '5 hours ago',
        isRead: false
    },
    {
        id: '3',
        type: 'system',
        title: 'System Maintenance',
        description: 'CamNextGen will be undergoing scheduled maintenance this Sunday from 2:00 AM to 4:00 AM ICT.',
        timestamp: '1 day ago',
        isRead: true
    },
    {
        id: '4',
        type: 'social',
        title: 'Instructor Response',
        description: 'Piseth Van replied to your question in the "Next.js Authentication" discussion thread.',
        timestamp: '2 days ago',
        isRead: true,
        link: '/community/thread/123'
    },
    {
        id: '5',
        type: 'course',
        title: 'Assignment Graded',
        description: 'Your project "E-commerce UI" has been graded. You received an A!',
        timestamp: '3 days ago',
        isRead: true
    }
];

const typeStyles = {
    course: {
        icon: BookOpen,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    system: {
        icon: Bell,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20'
    },
    social: {
        icon: MessageSquare,
        color: 'text-brand-teal',
        bg: 'bg-brand-teal/10',
        border: 'border-brand-teal/20'
    },
    achievement: {
        icon: Trophy,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20'
    }
};

const NotificationsMainPage = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const NotificationCard = ({ item }: { item: NotificationItem }) => {
        const Style = typeStyles[item.type];

        return (
            <Card className={cn(
                "group relative overflow-hidden transition-all duration-300 border-border/50 hover:border-brand-teal/30 hover:shadow-soft",
                !item.isRead ? "bg-brand-teal/5 dark:bg-brand-teal/10" : "bg-card/50"
            )}>
                <CardContent className="p-5">
                    <div className="flex gap-4">
                        <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300",
                            Style.bg, Style.border, "border"
                        )}>
                            <Style.icon className={cn("h-6 w-6", Style.color)} />
                        </div>

                        <div className="flex-1 min-w-0 pr-8">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className={cn(
                                    "text-base font-bold truncate",
                                    !item.isRead ? "text-foreground" : "text-foreground/80"
                                )}>
                                    {item.title}
                                </h3>
                                {!item.isRead && (
                                    <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                                {item.description}
                            </p>
                            <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {item.timestamp}
                                </span>
                                <span>•</span>
                                <span className="text-brand-teal/60">{item.type}</span>
                            </div>
                        </div>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            {!item.isRead && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 rounded-full hover:bg-brand-teal/10 text-brand-teal"
                                    onClick={() => markAsRead(item.id)}
                                    title="Mark as read"
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full hover:bg-destructive/10 text-destructive/60 hover:text-destructive"
                                onClick={() => deleteNotification(item.id)}
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                        <Bell className="h-6 w-6 text-brand-teal" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-foreground">Updates & Alerts</h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            You have {unreadCount} unread notifications
                        </p>
                    </div>
                </div>

                {unreadCount > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-brand-teal/20 text-brand-teal hover:bg-brand-teal/10 font-bold"
                        onClick={markAllAsRead}
                    >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark all as read
                    </Button>
                )}
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 p-0 bg-transparent border-none w-full flex justify-start rounded-none h-auto gap-6 overflow-x-auto no-scrollbar pb-1">
                    <TabsTrigger
                        value="all"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        All Notifications
                        <Badge variant="default" className="ml-2 bg-muted text-muted-foreground border-none">
                            {notifications.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger
                        value="course"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        Courses
                    </TabsTrigger>
                    <TabsTrigger
                        value="social"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        Community
                    </TabsTrigger>
                    <TabsTrigger
                        value="system"
                        className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-brand-teal data-[state=active]:bg-transparent data-[state=active]:text-brand-teal transition-all font-semibold whitespace-nowrap"
                    >
                        System
                    </TabsTrigger>
                </TabsList>

                {['all', 'course', 'social', 'system'].map(tab => (
                    <TabsContent key={tab} value={tab} className="mt-0 space-y-4 animate-slide-up focus-visible:outline-none">
                        {notifications.filter(n => tab === 'all' || n.type === tab).length > 0 ? (
                            notifications
                                .filter(n => tab === 'all' || n.type === tab)
                                .map(item => <NotificationCard key={item.id} item={item} />)
                        ) : (
                            <EmptyState
                                title="No notifications here"
                                description={`We'll let you know when there's new ${tab === 'all' ? 'activity' : tab} updates.`}
                                className="bg-card/30 border-dashed py-16"
                            />
                        )}
                    </TabsContent>
                ))}
            </Tabs>

            {notifications.length > 5 && (
                <div className="pt-4 flex justify-center">
                    <Button variant="ghost" className="text-muted-foreground hover:text-brand-teal transition-colors font-bold text-sm">
                        Load older notifications
                    </Button>
                </div>
            )}
        </div>
    );
};

export default NotificationsMainPage;
