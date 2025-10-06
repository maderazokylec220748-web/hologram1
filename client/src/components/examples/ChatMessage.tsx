import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-4 max-w-3xl mx-auto">
      <ChatMessage 
        role="user" 
        content="What are the library hours on campus?" 
      />
      <ChatMessage 
        role="assistant" 
        content="The main library is open Monday-Friday from 8:00 AM to 10:00 PM, and Saturday-Sunday from 10:00 AM to 6:00 PM. During finals week, we extend hours until midnight." 
      />
    </div>
  );
}
