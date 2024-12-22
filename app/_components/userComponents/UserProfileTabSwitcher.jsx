"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserProfile from "./UserProfile";

export function UserProfileTabSwitcher({ username }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("view") || "account";

  const handleTabChange = (tab) => {
    router.push(`?view=${tab}`, { shallow: true }); // Update the URL without reloading the page
  };
  return (
    <Tabs
      className="w-full"
      defaultValue={currentTab}
      value={currentTab}
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="channel">Channel</TabsTrigger>
        <TabsTrigger value="story">Story</TabsTrigger>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="podcast">Podcast</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <UserProfile username={username} />
      </TabsContent>
    </Tabs>
  );
}
