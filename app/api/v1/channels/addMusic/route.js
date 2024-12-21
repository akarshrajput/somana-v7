import connectMongoDB from "@/app/_lib/mongodb";
import Channel from "@/app/_models/channelModel";
import Music from "@/app/_models/musicModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { channelId, musicId } = await request.json();

    if (!channelId || !musicId) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "channelId and musicId are required.",
        },
        { status: 400 }
      );
    }

    // Validate the existence of the music
    const music = await Music.findById(musicId);
    if (!music) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "Music not found.",
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

    // Check if the music is already in the tracks array
    if (channel.tracks.includes(musicId)) {
      return NextResponse.json(
        {
          statusText: "error",
          message: "Music is already added to the channel's tracks.",
        },
        { status: 400 }
      );
    }

    // Add the music to the tracks array and save the channel
    channel.tracks.push(musicId);
    await channel.save();

    return NextResponse.json(
      {
        statusText: "success",
        message: "Music added to the channel's tracks successfully.",
        data: {
          channel,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error adding Music to Channel:", err);

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
