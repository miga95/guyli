import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import LoginButton from "./components/LoginButton"
import { signOut } from "next-auth/react"
import LogoutButton from "./components/LogoutButton"

export default async function Home() {
  const session  = await getServerSession(authOptions)
  if(session) {
    return (
      <div className="p-6 bg-red-200 text-center">
        <p>{session.user?.name}</p>
        <LogoutButton />
      </div>
    )
  }
  return(
    <LoginButton />
  )
}