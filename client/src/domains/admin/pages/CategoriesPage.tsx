import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/domains/shared/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/domains/shared/components/ui/card";
import { Button } from "@/domains/shared/components/ui/button";
import { Input } from "@/domains/shared/components/ui/input";
import { Badge } from "@/domains/shared/components/ui/badge";
import { useToast } from "@/domains/shared/hooks/use-toast";
import { Plus, Edit, Trash2, Tag, BarChart3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/domains/shared/components/ui/dialog";
import { Label } from "@/domains/shared/components/ui/label";

interface CategoryStats {
  name: string;
  count: number;
}

export function CategoriesPage() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Fetch categories with blog counts
  const { data: categoryStats = [], isLoading } = useQuery<CategoryStats[]>({
    queryKey: ['/api/admin/categories/stats'],
  });

  // Create category mutation
  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      return await apiRequest('/api/admin/categories', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/categories'] });
      setIsDialogOpen(false);
      setNewCategoryName("");
      toast({
        title: "Success",
        description: "Category created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create category",
        variant: "destructive",
      });
    },
  });

  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ oldName, newName }: { oldName: string; newName: string }) => {
      return await apiRequest('/api/admin/categories', {
        method: 'PUT',
        body: JSON.stringify({ oldName, newName }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/categories'] });
      setEditingCategory(null);
      setNewCategoryName("");
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update category",
        variant: "destructive",
      });
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      return await apiRequest(`/api/admin/categories/${encodeURIComponent(name)}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/categories'] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      });
    },
  });

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    createCategoryMutation.mutate(newCategoryName.trim());
  };

  const handleUpdateCategory = (oldName: string) => {
    if (!newCategoryName.trim()) return;
    updateCategoryMutation.mutate({ oldName, newName: newCategoryName.trim() });
  };

  const handleDeleteCategory = (name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"? This action cannot be undone.`)) {
      deleteCategoryMutation.mutate(name);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage blog categories and organize your content
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                Add a new category to organize your blog posts.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter category name"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateCategory}
                disabled={createCategoryMutation.isPending || !newCategoryName.trim()}
              >
                {createCategoryMutation.isPending ? 'Creating...' : 'Create Category'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryStats.map((category) => (
          <Card key={category.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditingCategory(category.name);
                    setNewCategoryName(category.name);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.name)}
                  className="text-red-600 hover:text-red-800"
                  disabled={category.count > 0}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  {category.count} blog posts
                </CardDescription>
                <Badge variant="secondary">
                  {category.count === 0 ? 'Empty' : 'Active'}
                </Badge>
              </div>
              
              {editingCategory === category.name && (
                <div className="mt-4 space-y-2">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleUpdateCategory(category.name);
                      if (e.key === 'Escape') setEditingCategory(null);
                    }}
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateCategory(category.name)}
                      disabled={updateCategoryMutation.isPending || !newCategoryName.trim()}
                    >
                      {updateCategoryMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(null);
                        setNewCategoryName("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {categoryStats.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No categories yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first category to organize blog posts
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}