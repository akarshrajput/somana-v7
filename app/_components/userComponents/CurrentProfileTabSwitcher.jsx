import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentUserProfile from "./CurrentUserProfile";

export function CurrentProfileTabSwitcher({ session }) {
  return (
    <Tabs defaultValue="account" className="w-full">
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
    </Tabs>
  );
}
