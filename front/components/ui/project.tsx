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
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-center text-2xl mb-5">{title}</h1>
        <img
          src={imageUrl}
          alt={title}
          className="aspect-auto rounded-md shadow-md"
        />
      </div>
      {/* <div className="flex flex-col items-start justify-center">
        <p>{description}</p>
        <div className="flex flex-row gap-2">
          <p>
            <strong>Required funds: </strong>
            {requiredFunds}
          </p>
          <p>
            <strong>Collected funds: </strong>
            {collectedFunds}
          </p>
        </div>
      </div> */}
    </div>
  );
}
