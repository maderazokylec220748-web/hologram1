import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertProfessorSchema, type Professor, type InsertProfessor } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ProfessorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  professor?: Professor | null;
}

export default function ProfessorDialog({ open, onOpenChange, professor }: ProfessorDialogProps) {
  const { toast } = useToast();
  const isEditing = !!professor;

  const form = useForm<InsertProfessor>({
    resolver: zodResolver(insertProfessorSchema),
    defaultValues: {
      name: professor?.name || "",
      department: professor?.department || "",
      position: professor?.position || "",
      email: professor?.email || "",
      office: professor?.office || "",
      specialization: professor?.specialization || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertProfessor) => {
      if (isEditing) {
        return await apiRequest("PUT", `/api/professors/${professor.id}`, data);
      } else {
        return await apiRequest("POST", "/api/professors", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/professors"] });
      toast({
        title: isEditing ? "Professor updated" : "Professor added",
        description: `Professor ${isEditing ? "updated" : "added"} successfully.`,
      });
      onOpenChange(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "add"} professor.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProfessor) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Professor Info" : "Add New Professor"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. John Cruz" {...field} data-testid="input-professor-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} data-testid="input-professor-department" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Professor" {...field} data-testid="input-professor-position" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="cruz@school.edu" 
                      {...field} 
                      value={field.value || ""}
                      data-testid="input-professor-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="office"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Room 301" 
                      {...field} 
                      value={field.value || ""}
                      data-testid="input-professor-office"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Artificial Intelligence" 
                      {...field} 
                      value={field.value || ""}
                      data-testid="input-professor-specialization"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel-professor"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                data-testid="button-save-professor"
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
