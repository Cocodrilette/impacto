"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { Card } from "./card";
import { usePrivy } from "@privy-io/react-auth";
import { abi } from "@/constants/abi/impact-manager";
import { ImpactManagerAddress } from "@/constants";
import { formatEther, parseUnits } from "viem";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export function DonateForm() {
  const { address } = useAccount();
  const { connectWallet } = usePrivy();
  const { data, refetch, error, isFetched } = useReadContract({
    abi: abi,
    address: ImpactManagerAddress,
    functionName: "balanceOf",
    args: [address],
  });
  const { writeContract, isError, isSuccess } = useWriteContract();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [data]);

  function handleDonate() {
    const { value } = document.getElementById("amount") as HTMLInputElement;
    if (!value || parseInt(value) === 0) {
      toast.error("Amount is required");
      return;
    }

    const currentBalance = typeof data === "bigint" ? data : 0;
    const valueBN = parseUnits(value, 18);

    if (valueBN > currentBalance) {
      toast.error("Insufficient balance");
      return;
    }

    writeContract({
      abi: abi,
      address: ImpactManagerAddress,
      functionName: "donate",
      args: [valueBN],
    });
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Donation successful. Wait for the transaction to confirm."
      );
      refetch();
    }
    if (isError) {
      toast.error("Donation failed");
    }
  }, [isSuccess, isError]);

  return (
    <Card className="flex flex-col gap-2 p-2 max-w-sm">
      <Toaster />
      <div>
        <label htmlFor="amount" className="text-sm font-medium">
          Amount
        </label>
        <input
          disabled={!address}
          id="amount"
          type="number"
          className="w-full p-2 border rounded-md"
        />
        <p className="text-xs text-gray-400 mt-1">
          {data
            ? `Available: ${typeof data === "bigint" ? formatEther(data) : "0"}`
            : "Loading..."}
        </p>
      </div>
      <button
        onClick={() => {
          if (address) {
            handleDonate();
          } else {
            connectWallet();
          }
        }}
        className="w-full p-2 bg-primary text-white rounded-md"
      >
        {address ? "Donate" : "Connect Wallet"}
      </button>
    </Card>
  );
}
