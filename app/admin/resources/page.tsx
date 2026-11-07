import { ResourceAllocationModal } from "@/components/dashboard/resource-allocation-modal";
import { SearchFilterToolbar } from "@/components/dashboard/search-filter-toolbar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ResourceForm } from "@/components/forms/resource-form";
import { DataTable } from "@/components/dashboard/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listResources } from "@/lib/dashboard";

export default async function AdminResourcesPage() {
  const resources = await listResources();

  return (
    <div className="space-y-6">
      <SearchFilterToolbar title="Resource management" description="Track inventory, allocation pressure, and support staging locations." />
      <Card>
        <CardHeader><div><CardTitle>Add resource</CardTitle><CardDescription>Create new deployable resources for the operations pool.</CardDescription></div></CardHeader>
        <CardContent><ResourceForm /></CardContent>
      </Card>
      <DataTable title="Resource inventory" description="Live stock levels and allocation status.">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground"><tr><th className="pb-4">Name</th><th className="pb-4">Category</th><th className="pb-4">Available</th><th className="pb-4">Allocated</th><th className="pb-4">Status</th><th className="pb-4">Action</th></tr></thead>
          <tbody>
            {resources.map((resource: any) => (
              <tr key={resource._id} className="border-t border-border/70"><td className="py-4 font-medium">{resource.name}</td><td className="py-4 capitalize">{resource.category.replace(/_/g, " ")}</td><td className="py-4">{resource.quantityAvailable}</td><td className="py-4">{resource.allocatedQuantity}</td><td className="py-4"><StatusBadge value={resource.status} /></td><td className="py-4"><ResourceAllocationModal resource={resource} /></td></tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
