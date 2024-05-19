"use client";

import { useReadContract } from "wagmi";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { abi as impactManagerAbi } from "@/constants/abi/impact-manager";
import { ImpactManagerAddress } from "@/constants";
import { formatUnits } from "viem";

function TotalAllocation() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { data, refetch, error, isFetched } = useReadContract({
    abi: impactManagerAbi,
    address: ImpactManagerAddress,
    functionName: "balanceOf",
    args: [ImpactManagerAddress],
  });

  useEffect(() => {
    const animation = animate(count, 100000, { duration: 1 });
    return animation.stop;
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current allocation
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <strong>
          $
          <motion.span className="text-2xl font-bold">
            {typeof data === "bigint" ? formatUnits(data, 18) : "0"}
          </motion.span>{" "}
          USD{" "}
        </strong>
      </CardContent>
    </Card>
  );
}

export default TotalAllocation;
