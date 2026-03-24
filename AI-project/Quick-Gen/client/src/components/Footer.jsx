import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-black px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 mt-20">
      
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">

        {/* Left Section */}
        <div className="md:max-w-96">
          <img
            alt="logo"
            className="h-11"
            src={assets.logo}
          />

          <p className="mt-6 text-sm">
            Experience the power of AI with QuickAi. <br />
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>

          <div className="flex items-center gap-2 mt-4">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="google play"
              className="h-10 w-auto border border-white rounded"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="app store"
              className="h-10 w-auto border border-white rounded"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">

          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2 mb-4">
              <p>+1-234-567-890</p>
              <p>contact@example.com</p>
            </div>

            {/* Subscribe */}
            <div>
              <p className="text-sm mb-2">Subscribe to our newsletter</p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 text-black rounded-l outline-none"
                />

                <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700">
                  Subscribe
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} ©
        <a href="https://prebuiltui.com"> GreatStack</a>. All Right Reserved.
      </p>

    </footer>
  )
}

export default Footer
