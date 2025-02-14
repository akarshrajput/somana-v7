import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-medium mb-6">About Somana</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Somana is an innovative platform that seamlessly blends blogs, music,
          articles, videos, and AI-powered interactions to create an engaging
          digital experience.
        </p>
        <Button className="px-6 py-3">Explore Somana</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-5xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800  rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Interactions",
    description:
      "Engage with intelligent AI for personalized recommendations and insights.",
  },
  {
    title: "Diverse Content",
    description:
      "Explore a variety of content, including blogs, music, videos, and articles, all in one place.",
  },
  {
    title: "Seamless Experience",
    description:
      "Enjoy a smooth and responsive design optimized for all devices.",
  },
];
