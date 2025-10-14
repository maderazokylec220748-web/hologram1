import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAdminSettingsSchema, type AdminSettings } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Settings, BarChart3, Save, Home } from "lucide-react";
import { Link } from "wouter";
import { z } from "zod";

type FormData = z.infer<typeof insertAdminSettingsSchema>;

export default function Admin() {
  const { toast } = useToast();

  const { data: settings, isLoading: settingsLoading } = useQuery<AdminSettings>({
    queryKey: ['/api/admin/settings'],
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery<{
    totalMessages: number;
    userMessages: number;
    assistantMessages: number;
    recentMessages: Array<{ role: string; content: string; timestamp: string }>;
  }>({
    queryKey: ['/api/admin/analytics'],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(insertAdminSettingsSchema),
    values: settings ? {
      schoolName: settings.schoolName,
      schoolMotto: settings.schoolMotto,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
    } : undefined,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest('PUT', '/api/admin/settings', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/settings'] });
      toast({
        title: "Settings Updated",
        description: "School information has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 glow-cyan animate-pulse" />
              <div className="absolute inset-0.5 rounded-lg bg-background flex items-center justify-center">
                <Settings className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400">Manage school information and view analytics</p>
            </div>
          </div>
          <Link href="/" data-testid="link-home">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Kiosk
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gray-800/50 border-gray-700" data-testid="card-analytics">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="w-5 h-5" />
                Chat Analytics
              </CardTitle>
              <CardDescription className="text-gray-400">
                Overview of chat interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsLoading ? (
                <div className="text-gray-400">Loading analytics...</div>
              ) : analytics ? (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-cyan-400" data-testid="text-total-messages">
                        {analytics.totalMessages}
                      </div>
                      <div className="text-sm text-gray-400">Total Messages</div>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400" data-testid="text-user-messages">
                        {analytics.userMessages}
                      </div>
                      <div className="text-sm text-gray-400">User Messages</div>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400" data-testid="text-assistant-messages">
                        {analytics.assistantMessages}
                      </div>
                      <div className="text-sm text-gray-400">AI Responses</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Messages</h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {analytics.recentMessages.map((msg, index) => (
                        <div
                          key={index}
                          className="bg-gray-700/30 p-3 rounded text-sm"
                          data-testid={`message-${index}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-medium ${msg.role === 'user' ? 'text-blue-400' : 'text-purple-400'}`}>
                              {msg.role === 'user' ? 'User' : 'AI Assistant'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-gray-300 line-clamp-2">{msg.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-400">No analytics available</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700" data-testid="card-settings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="w-5 h-5" />
                School Settings
              </CardTitle>
              <CardDescription className="text-gray-400">
                Update school information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {settingsLoading ? (
                <div className="text-gray-400">Loading settings...</div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">School Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white"
                              data-testid="input-school-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="schoolMotto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">School Motto</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white"
                              data-testid="input-school-motto"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Contact Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-gray-700 border-gray-600 text-white"
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Contact Phone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white"
                              data-testid="input-contact-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-gray-700 border-gray-600 text-white"
                              data-testid="input-address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      disabled={updateMutation.isPending}
                      data-testid="button-save-settings"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
