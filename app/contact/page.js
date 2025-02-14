import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="min-h-screen  dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl  font-medium mb-6">Contact & Services</h1>
        <p className=" text-gray-600 dark:text-gray-300 mb-8">
          Connect with us for inquiries, support, and explore our range of
          services designed to enhance your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-5xl">
        {services.map((service, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm dark:text-gray-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
        <p className="text-gray-600 text-sm dark:text-gray-300 mb-6">
          Reach out to us for any questions or collaborations.
        </p>
        <Button className="px-6 py-3">Contact Us</Button>
      </div>
    </div>
  );
}

const services = [
  {
    title: "AI Consulting",
    description: "Get expert AI-driven solutions tailored for your business.",
  },
  {
    title: "Content Creation",
    description:
      "Engage with high-quality blogs, music, and multimedia services.",
  },
  {
    title: "Web & App Development",
    description:
      "Build modern, scalable, and high-performance digital experiences.",
  },
];
