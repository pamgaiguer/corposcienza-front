"use client"
import { useParams } from "next/navigation"
import { Card, Typography, Label } from "@components"

const PatientPage = () => {
  const { id } = useParams()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700">
        <Typography className="text-gray-900 dark:text-gray-100">Patient Information</Typography>
        <div className="p-4">
          <Label className="text-gray-600 dark:text-gray-400">Name:</Label>
          <Typography>John Doe</Typography>
          <Label className="text-gray-600 dark:text-gray-400">Age:</Label>
          <Typography>30</Typography>
          <Label className="text-gray-600 dark:text-gray-400">Gender:</Label>
          <Typography>Male</Typography>
        </div>
      </Card>
      {/* rest of code here */}
    </div>
  )
}

export default PatientPage
