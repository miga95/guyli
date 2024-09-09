"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Search() {
  const [searchBar, setsearchBar] = useState<string>();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!searchBar) return;
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users/search?username=${searchBar}`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    return () => {
      setUsers([]);
    };
  }, [searchBar]);

  return (
    <div className="mt-5 w-3/4 sm:w-1/2 m-auto">
      <Input 
        placeholder="Search"
        onChange={(e) => {
          setsearchBar(e.target.value);
        }}
      />
      <ul>
        {users.map((user) => {

          return (
            <li key={user.id} className="p-2">
              <Link href={`/users/${user.id}`} className="flex items-center">
                <Avatar size={"sm"} className="mr-2">
                  {user.image ? (
                    <AvatarImage
                      src={user.image}
                      alt={user.username ?? undefined}
                    />
                  ) : null}
                  <AvatarFallback>
                    {user?.username?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {user.username}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
