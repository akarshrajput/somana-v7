import connectMongoDB from "@/app/_lib/mongodb";
import Blog from "@/app/_models/blogModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectMongoDB();

    // Get the date of 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch blogs viewed in the last 7 days
    const trendingBlogs = await Blog.aggregate([
      {
        $match: {
          views: { $exists: true, $not: { $size: 0 } },
          updatedAt: { $gte: sevenDaysAgo }, // Check if the blog was updated in the last 7 days
        },
      },
      {
        $addFields: {
          numberOfViews: { $size: "$views" }, // Count number of views
        },
      },
      {
        $sort: { numberOfViews: -1 }, // Sort by most viewed
      },
      {
        $limit: 10, // Limit to top 10 trending blogs
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          content: 0, // Exclude content to optimize response
          "author.password": 0,
          "author.email": 0,
        },
      },
    ]);

    return NextResponse.json(
      {
        statusText: "success",
        message: "Trending blogs fetched successfully",
        results: trendingBlogs.length,
        data: {
          blogs: trendingBlogs,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching trending blogs:", err);
    return NextResponse.json(
      {
        statusText: "error",
        message: "Error getting trending blogs",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
