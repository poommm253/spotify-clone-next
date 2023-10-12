"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { TbPlaylist } from "react-icons/tb";
import SidebarItem from "./SidebarItem";
import SidebarLibList from "./SidebarLibList";

interface SidebarProps {
  children: React.ReactNode;
}

// Passing server component into a client component is {children}
const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  let samplePlaylist = [{ title: "Playlist 1" }, { title: "Playlist 2" }];

  return (
    <div className="flex h-full">
      <div className="sidebar">
        <div className="card">
          {routes.map((route) => {
            return <SidebarItem key={route.label} {...route} />;
          })}
        </div>
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
