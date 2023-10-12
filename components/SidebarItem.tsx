import Link from "next/link";
import { IconType } from "react-icons";

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
  return (
    <Link
      className="flex flex-row p-3 m-3 text-lg font-bold md:space-x-4 text-md text-neutral-400 hover:text-white"
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

export default SidebarItem;
