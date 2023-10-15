export default function TrackItem({ imgUrl, name, description }) {
  return (
    <div className="flex-shrink-0 w-40 md:w-64 p-5 space-y-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
      <img src={imgUrl} className="rounded-lg "></img>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-xs text-neutral-400">{description}...</p>
    </div>
  );
}
