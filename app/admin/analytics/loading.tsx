'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 h-8 w-64 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 w-40 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                  <div className="mb-2 h-8 w-16 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {[...Array(2)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-2 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] animate-pulse rounded bg-gray-200"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* More Charts Skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-2 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] animate-pulse rounded bg-gray-200"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Final Chart Skeleton */}
      <Card>
        <CardHeader>
          <div className="mb-2 h-6 w-40 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-80 animate-pulse rounded bg-gray-200"></div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse rounded bg-gray-200"></div>
        </CardContent>
      </Card>

      {/* Insights Skeleton */}
      <div className="mt-8">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-1 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
