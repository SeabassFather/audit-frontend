import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <aside className="fixed top-0 left-0 h-screen w-72 bg-slate-900 text-white overflow-y-auto">
        <Sidebar />
      </aside>
      <main className="ml-72 flex-1 bg-slate-800 text-white min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}