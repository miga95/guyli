"use client"
import React, { useEffect, useState } from 'react'
import { Form, FormField, FormItem, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from '@/components/ui/input';

export default function Search() {
    const [searchBar, setsearchBar] = useState<string>()
    const [users, setUsers] = useState<any[]>([]); // Typage correct pour les utilisateurs
    console.log("HERE");
    
    useEffect(() => {
        if (!searchBar) return;
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users/search?username=${searchBar}`);
                if (response.ok) {
                const data = await response.json();
                setUsers(data);
              } else {
                console.error('Failed to fetch users:', response.statusText);
              }
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
      
          fetchUsers();
    },[searchBar])

    return (
    <div>
        <Input onChange={(e) => {setsearchBar(e.target.value)}}/>
        <ul>
            {users.length > 0 ? (
                users.map((user) => (
                <li key={user.id}>
                    {user.username} - {user.name}
                </li>
                ))
            ) : (
                <li>No users found</li>
            )}
        </ul>
    </div>
  )
}
