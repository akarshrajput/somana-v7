"use client";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Send } from "lucide-react";
import { WhatsappLogo, TelegramLogo } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const ShareReferral = () => {
  const websiteUrl = "https://somana.in";
  const message = encodeURIComponent(
    "Somana : Find amazing things : College Notes, Stories, Funny podcasts, and more... " +
      websiteUrl
  );

  const shareOptions = [
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${message}`,
      icon: <WhatsappLogo className="size-5 " />,
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${websiteUrl}&text=${message}`,
      icon: <TelegramLogo className="size-5 " />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${message}`,
      icon: <Twitter className="size-5" />,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`,
      icon: <Facebook className="size-5" />,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${websiteUrl}&title=Check+out+Somana`,
      icon: <Linkedin className="size-5" />,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Somana",
          text: "Check out Somana! An amazing platform for blogs, music, and more.",
          url: websiteUrl,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Web Share API not supported. Please use the buttons below.");
    }
  };

  return (
    <Card className="rounded-md border p-3 flex flex-col w-full max-w-md mx-auto">
      <p className="mb-4 text-sm  font-medium">
        Share us with your friends and get access to upcoming features.
      </p>
      {/* <Button onClick={handleShare} className="p-3 w-fit gap-2">
        <Share2 size={18} /> Share
      </Button> */}
      <div className="flex gap-4 flex-wrap">
        {shareOptions.map((option) => (
          <Link
            key={option.name}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300 flex items-center justify-center"
          >
            <Button variant="secondary" size="icon">
              {option.icon}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default ShareReferral;
