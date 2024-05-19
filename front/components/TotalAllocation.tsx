"use client";

import { useReadContract } from "wagmi";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { abi as impactManagerAbi } from "@/constants/abi/impact-manager";
import { ImpactManagerAddress } from "@/constants";
import { formatUnits } from "viem";
import { calculateAllocation } from "@/function/calculateAllocation";

function TotalAllocation() {
  const [initialValues, setInitialValues] = useState(null);
  const [allocation, setAllocation] = useState("0");
  const { data, refetch, error, isFetched } = useReadContract({
    abi: impactManagerAbi,
    address: ImpactManagerAddress,
    functionName: "getAllocation",
    args: [0, 2],
  });

  useEffect(() => {
    console.debug("data", data);
  }, [isFetched]);

  useEffect(() => {
    if (!initialValues) return;
    const updateAllocation = () => {
      const t = Math.floor(Date.now() / 1000); // Current time in seconds
      const newAllocation = calculateAllocation(t, initialValues, 1);
      setAllocation(newAllocation.toFixed(2)); // Adjust as needed
    };

    const intervalId = setInterval(updateAllocation, 1000);
    return () => clearInterval(intervalId);
  }, [initialValues]);

  return (
    <Card className="allocation w-full">
      <CardHeader>
        <CardTitle>Total allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          $
          <motion.span className="text-2xl font-bold">{allocation}</motion.span>{" "}
          USD{" "}
        </strong>
      </CardContent>
      <CardFooter className="text-sm">
        There is your the total amount allocated to you
      </CardFooter>
    </Card>
  );
}

export default TotalAllocation;
