import React, { useState } from "react";
import {
  Home,
  FileText,
  DollarSign,
  Users,
  FileQuestion,
  MoreVertical,
  ChevronDown,
  CircleUser,
  LogOut,
  Search,
  Plus,
} from "lucide-react";
import ItacLogo from "../assets/images/itac-logo.jpeg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDwonOpen, setIsDropDwonOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);

  const permitApplications = [
    {
      fileName: "ITAC Anti-Dumping Application Questionnaire",
      fileType: "PDF",
      fileSize: "200 KB",
      dateUploaded: "Jan 4, 2024",
      lastUpdated: "Jan 4, 2024",
      uploadedBy: "Olivia Rhye",
    },
    {
      fileName: "ITAC Countervailing Application Questionnaire",
      fileType: "DOC",
      fileSize: "720 KB",
      dateUploaded: "Jan 4, 2024",
      lastUpdated: "Jan 4, 2024",
      uploadedBy: "Phoenix Baker",
    },
    {
      fileName: "ITAC Exporter Questionnaire",
      fileType: "DOC",
      fileSize: "16 MB",
      dateUploaded: "Jan 2, 2024",
      lastUpdated: "Jan 2, 2024",
      uploadedBy: "Lana Steiner",
    },
    {
      fileName: "ITAC Importer Questionnaire",
      fileType: "DOC",
      fileSize: "4.2 MB",
      dateUploaded: "Jan 6, 2024",
      lastUpdated: "Jan 6, 2024",
      uploadedBy: "Demi Wilkinson",
    },
    {
      fileName: "ITAC Safeguard Application Questionnaire",
      fileType: "DOC",
      fileSize: "12 MB",
      dateUploaded: "Jan 8, 2024",
      lastUpdated: "Jan 8, 2024",
      uploadedBy: "Candice Wu",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen relative p-4 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="flex justify-start">
          <img
            src={ItacLogo}
            alt="ITAC Logo"
            className="mb-8"
            style={{ maxWidth: "65%" }}
          />
        </div>
        <nav className="mb-auto">
          <SidebarLink icon={<Home />} text="Home" active />
          <SidebarLink icon={<FileText />} text="Contracts" hasSubmenu />
          <SidebarLink icon={<DollarSign />} text="Billing" />
          <SidebarLink icon={<Users />} text="Import & Export Control" />
        </nav>
        {/* <SidebarLink icon={<FileQuestion />} text="Log a case" /> */}
        <div className="absolute bottom-0  ">
          <a
            href="#"
            className={` flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 ${"text-gray-600 hover:bg-gray-50"}`}
          >
            <FileQuestion />
            <span className="font-semibold">Log a case</span>
            {/* {hasSubmenu && <ChevronDown className="ml-auto h-4 w-4" />} */}
          </a>
          <a
            href="#"
            className={` flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 ${"text-gray-600 hover:bg-gray-50"}`}
          >
            <CircleUser />
            <span className="font-semibold " style={{ marginRight: "70px" }}>
              Zuko M
            </span>
            <LogOut />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-500">
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-900">Dashboard</span>
            </div>
          </div>

          <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden mr-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            <button
              onClick={() => setIsDropDwonOpen(!isDropDwonOpen)}
              className="bg-green-700 relative  hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Apply for Permits
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {isDropDwonOpen && (
              <div
                class="absolute right-8 z-10 mt-2 top-[100px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <a
                    href="#"
                    className="block border-b font-semibold px-4 py-2 text-sm text-gray-700   hover:bg-green-700 hover:text-white"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    onClick={() => navigate("/application")}
                  >
                    ITAC Anti-Dumping Application Questionnaire{" "}
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-green-700 hover:text-white"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                  >
                    ITAC Countervailing Application Questionnaire
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-700 hover:text-white"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2"
                  >
                    ITAC Exporter Questionnaire
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-700 hover:text-white"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2"
                  >
                    ITAC Safeguard Application Questionnaire{" "}
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-green-700 hover:text-white"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-2"
                  >
                    ITAC Safeguard Application Questionnaire{" "}
                  </a>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className=" mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <h2 className="text-lg font-semibold mb-4">Permit Application</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        File name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date uploaded
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last updated
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Uploaded by
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {permitApplications.map((app, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`flex-shrink-0 h-10 w-10 rounded flex items-center justify-center ${
                                app.fileType === "PDF"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {app.fileType}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {app.fileName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {app.fileSize}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.dateUploaded}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.uploadedBy}
                        </td>
                        <td className="px-6 relative py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setItemIndex(index);
                              setIsActionsOpen(!isActionsOpen);
                            }}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          {isActionsOpen && itemIndex === index && (
                            <div
                              class="absolute right-8 z-10 mt-2 top-[50px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                              tabindex="-1"
                            >
                              <div class="py-1" role="none">
                                <a
                                  href="#"
                                  className="block border-b font-semibold px-4 py-2 text-sm text-gray-700 text-left   hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabindex="-1"
                                  id="menu-item-0"
                                >
                                  Actions
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabindex="-1"
                                  id="menu-item-1"
                                >
                                  View Application
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabindex="-1"
                                  id="menu-item-2"
                                >
                                  Download Documents
                                </a>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, text, active = false, hasSubmenu = false }) => (
  <a
    href="#"
    className={` font-semibold flex items-center space-x-2 p-2 rounded-lg ${
      active ? "bg-gray-100 text-green-600" : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    <span>{text}</span>
    {hasSubmenu && <ChevronDown className="ml-auto h-4 w-4" />}
  </a>
);

export default Dashboard;
