import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Professor, Event, Faq } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ProfessorDialog from "./ProfessorDialog";
import EventDialog from "./EventDialog";
import { format } from "date-fns";

export default function ManageData() {
  const [activeTab, setActiveTab] = useState("professors");
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showProfessorDialog, setShowProfessorDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const { toast } = useToast();

  const { data: professors = [], isLoading: professorsLoading } = useQuery<Professor[]>({
    queryKey: ["/api/professors"],
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: faqs = [], isLoading: faqsLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const deleteProfessorMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/professors/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/professors"] });
      toast({ title: "Professor deleted successfully" });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/events/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted successfully" });
    },
  });

  const deleteFaqMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/faqs/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faqs"] });
      toast({ title: "FAQ deleted successfully" });
    },
  });

  const handleAddProfessor = () => {
    setEditingProfessor(null);
    setShowProfessorDialog(true);
  };

  const handleEditProfessor = (professor: Professor) => {
    setEditingProfessor(professor);
    setShowProfessorDialog(true);
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowEventDialog(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventDialog(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-6" data-testid="text-manage-data-title">
        📚 Manage School Data
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="professors" data-testid="tab-professors">🔘 Professors</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">🔘 Events</TabsTrigger>
          <TabsTrigger value="faqs" data-testid="tab-faqs">🔘 FAQs</TabsTrigger>
        </TabsList>

        {/* Professors Tab */}
        <TabsContent value="professors">
          <Card className="bg-white/10 border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Professors</CardTitle>
              <Button onClick={handleAddProfessor} data-testid="button-add-professor">
                <Plus className="w-4 h-4 mr-2" /> Add New Professor
              </Button>
            </CardHeader>
            <CardContent>
              {professorsLoading ? (
                <div className="text-white/50 text-center py-8">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Department</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Position</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professors.map((professor) => (
                      <TableRow key={professor.id} data-testid={`row-professor-${professor.id}`}>
                        <TableCell className="text-white">{professor.name}</TableCell>
                        <TableCell className="text-white/80">{professor.department}</TableCell>
                        <TableCell className="text-white/80">{professor.email || "N/A"}</TableCell>
                        <TableCell className="text-white/80">{professor.position}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProfessor(professor)}
                              data-testid={`button-edit-professor-${professor.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteProfessorMutation.mutate(professor.id)}
                              data-testid={`button-delete-professor-${professor.id}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card className="bg-white/10 border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Events</CardTitle>
              <Button onClick={handleAddEvent} data-testid="button-add-event">
                <Plus className="w-4 h-4 mr-2" /> Add New Event
              </Button>
            </CardHeader>
            <CardContent>
              {eventsLoading ? (
                <div className="text-white/50 text-center py-8">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Title</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Location</TableHead>
                      <TableHead className="text-white">Category</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id} data-testid={`row-event-${event.id}`}>
                        <TableCell className="text-white">{event.title}</TableCell>
                        <TableCell className="text-white/80">
                          {format(new Date(event.eventDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-white/80">{event.location || "N/A"}</TableCell>
                        <TableCell className="text-white/80">{event.category}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEvent(event)}
                              data-testid={`button-edit-event-${event.id}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEventMutation.mutate(event.id)}
                              data-testid={`button-delete-event-${event.id}`}
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {faqsLoading ? (
                <div className="text-white/50 text-center py-8">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Question</TableHead>
                      <TableHead className="text-white">Times Asked</TableHead>
                      <TableHead className="text-white">Last Asked</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq) => (
                      <TableRow key={faq.id} data-testid={`row-faq-${faq.id}`}>
                        <TableCell className="text-white">{faq.question}</TableCell>
                        <TableCell className="text-white/80">{faq.count}</TableCell>
                        <TableCell className="text-white/80">
                          {format(new Date(faq.lastAsked), "MMM dd, yyyy HH:mm")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteFaqMutation.mutate(faq.id)}
                            data-testid={`button-delete-faq-${faq.id}`}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProfessorDialog
        open={showProfessorDialog}
        onOpenChange={setShowProfessorDialog}
        professor={editingProfessor}
      />

      <EventDialog
        open={showEventDialog}
        onOpenChange={setShowEventDialog}
        event={editingEvent}
      />
    </div>
  );
}
