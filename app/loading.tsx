import { SkeletonCard } from "@/components/dashboard/skeleton-card";

export default function Loading() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="dashboard-grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}
