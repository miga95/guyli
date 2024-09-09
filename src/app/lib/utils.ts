import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export const getInitials = (fullname: string): string => {
  let initials = fullname
      .split(' ')
      .slice(0, 1)
      .map((name) => {
        return name.charAt(0)
      })
      .join('')

  if (initials?.length === 1 && fullname.length > 1) {
    initials = fullname.substring(0, 2)
  }

  return initials.toUpperCase()
}