"use client"

import { Bell, Circle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useQuery } from "@tanstack/react-query";
import {formatDate} from "@/lib/date";

interface Notification {

    "id": string,
    "recipientId": string,
    "senderId": string,
    "type": string,
    "postId": string,
    "isRead": Boolean,
    "createdAt": string,
    "userId": null,
    "sender": {
        "name": string,
        "image": string,
    }
}

interface NotificationResponse {
    notifications: Notification[];
    unreadCount: number;
}

const fetchNotifications = async (userId: string): Promise<NotificationResponse> => {
    const response = await fetch(`/api/notifications/notify?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Erreur lors du chargement des notifications');
    }
    return response.json();
};

const markAllAsRead = async (notificationIds: string[]) => {
    try {
        const response = await fetch('/api/notifications/read', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notificationIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to mark notifications as read');
        }

        const data = await response.json();
        console.log('All notifications marked as read:', data);
    } catch (error) {
        console.error('Error marking notifications as read:', error);
    }
};

export const NotificationDropdown = () => {
    const { data: session } = useSession();
    const userId = session?.user?.id;




    const { data, isLoading, error } = useQuery<NotificationResponse>({
        queryKey: ['notifications', userId],
        queryFn: () => fetchNotifications(userId!),
        enabled: !!userId,
        refetchInterval: 3000
    });

    const notifications = data?.notifications || [];

    const unreadNotificationIds = notifications
        .filter((notification) => !notification.isRead)
        .map((notification) => notification.id);

    const getNotificationMessage = (type: string) => {
        switch (type) {
            case 'like':
                return 'a aimé votre post';
            case 'follow':
                return 'a suivi votre compte';
            case 'comment':
                return 'a commenté votre post';
            default:
                return 'a interagi avec vous';
        }
    };



    if (isLoading) return <div>Chargement des notifications...</div>;

    if (error) return <div>Erreur lors du chargement des notifications</div>;

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger className="relative">
                        <Bell size={40} className="cursor-pointer" />
                    {data && data?.unreadCount > 0 && (
                        <Badge
                            className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center bg-red-500 text-white font-bold rounded-full"
                            variant="outline"
                        >
                            {data?.unreadCount}
                        </Badge>
                    )}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-80 bg-[#020817] text-white rounded-md shadow-lg p-4 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Notifications</span>
                        <button
                            onClick={() => markAllAsRead(unreadNotificationIds)} // Réinitialise le compteur au clic
                            className="text-sm text-blue-400 hover:underline"
                        >
                            Marquer tout comme lu
                        </button>
                    </div>

                    {/* Liste des notifications */}
                    {notifications?.map((notification) => {
                        return (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex items-start space-x-3 mb-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2"
                            >
                                {/*<Image
                                    src={notification.sender.image || ""}
                                    alt={notification.sender.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />*/}
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-semibold">{notification.sender.name} </span> {getNotificationMessage(notification.type)}
                                    </p>
                                    <span className="text-xs text-gray-400">{formatDate(notification.createdAt)}</span>
                                </div>
                                {!notification.isRead && (
                                    <Circle size={12} className="text-blue-500 mt-1" />
                                )}

                            </DropdownMenuItem>
                            )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
