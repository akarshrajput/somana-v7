import connectMongoDB from "@/app/_lib/mongodb";
import Channel from "@/app/_models/channelModel";
import Podcast from "@/app/_models/podcastModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { channelId, podcastId } = await request.json();

    if (!channelId || !podcastId) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "channelId and podcastId are required.",
        },
        { status: 400 }
      );
    }

    // Validate the existence of the podcast
    const podcast = await Podcast.findById(podcastId);
    if (!podcast) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "Podcast not found.",
        },
        { status: 404 }
      );
    }

    // Validate the existence of the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "Channel not found.",
        },
        { status: 404 }
      );
    }

    // Check if the podcast is already in the podcasts array
    if (channel.podcasts.includes(podcastId)) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "Podcast is already added to the channel's podcasts.",
        },
        { status: 400 }
      );
    }

    // Add the podcast to the podcasts array and save the channel
    channel.podcasts.push(podcastId);
    await channel.save();

    return NextResponse.json(
      {
        statusText: "success",
        message: "Podcast added to the channel's podcasts successfully.",
        data: {
          channel,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error adding Podcast to Channel:", err);

    return NextResponse.json(
      {
        statusText: "error",
        message: "Server Error.",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
