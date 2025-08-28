import React, { useState } from "react";
import {
  Home,
  FileText,
  DollarSign,
  FileQuestion,
  MoreVertical,
  ChevronDown,
  CircleUser,
  LogOut,
  ArrowLeft,
  Eye,
  Download,
  Mail,
} from "lucide-react";
import ItacLogo from "../assets/images/dcs-logo.png";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDwonOpen, setIsDropDwonOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const navigate = useNavigate();

  const invoices = [
    {
      invoiceNumber: "INV-2024-001",
      customerName: "ABC Manufacturing Ltd",
      amount: 15750.0,
      issueDate: "Jan 15, 2024",
      dueDate: "Feb 15, 2024",
      status: "pending_payment",
      description: "Industrial equipment supply",
      items: [
        {
          description: "Steel plates",
          quantity: 50,
          unitPrice: 250.0,
          total: 12500.0,
        },
        {
          description: "Welding equipment",
          quantity: 5,
          unitPrice: 650.0,
          total: 3250.0,
        },
      ],
      customerEmail: "procurement@abcmanufacturing.com",
      paymentTerms: "Net 30 days",
    },
    {
      invoiceNumber: "INV-2024-002",
      customerName: "XYZ Imports Co",
      amount: 8950.0,
      issueDate: "Jan 18, 2024",
      dueDate: "Feb 18, 2024",
      status: "pending_approval",
      description: "Import documentation services",
      items: [
        {
          description: "Import permit processing",
          quantity: 1,
          unitPrice: 5000.0,
          total: 5000.0,
        },
        {
          description: "Customs clearance",
          quantity: 1,
          unitPrice: 3950.0,
          total: 3950.0,
        },
      ],
      customerEmail: "admin@xyzimports.com",
      paymentTerms: "Net 30 days",
    },
    {
      invoiceNumber: "INV-2024-003",
      customerName: "Global Trade Solutions",
      amount: 12300.0,
      issueDate: "Jan 10, 2024",
      dueDate: "Feb 10, 2024",
      status: "paid",
      description: "Trade compliance consultation",
      items: [
        {
          description: "Compliance audit",
          quantity: 1,
          unitPrice: 8000.0,
          total: 8000.0,
        },
        {
          description: "Documentation review",
          quantity: 1,
          unitPrice: 4300.0,
          total: 4300.0,
        },
      ],
      customerEmail: "billing@globaltrade.com",
      paymentTerms: "Net 30 days",
      paidDate: "Jan 25, 2024",
    },
    {
      invoiceNumber: "INV-2024-004",
      customerName: "Southern Logistics",
      amount: 6700.0,
      issueDate: "Jan 22, 2024",
      dueDate: "Feb 22, 2024",
      status: "pending_payment",
      description: "Freight forwarding services",
      items: [
        {
          description: "Container handling",
          quantity: 2,
          unitPrice: 2500.0,
          total: 5000.0,
        },
        {
          description: "Documentation fees",
          quantity: 1,
          unitPrice: 1700.0,
          total: 1700.0,
        },
      ],
      customerEmail: "accounts@southernlogistics.com",
      paymentTerms: "Net 30 days",
    },
    {
      invoiceNumber: "INV-2024-005",
      customerName: "Metro Trading House",
      amount: 22100.0,
      issueDate: "Jan 25, 2024",
      dueDate: "Feb 25, 2024",
      status: "pending_approval",
      description: "Bulk import services",
      items: [
        {
          description: "Import licensing",
          quantity: 3,
          unitPrice: 4000.0,
          total: 12000.0,
        },
        {
          description: "Quality inspection",
          quantity: 1,
          unitPrice: 5600.0,
          total: 5600.0,
        },
        {
          description: "Storage fees",
          quantity: 1,
          unitPrice: 4500.0,
          total: 4500.0,
        },
      ],
      customerEmail: "finance@metrotrading.com",
      paymentTerms: "Net 30 days",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending_payment":
        return "bg-yellow-100 text-yellow-800";
      case "pending_approval":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending_payment":
        return "Pending Payment";
      case "pending_approval":
        return "Pending Approval";
      default:
        return status;
    }
  };

  const applications = [
    "Create New Invoice",
    "Import Invoice Data",
    "Export Invoice Report",
    "Payment Reminder Settings",
  ];

  if (selectedInvoice) {
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
            <SidebarLink
              icon={<Home />}
              href="/invoice"
              text="Invoice"
              active
            />
            <SidebarLink
              icon={<FileText />}
              href="/purchase-order"
              text="Purchase Order"
            />
            <SidebarLink
              icon={<DollarSign />}
              href="request-qoute"
              text="Request for Quote"
            />
          </nav>
          <div className="absolute bottom-0">
            <a
              href="#"
              className={`flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 ${"text-gray-600 hover:bg-gray-50"}`}
            >
              <FileQuestion />
              <span className="font-semibold">Log a case</span>
            </a>
            <a
              href="#"
              className={`flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 ${"text-gray-600 hover:bg-gray-50"}`}
            >
              <CircleUser />
              <span className="font-semibold" style={{ marginRight: "70px" }}>
                Zuko M
              </span>
              <LogOut />
            </a>
          </div>
        </aside>

        {/* Main Content - Invoice Detail */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center text-sm text-gray-500">
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
                <span className="mx-2">&gt;</span>
                <span>Invoices</span>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-900">
                  {selectedInvoice.invoiceNumber}
                </span>
              </div>
            </div>

            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Invoice Details
                </h1>
              </div>
              <div className="flex space-x-2">
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </button>
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invoice
                </button>
              </div>
            </div>
          </header>

          {/* Invoice Detail Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedInvoice.invoiceNumber}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {selectedInvoice.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            selectedInvoice.status
                          )}`}
                        >
                          {getStatusText(selectedInvoice.status)}
                        </span>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          R{" "}
                          {selectedInvoice.amount.toLocaleString("en-ZA", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                          Bill To
                        </h4>
                        <p className="text-lg font-semibold text-gray-900">
                          {selectedInvoice.customerName}
                        </p>
                        <p className="text-gray-600">
                          {selectedInvoice.customerEmail}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="font-semibold">
                            {selectedInvoice.issueDate}
                          </p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="font-semibold">
                            {selectedInvoice.dueDate}
                          </p>
                        </div>
                        {selectedInvoice.paidDate && (
                          <div>
                            <p className="text-sm text-gray-500">Paid Date</p>
                            <p className="font-semibold text-green-600">
                              {selectedInvoice.paidDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Invoice Items
                      </h4>
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Unit Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedInvoice.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                R{" "}
                                {item.unitPrice.toLocaleString("en-ZA", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                                R{" "}
                                {item.total.toLocaleString("en-ZA", {
                                  minimumFractionDigits: 2,
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Total */}
                    <div className="flex justify-end">
                      <div className="w-64">
                        <div className="flex justify-between py-2 border-t border-gray-200">
                          <span className="text-lg font-semibold">
                            Total Amount:
                          </span>
                          <span className="text-lg font-bold">
                            R{" "}
                            {selectedInvoice.amount.toLocaleString("en-ZA", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Payment Terms: {selectedInvoice.paymentTerms}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen relative p-4 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="flex justify-start">
          <div className="flex justify-start">
            <img
              src={ItacLogo}
              alt="ITAC Logo"
              className="mb-8"
              style={{ maxWidth: "65%" }}
            />
          </div>
        </div>
        <nav className="mb-auto">
          <SidebarLink icon={<Home />} href="/invoice" text="Invoice" active />
          <SidebarLink
            icon={<FileText />}
            href="/purchase-order"
            text="Purchase Order"
          />
          <SidebarLink
            icon={<DollarSign />}
            href="request-qoute"
            text="Request for Quote"
          />
        </nav>
        <div className="absolute bottom-0">
          <a
            href="#"
            className={`flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 ${"text-gray-600 hover:bg-gray-50"}`}
          >
            <FileQuestion />
            <span className="font-semibold">Log a case</span>
          </a>
          <a
            href="#"
            className={`flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 ${"text-gray-600 hover:bg-gray-50"}`}
          >
            <CircleUser />
            <span className="font-semibold" style={{ marginRight: "70px" }}>
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
              <span className="text-gray-900">Invoices</span>
            </div>
          </div>

          <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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
                Invoice Management
              </h1>
            </div>
            <button
              onClick={() => setIsDropDwonOpen(!isDropDwonOpen)}
              className="bg-green-700 relative hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Invoice Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {isDropDwonOpen && (
              <div
                className="absolute right-8 z-10 mt-2 top-[100px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  {applications.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block border-b font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-green-700 hover:text-white"
                      role="menuitem"
                      tabIndex="-1"
                      id={`menu-item-${index}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <h2 className="text-lg font-semibold mb-4">Invoice List</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Invoice Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Due Date
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {invoice.invoiceNumber}
                              </div>
                              <div className="text-sm text-gray-500">
                                {invoice.issueDate}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invoice.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          R{" "}
                          {invoice.amount.toLocaleString("en-ZA", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              invoice.status
                            )}`}
                          >
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dueDate}
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
                              className="absolute right-8 z-10 mt-2 top-[50px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                              tabIndex="-1"
                            >
                              <div className="py-1" role="none">
                                <a
                                  href="#"
                                  className="block border-b font-semibold px-4 py-2 text-sm text-gray-700 text-left hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-0"
                                >
                                  Actions
                                </a>
                                <button
                                  onClick={() => setSelectedInvoice(invoice)}
                                  className="block w-full px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-1"
                                >
                                  <Eye className="inline h-4 w-4 mr-2" />
                                  View Details
                                </button>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-2"
                                >
                                  <Download className="inline h-4 w-4 mr-2" />
                                  Download PDF
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-3"
                                >
                                  <Mail className="inline h-4 w-4 mr-2" />
                                  Send Reminder
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

const SidebarLink = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
  href,
}) => (
  <a
    href={href}
    className={`font-semibold flex items-center space-x-2 p-2 rounded-lg ${
      active ? "bg-gray-100 text-green-600" : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    <span>{text}</span>
    {hasSubmenu && <ChevronDown className="ml-auto h-4 w-4" />}
  </a>
);

export default Invoice;
