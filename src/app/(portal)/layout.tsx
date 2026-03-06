"use client";

import { useState } from "react";
import { PortalSidebar } from "@/components/portal/portal-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mockClientProfile, mockNotifications } from "@/lib/mock-portal";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <PortalSidebar className="hidden lg:flex" unreadCount={unreadCount} />
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <PortalSidebar unreadCount={unreadCount} />
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar profile={mockClientProfile} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
