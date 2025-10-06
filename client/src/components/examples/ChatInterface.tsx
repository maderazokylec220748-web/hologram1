import ChatInterface from '../ChatInterface';

export default function ChatInterfaceExample() {
  return (
    <div className="h-screen bg-background">
      <ChatInterface onMessageSend={(msg) => console.log('Message sent:', msg)} />
    </div>
  );
}
