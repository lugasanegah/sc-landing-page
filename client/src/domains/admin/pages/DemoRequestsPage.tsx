import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/domains/shared/components/ui/card";
import { Button } from "@/domains/shared/components/ui/button";
import { Badge } from "@/domains/shared/components/ui/badge";
import { Input } from "@/domains/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/domains/shared/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/domains/shared/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/domains/shared/components/ui/dialog";
import { useToast } from "@/domains/shared/hooks/use-toast";
import { apiRequest } from "@/domains/shared/lib/queryClient";
import type { DemoRequest } from "@shared/schema";

export default function DemoRequestsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: demoRequests = [], isLoading } = useQuery({
    queryKey: ["/api/demo-requests"],
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      return await apiRequest(`/api/demo-requests/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/demo-requests"] });
      toast({
        title: "Status Updated",
        description: "Demo request status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update demo request status.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "New", variant: "default" as const, color: "bg-blue-500" },
      contacted: { label: "Contacted", variant: "secondary" as const, color: "bg-yellow-500" },
      demo_scheduled: { label: "Demo Scheduled", variant: "outline" as const, color: "bg-purple-500" },
      demo_completed: { label: "Demo Completed", variant: "outline" as const, color: "bg-green-500" },
      follow_up: { label: "Follow Up", variant: "secondary" as const, color: "bg-orange-500" },
      closed: { label: "Closed", variant: "secondary" as const, color: "bg-gray-500" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    
    return (
      <Badge variant={config.variant} className="font-inter">
        {config.label}
      </Badge>
    );
  };

  const filteredRequests = demoRequests.filter((request: DemoRequest) => {
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesSearch = 
      request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusStats = () => {
    const stats = demoRequests.reduce((acc: any, request: DemoRequest) => {
      acc[request.status] = (acc[request.status] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: demoRequests.length,
      new: stats.new || 0,
      contacted: stats.contacted || 0,
      demo_scheduled: stats.demo_scheduled || 0,
      demo_completed: stats.demo_completed || 0,
      follow_up: stats.follow_up || 0,
      closed: stats.closed || 0,
    };
  };

  const stats = getStatusStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-inter">Loading demo requests...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-manrope">Demo Requests</h1>
          <p className="text-gray-600 font-inter">Manage and track demo requests from potential clients</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 font-manrope">{stats.total}</div>
          <div className="text-sm text-gray-600 font-inter">Total</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-500 font-manrope">{stats.new}</div>
          <div className="text-sm text-gray-600 font-inter">New</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500 font-manrope">{stats.contacted}</div>
          <div className="text-sm text-gray-600 font-inter">Contacted</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-500 font-manrope">{stats.demo_scheduled}</div>
          <div className="text-sm text-gray-600 font-inter">Scheduled</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-500 font-manrope">{stats.demo_completed}</div>
          <div className="text-sm text-gray-600 font-inter">Completed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-500 font-manrope">{stats.follow_up}</div>
          <div className="text-sm text-gray-600 font-inter">Follow Up</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-500 font-manrope">{stats.closed}</div>
          <div className="text-sm text-gray-600 font-inter">Closed</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-inter"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="font-inter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
                <SelectItem value="demo_completed">Demo Completed</SelectItem>
                <SelectItem value="follow_up">Follow Up</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Demo Requests Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-inter">Contact</TableHead>
              <TableHead className="font-inter">Company</TableHead>
              <TableHead className="font-inter">Country</TableHead>
              <TableHead className="font-inter">Status</TableHead>
              <TableHead className="font-inter">Created</TableHead>
              <TableHead className="font-inter">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request: DemoRequest) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium font-inter">{request.fullName}</div>
                    <div className="text-sm text-gray-600 font-inter">{request.email}</div>
                    <div className="text-xs text-gray-500 font-inter">{request.jobTitle}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="font-medium font-inter">{request.company}</div>
                    <div className="text-sm text-gray-600 font-inter">{request.industry}</div>
                    <div className="text-xs text-gray-500 font-inter">{request.companySize}</div>
                  </div>
                </TableCell>
                <TableCell className="font-inter">{request.country}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    {getStatusBadge(request.status)}
                    <Select
                      value={request.status}
                      onValueChange={(status) => updateStatus.mutate({ id: request.id, status })}
                    >
                      <SelectTrigger className="w-32 text-xs h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="demo_scheduled">Demo Scheduled</SelectItem>
                        <SelectItem value="demo_completed">Demo Completed</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell className="font-inter">
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-manrope">Demo Request Details</DialogTitle>
                      </DialogHeader>
                      {selectedRequest && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold font-inter">Contact Information</h4>
                              <div className="text-sm space-y-1 font-inter">
                                <div><strong>Name:</strong> {selectedRequest.fullName}</div>
                                <div><strong>Email:</strong> {selectedRequest.email}</div>
                                <div><strong>Job Title:</strong> {selectedRequest.jobTitle}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold font-inter">Company Details</h4>
                              <div className="text-sm space-y-1 font-inter">
                                <div><strong>Company:</strong> {selectedRequest.company}</div>
                                <div><strong>Industry:</strong> {selectedRequest.industry}</div>
                                <div><strong>Size:</strong> {selectedRequest.companySize}</div>
                                <div><strong>Country:</strong> {selectedRequest.country}</div>
                              </div>
                            </div>
                          </div>
                          
                          {selectedRequest.currentTools && (
                            <div>
                              <h4 className="font-semibold font-inter">Current Tools</h4>
                              <p className="text-sm font-inter">{selectedRequest.currentTools}</p>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="font-semibold font-inter">Challenges</h4>
                            <p className="text-sm font-inter">{selectedRequest.challenges}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold font-inter">Goals</h4>
                            <p className="text-sm font-inter">{selectedRequest.goals}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold font-inter">Preferred Demo Time</h4>
                            <p className="text-sm font-inter">{selectedRequest.preferredDemoTime}</p>
                          </div>
                          
                          {selectedRequest.additionalNotes && (
                            <div>
                              <h4 className="font-semibold font-inter">Additional Notes</h4>
                              <p className="text-sm font-inter">{selectedRequest.additionalNotes}</p>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <div className="text-sm text-gray-600 font-inter">
                                Created: {new Date(selectedRequest.createdAt).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600 font-inter">
                                Updated: {new Date(selectedRequest.updatedAt).toLocaleString()}
                              </div>
                            </div>
                            {getStatusBadge(selectedRequest.status)}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredRequests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 font-inter">No demo requests found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  );
}