"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/app/loading";

// Function to generate valid, unique CSS-safe IDs
const generateUniqueId = (prefix = "podcastList") =>
  `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

const PodcastList = ({ api }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Generate a unique CSS-safe ID for each PodcastList instance
  const uniqueId = generateUniqueId();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(api, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPodcasts(response.data.data.podcasts);
      } catch (err) {
        console.error("Error fetching podcasts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [api]);

  return (
    <div className="px-4 relative">
      <div>
        {/* Custom Previous and Next Buttons with unique IDs */}
        <button
          className="absolute top-[35%] left-0 z-10 p-2 h-10 w-10 bg-gray-800/50 text-white rounded-sm hover:bg-gray-600/30 transition-all"
          id={`prevButton-${uniqueId}`}
        >
          <ChevronLeft strokeWidth="3" />
        </button>

        <button
          className="absolute top-[35%] right-0 z-10 p-2 h-10 w-10 bg-gray-800/50 text-white rounded-sm hover:bg-gray-600/30 transition-all"
          id={`nextButton-${uniqueId}`}
        >
          <ChevronRight strokeWidth="3" />
        </button>

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={12}
          navigation={{
            prevEl: `#prevButton-${uniqueId}`, // Use unique ID for previous button
            nextEl: `#nextButton-${uniqueId}`, // Use unique ID for next button
          }}
        >
          {podcasts.map((podcast, index) => (
            <SwiperSlide key={index}>
              {loading ? <Loading /> : <PodcastInfo podcast={podcast} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const PodcastInfo = ({ podcast }) => {
  return (
    <Link
      href={`/podcast/${podcast._id}?${podcast.podcastName}`}
      className="p-2 rounded-sm cursor-pointer"
    >
      <img
        className="aspect-square object-cover mb-2 rounded-sm"
        src={podcast.featuredImage}
        alt={podcast.podcastName}
      />
      <p className="font-medium text-sm">{podcast.podcastName}</p>
      <p className="font-medium dark:text-stone-400 text-stone-500 text-sm">
        {podcast.author.name}
      </p>
    </Link>
  );
};

export default PodcastList;
