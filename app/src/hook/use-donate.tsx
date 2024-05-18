import { abi as impactManagerAbi } from "app/config/abi/impact-manager";
import { useWriteContract } from "wagmi";

export function useDonate() {
  const { writeContract, data, error, isSuccess } = useWriteContract();

  const donate = (value: bigint = BigInt(0)) => {
    writeContract({
      abi: impactManagerAbi,
      address: "" as `0x${string}`,
      functionName: "donate",
      value,
    });
  };

  return { donate, data, error, isSuccess };
}
