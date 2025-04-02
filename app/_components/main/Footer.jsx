import Link from "next/link";
import SpecialLink from "../buttons/SpecialLink";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="relative dark:bg-black bg-white pb-4 pt-10 lg:pb-4 lg:pt-20 dark:bg-dark">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {/* Logo Section */}
          <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
            <div className="mb-10 w-full">
              <div className="flex items-center gap-2 mb-6">
                <Link href="/" className="inline-block max-w-[160px]">
                  <Logo />
                </Link>
                <Link
                  href="https://citeo-v2.vercel.app/"
                  target="_blank"
                  className="w-fit"
                >
                  <div className="flex gap-1">
                    <div className="border border-black dark:border-neutral-700 dark:bg-neutral-900 bg-neutral-400 rounded-md w-fit p-2.5">
                      <img src="/citeo-logo.png" className="h-4" />
                    </div>
                  </div>
                </Link>
              </div>
              <p className="mb-7 text-sm text-body-color dark:text-dark-6">
                Open Source company developed by Unknown Person - Somana Team
              </p>
            </div>
          </div>

          {/* Resources Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-4 font-semibold text-dark dark:text-white">
                Resources
              </h4>
              <ul className="space-y-1">
                <li>
                  <SpecialLink title="Notes" />
                </li>
                <li>
                  <SpecialLink title="Our Products" />
                </li>
                <li>
                  <SpecialLink title="User Flow" />
                </li>
                <li>
                  <SpecialLink title="User Strategy" />
                </li>
              </ul>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                Company
              </h4>
              <ul className="space-y-1">
                <li>
                  <SpecialLink href="/about" title="About Somana" />
                </li>
                <li>
                  <SpecialLink href="/contact" title="Contact & Support" />
                </li>
                <li>
                  <SpecialLink title="Success Story" />
                </li>
                <li>
                  <SpecialLink title="Setting & Privacy" />
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                Quick Links
              </h4>
              <ul className="space-y-1">
                <li>
                  <SpecialLink title="Premium Support" />
                </li>
                <li>
                  <SpecialLink title="Our Services" />
                </li>
                <li>
                  <SpecialLink title="Know our Team" />
                </li>
                <li>
                  <SpecialLink title="Download App" />
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                Follow Us On
              </h4>
              <div className="mb-6 flex items-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary"
                >
                  {/* Facebook Icon */}
                  <svg
                    width="8"
                    height="16"
                    viewBox="0 0 8 16"
                    className="fill-current"
                  >
                    <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-white dark:hover:border-primary"
                >
                  {/* Twitter Icon */}
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    className="fill-current"
                  >
                    <path d="M14.2194 2.06654L15.2 0.939335C15.4839 0.634051 15.5613 0.399217 15.5871 0.2818C14.8129 0.704501 14.0903 0.845401 13.6258 0.845401H13.4452L13.3419 0.751468C12.7226 0.258317 11.9484 0 11.1226 0C9.31613 0 7.89677 1.36204 7.89677 2.93542C7.89677 3.02935 7.89677 3.17025 7.92258 3.26419L8 3.73386L7.45806 3.71037C4.15484 3.61644 1.44516 1.03327 1.00645 0.587084C0.283871 1.76125 0.696774 2.88845 1.13548 3.59296L2.0129 4.90802L0.619355 4.20352C0.645161 5.18982 1.05806 5.96477 1.85806 6.52838L2.55484 6.99804L1.85806 7.25636C2.29677 8.45401 3.27742 8.94716 4 9.13503L4.95484 9.36986" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
