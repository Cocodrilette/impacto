import React, { useState } from 'react'
import { useWriteContract } from 'wagmi';

function Dashboard() {
  const { writeContract } = useWriteContract();
  const [amount, setAmount] = useState<null | string>(null)
    
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard