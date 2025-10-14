import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity } from "lucide-react";
import { ChatMessage } from "@shared/schema";
import { format } from "date-fns";

export default function DashboardOverview() {
  const { data: chatHistory, isLoading: historyLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/history"],
  });

  const prohibitedPrompts = chatHistory?.filter(msg => 
    msg.role === "assistant" && msg.content.toLowerCase().includes("prohibited")
  ) || [];

  const recentActivity = chatHistory?.slice(0, 10) || [];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2" data-testid="text-dashboard-title">
          🏫 School Hologram Admin Panel
        </h1>
        <p className="text-white/70">Manage your AI hologram system</p>
      </div>

      {/* Prohibited Prompts Alert */}
      {prohibitedPrompts.length > 0 && (
        <Card className="bg-red-500/20 border-red-500">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-white font-medium" data-testid="text-prohibited-count">
              ⚠️ {prohibitedPrompts.length} prohibited prompts detected this week
            </span>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity / Logs */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5" />
            📈 Recent Activity / Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {historyLoading ? (
              <div className="text-white/50 text-center py-8">Loading logs...</div>
            ) : recentActivity.length === 0 ? (
              <div className="text-white/50 text-center py-8">No recent activity</div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((msg, idx) => {
                  const nextMsg = recentActivity[idx + 1];
                  const isQuestion = msg.role === "user";
                  const isProhibited = msg.role === "assistant" && msg.content.toLowerCase().includes("prohibited");

                  if (isQuestion && nextMsg?.role === "assistant") {
                    return (
                      <div 
                        key={msg.id} 
                        className="bg-white/5 rounded-lg p-4 space-y-2"
                        data-testid={`log-entry-${idx}`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-blue-400 font-semibold">Q:</span>
                          <p className="text-white flex-1">{msg.content}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-400 font-semibold">A:</span>
                          <p className="text-white/90 flex-1">
                            {nextMsg.content.toLowerCase().includes("prohibited") ? (
                              <>
                                <Badge variant="destructive" className="mr-2">
                                  ⚠️ Prohibited
                                </Badge>
                                {nextMsg.content}
                              </>
                            ) : (
                              nextMsg.content
                            )}
                          </p>
                        </div>
                        <div className="text-xs text-white/40">
                          {format(new Date(msg.timestamp), "MMM dd, yyyy HH:mm")}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
