"use client";
import ChannelDetails from "@/app/_components/channelComponents/ChannelDetails";
import ChannelStories from "@/app/_components/channelComponents/ChannelStories";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  return (
    <div className="px-2 py-2 flex justify-center mt-16">
      <div className="w-[1200px]">
        <ChannelDetails channelId={params.channelId} />
      </div>
    </div>
  );
};
export default page;
