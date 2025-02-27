import { PropsWithChildren } from "react";
import { Sidebar } from "./_components/sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-6 md:p-8"> {children}</div>
      </main>
    </div>
  );
}
