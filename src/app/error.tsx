'use client' 
 
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Alert  className='my-8'>
      <AlertTriangle />
      <AlertTitle>An error has occured!</AlertTitle>
      <AlertDescription>Something went wrong !</AlertDescription>
    </Alert>
  )
}