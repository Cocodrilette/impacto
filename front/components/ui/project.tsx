export function Project({
  title,
  description,
  requiredFunds,
  collectedFunds,
  imageUrl,
}: {
  title: string;
  description: string;
  requiredFunds: number;
  collectedFunds: number;
  imageUrl: string;
}) {
  return (
    <div className="flex gap-2 p-2">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="font-semibold text-center text-2xl mb-5">{title}</h1>
        <img
          src={imageUrl}
          alt={title}
          className="aspect-auto rounded-md shadow-md"
        />
        <button className="bg-black text-white rounded-md p-2 m-auto">
          See details
        </button>
      </div>
    </div>
  );
}
