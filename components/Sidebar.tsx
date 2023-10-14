import { TbPlaylist } from "react-icons/tb";
import SidebarLibList from "./SidebarLibList";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
  children: React.ReactNode;
}

// Passing server component into a client component is {children}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex h-full ">
      <div className="sidebar md:min-w-xl">
        <SidebarMenu />
        <div className="h-full overflow-y-auto card no-scrollbar">
          <div className="bg-neutral-900 sticky p-5 top-0 z-10 flex flex-row space-x-4 text-lg font-bold text-neutral-400">
            <TbPlaylist className="text-neutral-400" size={26} />
            <h2 className="hidden md:flex">Your Library</h2>
          </div>
          <SidebarLibList />
        </div>
      </div>
      <main className="w-full my-2 mr-2 overflow-hidden overflow-y-auto md:ml-0 card">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
