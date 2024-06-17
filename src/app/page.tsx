import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  const user = session?.user
  if (!user) {
    redirect("/api/auth/signin")
  }
  const users = await prisma.user.findMany()
  return (
    <main className="flex flex-col items-center gap-6 px-3 py-10">
      <h1 className="text-center text-4xl font-bold">Next-Auth V5 Tutorial</h1>
      <h2 className="text-center text-2xl font-semibold">Users</h2>
      <ul className="list-inside list-disc">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`} className="hover:underline">
              {user.name || `User ${user.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
