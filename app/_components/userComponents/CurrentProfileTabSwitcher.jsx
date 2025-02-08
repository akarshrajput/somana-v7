"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentUserProfile from "./CurrentUserProfile";
import StoryList from "../storyComponents/StoryList";
import CurrentUserChannelView from "../channelComponents/CurrentUserChannelView";

export function CurrentProfileTabSwitcher({ session }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("view") || "account";

  const handleTabChange = (tab) => {
    router.push(`?view=${tab}`, { shallow: true });
  };

  return (
    <Tabs
      defaultValue={currentTab}
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      {/* Show only Account tab on Mobile, all tabs on larger screens */}
      <TabsList className="w-full flex md:grid md:grid-cols-6">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="channel">Channel</TabsTrigger>
        <TabsTrigger value="story">Story</TabsTrigger>
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="podcast">Podcast</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      {/* Only show "Account" on mobile, all on larger screens */}
      <TabsContent value="account">
        <CurrentUserProfile session={session} />
      </TabsContent>
      <div className="hidden md:block">
        <TabsContent value="channel">
          <CurrentUserChannelView session={session} />
        </TabsContent>
        <TabsContent value="story">
          <StoryList session={session} />
        </TabsContent>
        <TabsContent value="music">
          <div>Music</div>
        </TabsContent>
        <TabsContent value="podcast">
          <div>Podcast</div>
        </TabsContent>
        <TabsContent value="settings">
          <div>Settings</div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
