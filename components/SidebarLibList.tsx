interface SidebarLibProps {
  title: string;
}

const SidebarLib: React.FC<SidebarLibProps> = ({ title }) => {
  return <div>{title}</div>;
};

export default SidebarLib;
