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
    router.push(`?view=${tab}`, { shallow: true }); // Update the URL without reloading the page
  };

  return (
    <Tabs
      defaultValue={currentTab}
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-full"
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
        <CurrentUserProfile session={session} />
      </TabsContent>
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
    </Tabs>
  );
}
