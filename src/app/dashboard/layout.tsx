import { PropsWithChildren } from "react";
import { Sidebar } from "./_components/sidebar";

export default function Layout({children}: PropsWithChildren) {

  return (
    <div className="flex w-full h-screen ">
      <Sidebar />
      <main className="flex-1">
      {children}
      </main>
    </div>
  )
}