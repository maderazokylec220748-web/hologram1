import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, Trash2, AlertTriangle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SystemSettings() {
  const { toast } = useToast();

  const clearLogsMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", "/api/chat/history", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
      toast({
        title: "Logs Cleared",
        description: "All chat logs have been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear logs.",
        variant: "destructive",
      });
    },
  });

  const handleRestart = () => {
    toast({
      title: "Restart Requested",
      description: "This would restart the AI model (feature not implemented).",
    });
  };

  const handleReloadData = () => {
    queryClient.invalidateQueries();
    toast({
      title: "Data Reloaded",
      description: "All data has been refreshed from the database.",
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2" data-testid="text-settings-title">
          ⚙️ System Settings
        </h1>
        <p className="text-white/70">Manage system operations and data</p>
      </div>

      {/* System Controls */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">System Controls</CardTitle>
          <CardDescription className="text-white/60">
            Control AI model and data operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Restart AI Model</p>
                <p className="text-white/50 text-sm">Restart the hologram AI system</p>
              </div>
            </div>
            <Button onClick={handleRestart} data-testid="button-restart-ai">
              Restart
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Reload School Data</p>
                <p className="text-white/50 text-sm">Refresh data from database</p>
              </div>
            </div>
            <Button onClick={handleReloadData} data-testid="button-reload-data">
              Reload
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-white font-medium">Delete Logs</p>
                <p className="text-white/50 text-sm">Remove all chat history</p>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" data-testid="button-delete-logs">
                  Delete All Logs
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all
                    chat logs and conversation history from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => clearLogsMutation.mutate()}
                    className="bg-red-600 hover:bg-red-700"
                    data-testid="button-confirm-delete-logs"
                  >
                    Delete All Logs
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-500/10 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            ⚠️ Danger Zone - Developer Access Only
          </CardTitle>
          <CardDescription className="text-red-300/60">
            These actions require admin privileges and cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 text-sm">
            Advanced system operations should only be performed by authorized administrators.
            Contact system support for assistance with critical operations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
