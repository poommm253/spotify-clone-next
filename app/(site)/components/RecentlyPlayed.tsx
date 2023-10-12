export default function RecentlyPlayed() {
  return (
    <div className="grid grid-cols-2 gap-4 mx-8 md:grid-cols-3">
      <RecentlyPlayedCard title="Test" />
      <RecentlyPlayedCard title="Test" />
      <RecentlyPlayedCard title="Test" />
      <RecentlyPlayedCard title="Test" />
      <RecentlyPlayedCard title="Test" />
      <RecentlyPlayedCard title="Test" />
    </div>
  );
}

interface RecentlyPlayedCardProps {
  title: string;
  // add image
}

const RecentlyPlayedCard: React.FC<RecentlyPlayedCardProps> = ({ title }) => {
  return (
    <div className="flex flex-row items-center space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
      <div className="w-20 h-20 bg-emerald-300"></div>
      <p className="py-2">{title}</p>
    </div>
  );
};
