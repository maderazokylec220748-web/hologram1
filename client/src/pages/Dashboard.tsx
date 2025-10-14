import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Gauge, FileText, Settings, LogOut, User, HelpCircle, ChevronLeft } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    setLocation("/admin");
  };

  const navItems = [
    { icon: Gauge, label: "Dashboard", active: true },
    { icon: FileText, label: "Manage Data", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: LogOut, label: "Logout", active: false, onClick: handleLogout },
  ];

  const bottomItems = [
    { icon: User, label: "Account" },
    { icon: HelpCircle, label: "Help" },
  ];

  return (
    <div className="flex h-screen bg-[#8B2E2E]">
      {/* Sidebar */}
      <div
        className={`bg-[#D4C5A0] transition-all duration-300 relative ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 mb-12">
            <SiGooglescholar className="w-10 h-10 text-[#8B4513]" />
            <div>
              <h1 className="text-[#8B4513] font-bold text-sm">Westmead</h1>
              <p className="text-[#8B4513] text-xs">Admin Dashboard</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-[#8B4513] text-white"
                      : "text-[#8B4513] hover:bg-[#8B4513]/10"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Items */}
          <div className="space-y-2 mt-auto">
            {bottomItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#8B4513] hover:bg-[#8B4513]/10 transition-colors"
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-24 bg-[#D4C5A0] border-2 border-[#8B4513] rounded-full p-1 hover:bg-[#8B4513] hover:text-white transition-colors"
          data-testid="button-toggle-sidebar"
        >
          <ChevronLeft
            className={`w-5 h-5 text-[#8B4513] transition-transform ${
              !sidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <h1
          className="text-8xl font-bold text-white/90 tracking-wider"
          style={{ fontFamily: 'Georgia, serif' }}
          data-testid="text-dashboard-title"
        >
          DASHBOARD
        </h1>
      </div>

      {/* Sidebar Toggle Button (when closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-24 bg-[#D4C5A0] border-2 border-[#8B4513] rounded-full p-2 hover:bg-[#8B4513] hover:text-white transition-colors z-50"
          data-testid="button-open-sidebar"
        >
          <ChevronLeft className="w-5 h-5 text-[#8B4513] rotate-180" />
        </button>
      )}
    </div>
  );
}
