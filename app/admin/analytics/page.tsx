import { Card, Text, Chart } from "@components"

const AnalyticsPage = () => {
  return (
    <div className="flex flex-col">
      {/* Cards de métricas */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700">
        <Text className="text-gray-900 dark:text-gray-100">Métrica 1</Text>
      </Card>
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700">
        <Text className="text-gray-900 dark:text-gray-100">Métrica 2</Text>
      </Card>

      {/* Gráficos */}
      <Chart className="bg-white dark:bg-gray-800" />

      {/* Textos */}
      <Text className="text-gray-900 dark:text-gray-100">Texto informativo</Text>
    </div>
  )
}

export default AnalyticsPage
