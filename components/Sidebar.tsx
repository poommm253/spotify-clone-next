import { TbPlaylist } from "react-icons/tb";
import SidebarLibList from "./SidebarLibList";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
  children: React.ReactNode;
}

// Passing server component into a client component is {children}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  let samplePlaylist = [{ title: "Playlist 1" }, { title: "Playlist 2" }];

  return (
    <div className="flex h-full">
      <div className="sidebar">
        <SidebarMenu />
        <div className="h-full p-3 overflow-y-auto card">
          <div className="flex flex-row p-3 space-x-4 text-lg font-bold text-neutral-400">
            <TbPlaylist className="text-neutral-400" size={26} />
            <h2 className="hidden md:flex">Your Library</h2>
          </div>
          {samplePlaylist.map((playlist) => {
            return (
              <SidebarLibList key={playlist.title} title={playlist.title} />
            );
          })}
        </div>
      </div>
      <main className="w-full my-2 mr-2 overflow-hidden overflow-y-auto md:ml-0 card">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
