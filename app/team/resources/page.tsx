import { DataTable } from "@/components/dashboard/data-table";
import { SearchFilterToolbar } from "@/components/dashboard/search-filter-toolbar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { listResources } from "@/lib/dashboard";

export default async function TeamResourcesPage() {
  const resources = await listResources();

  return (
    <div className="space-y-6">
      <SearchFilterToolbar title="Field resources" description="Available support assets teams can request or coordinate from the control room." />
      <DataTable title="Operational resources" description="Inventory visibility for rescue teams in the field.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground"><tr><th className="pb-4">Name</th><th className="pb-4">Category</th><th className="pb-4">Available</th><th className="pb-4">Allocated</th><th className="pb-4">Status</th></tr></thead>
          <tbody>
            {resources.map((resource: any) => (
              <tr key={resource._id} className="border-t border-border/70"><td className="py-4 font-medium">{resource.name}</td><td className="py-4 capitalize">{resource.category.replace(/_/g, " ")}</td><td className="py-4">{resource.quantityAvailable}</td><td className="py-4">{resource.allocatedQuantity}</td><td className="py-4"><StatusBadge value={resource.status} /></td></tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
