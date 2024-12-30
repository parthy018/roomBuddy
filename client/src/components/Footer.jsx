import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Footer = () => {
  return (
    <div>
      <footer class="bg-gray-800">
        <div class="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div class="flex justify-center text-teal-300 sm:justify-start">
                {/* { room body logo in this place} */}
              </div>

              <p class="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-400 sm:max-w-xs sm:mx-0 sm:text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt consequuntur amet culpa cum itaque neque.
              </p>

              <ul className="flex justify-center gap-6 mt-8 md:gap-8 sm:justify-start">
                <li>
                  <a
                    href="/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-teal-500 transition hover:text-teal-500/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <FaFacebook className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-teal-500 transition hover:text-teal-500/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-teal-500 transition hover:text-teal-500/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-teal-500 transition hover:text-teal-500/75"
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="w-6 h-6" />
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-teal-500 transition hover:text-teal-500/75"
                  >
                    <span className="sr-only">Dribbble</span>
                    <FaDribbble className="w-6 h-6" />
                  </a>
                </li>
              </ul>
            </div>

            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 md:grid-cols-4">
              <div class="text-center sm:text-left">
                <p class="text-lg font-medium text-white">About Us</p>

                <nav class="mt-8">
                  <ul class="space-y-4 text-sm">
                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Company History
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Meet the Team
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Employee Handbook
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Careers
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div class="text-center sm:text-left">
                <p class="text-lg font-medium text-white">Our Services</p>

                <nav class="mt-8">
                  <ul class="space-y-4 text-sm">
                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Web Development
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Web Design
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Marketing
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Google Ads
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div class="text-center sm:text-left">
                <p class="text-lg font-medium text-white">Helpful Links</p>

                <nav class="mt-8">
                  <ul class="space-y-4 text-sm">
                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        FAQs
                      </a>
                    </li>

                    <li>
                      <a
                        class="text-white transition hover:text-white/75"
                        href="/"
                      >
                        Support
                      </a>
                    </li>

                    <li>
                      <a
                        class="flex group justify-center sm:justify-start gap-1.5"
                        href="/"
                      >
                        <span class="text-white transition group-hover:text-white/75">
                          Live Chat
                        </span>

                        <span class="relative flex w-2 h-2 -mr-2">
                          <span class="absolute inline-flex w-full h-full bg-teal-400 rounded-full opacity-75 animate-ping"></span>
                          <span class="relative inline-flex w-2 h-2 bg-teal-500 rounded-full"></span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div class="text-center sm:text-left">
                <p class="text-lg font-medium text-white">Contact Us</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="flex items-center justify-center sm:justify-start gap-1.5 group"
                      href="/"
                    >
                      <HiOutlineMail className="w-5 h-5 text-white shrink-0" />
                      <span className="text-white transition group-hover:text-white/75">
                        john@doe.com
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="flex items-center justify-center sm:justify-start gap-1.5 group"
                      href="/"
                    >
                      <HiOutlinePhone className="w-5 h-5 text-white shrink-0" />
                      <span className="text-white transition group-hover:text-white/75">
                        0123456789
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                    <HiOutlineLocationMarker className="w-5 h-5 text-white shrink-0" />
                    <address className="-mt-0.5 not-italic text-white">
                      213 Lane, London, United Kingdom
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="pt-6 mt-12 border-t border-gray-800">
            <div class="text-center sm:flex sm:justify-between sm:text-left">
              <p class="text-sm text-gray-400">
                <span class="block sm:inline">All rights reserved.</span>

                <a
                  class="inline-block text-teal-500 underline transition hover:text-teal-500/75"
                  href="/"
                >
                  Terms & Conditions
                </a>

                <span>&middot;</span>

                <a
                  class="inline-block text-teal-500 underline transition hover:text-teal-500/75"
                  href="/"
                >
                  Privacy Policy
                </a>
              </p>

              <p class="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
                &copy; 2022 Company Name
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
