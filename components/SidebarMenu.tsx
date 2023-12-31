"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { IconType } from "react-icons";
import { useRecoilState } from "recoil";
import { playlistIdState } from "@/atoms/playlistAtom";

export default function SidebarMenu() {
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

  return (
    <div className="card">
      {routes.map((route) => {
        return <SidebarItem key={route.label} {...route} />;
      })}
    </div>
  );
}

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const [selectedPlaylistId, setSelectedPlaylistId] =
    useRecoilState(playlistIdState);

  return (
    <Link
      className="flex flex-row p-3 m-3 text-lg font-bold md:space-x-4 text-md text-neutral-400 hover:text-white"
      onClick={() => setSelectedPlaylistId(null)}
      href={href}
    >
      <Icon
        className={active ? "text-white items-center justify-center" : ""}
        size={26}
      ></Icon>

      <p
        className={
          active
            ? "text-white hidden md:flex items-center justify-center"
            : "hidden md:flex"
        }
      >
        {label}
      </p>
    </Link>
  );
};
