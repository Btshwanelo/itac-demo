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
  ArrowLeft,
  Eye,
  Download,
  Mail,
  CheckCircle,
  Clock,
  File,
} from "lucide-react";
import ItacLogo from "../assets/images/dcs-logo.png";


const PurchaseOrder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDwonOpen, setIsDropDwonOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);
  const [selectedPO, setSelectedPO] = useState(null);
  const [selectedLineItems, setSelectedLineItems] = useState([]);
  const [generatedInvoice, setGeneratedInvoice] = useState(null);

  const purchaseOrders = [
    {
      poNumber: "PO-2024-001",
      vendorName: "Steel Supply Co Ltd",
      totalAmount: 45750.0,
      dateGenerated: "Jan 10, 2024",
      deadline: "Feb 10, 2024",
      status: "active",
      description: "Industrial steel supplies",
      vendorEmail: "orders@steelsupply.com",
      lineItems: [
        {
          id: 1,
          description: "Steel plates 20mm",
          quantity: 100,
          unitPrice: 250.0,
          total: 25000.0,
          status: "pending",
          invoicedQuantity: 0,
        },
        {
          id: 2,
          description: "Steel bars 12mm",
          quantity: 50,
          unitPrice: 180.0,
          total: 9000.0,
          status: "partially_invoiced",
          invoicedQuantity: 20,
        },
        {
          id: 3,
          description: "Welding rods",
          quantity: 200,
          unitPrice: 58.75,
          total: 11750.0,
          status: "pending",
          invoicedQuantity: 0,
        },
      ],
    },
    {
      poNumber: "PO-2024-002",
      vendorName: "Tech Equipment Solutions",
      totalAmount: 28900.0,
      dateGenerated: "Jan 15, 2024",
      deadline: "Feb 15, 2024",
      status: "active",
      description: "Office equipment and computers",
      vendorEmail: "sales@techequipment.com",
      lineItems: [
        {
          id: 4,
          description: "Laptops - Dell Inspiron",
          quantity: 10,
          unitPrice: 1500.0,
          total: 15000.0,
          status: "pending",
          invoicedQuantity: 0,
        },
        {
          id: 5,
          description: "Monitors - 24 inch",
          quantity: 15,
          unitPrice: 350.0,
          total: 5250.0,
          status: "pending",
          invoicedQuantity: 0,
        },
        {
          id: 6,
          description: "Office chairs",
          quantity: 25,
          unitPrice: 345.0,
          total: 8625.0,
          status: "partially_invoiced",
          invoicedQuantity: 10,
        },
      ],
    },
    {
      poNumber: "PO-2024-003",
      vendorName: "Industrial Machinery Corp",
      totalAmount: 75200.0,
      dateGenerated: "Jan 8, 2024",
      deadline: "Mar 8, 2024",
      status: "active",
      description: "Heavy machinery and equipment",
      vendorEmail: "orders@industrialmachinery.com",
      lineItems: [
        {
          id: 7,
          description: "Hydraulic press",
          quantity: 1,
          unitPrice: 45000.0,
          total: 45000.0,
          status: "pending",
          invoicedQuantity: 0,
        },
        {
          id: 8,
          description: "Conveyor belt system",
          quantity: 2,
          unitPrice: 15100.0,
          total: 30200.0,
          status: "pending",
          invoicedQuantity: 0,
        },
      ],
    },
  ];

  const applications = [
    "Create New Purchase Order",
    "Import PO Data",
    "Export PO Report",
    "Vendor Management",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "partially_invoiced":
        return "bg-blue-100 text-blue-800";
      case "fully_invoiced":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "partially_invoiced":
        return "Partially Invoiced";
      case "fully_invoiced":
        return "Fully Invoiced";
      default:
        return status;
    }
  };

  const handleLineItemSelect = (lineItem) => {
    setSelectedLineItems((prev) => {
      const isSelected = prev.some((item) => item.id === lineItem.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== lineItem.id);
      } else {
        return [...prev, lineItem];
      }
    });
  };

  const generateInvoice = () => {
    if (selectedLineItems.length === 0) return;

    const invoiceTotal = selectedLineItems.reduce((sum, item) => {
      const remainingQuantity = item.quantity - item.invoicedQuantity;
      return sum + remainingQuantity * item.unitPrice;
    }, 0);

    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = {
      invoiceNumber,
      customerName: selectedPO.vendorName,
      amount: invoiceTotal,
      issueDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      dueDate: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "pending_payment",
      description: `Invoice for ${selectedPO.poNumber}`,
      items: selectedLineItems.map((item) => ({
        description: item.description,
        quantity: item.quantity - item.invoicedQuantity,
        unitPrice: item.unitPrice,
        total: (item.quantity - item.invoicedQuantity) * item.unitPrice,
      })),
      customerEmail: selectedPO.vendorEmail,
      paymentTerms: "Net 30 days",
      poReference: selectedPO.poNumber,
    };

    setGeneratedInvoice(invoice);
  };

  // Generated Invoice View
  if (generatedInvoice) {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`bg-white w-64 min-h-screen relative p-4 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex justify-start">
            <div className="w-24 h-12 bg-green-600 flex items-center justify-center mb-8 rounded">
              <span className="text-white font-bold text-lg">ITAC</span>
            </div>
          </div>
          <nav className="mb-auto">
            <SidebarLink icon={<Home />} href="/invoices" text="Invoice" />
            <SidebarLink
              icon={<FileText />}
              href="/purchase-order"
              text="Purchase Order"
              active
            />
            <SidebarLink
              icon={<DollarSign />}
              href="/request-qoute"
              text="Request for Quote"
            />
          </nav>
          <div className="absolute bottom-0">
            <a
              href="#"
              className="flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
            >
              <FileQuestion />
              <span className="font-semibold">Log a case</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
            >
              <CircleUser />
              <span className="font-semibold" style={{ marginRight: "70px" }}>
                Zuko M
              </span>
              <LogOut />
            </a>
          </div>
        </aside>

        {/* Generated Invoice Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center text-sm text-gray-500">
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
                <span className="mx-2">&gt;</span>
                <span>Purchase Orders</span>
                <span className="mx-2">&gt;</span>
                <span>Generated Invoice</span>
              </div>
            </div>

            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setGeneratedInvoice(null)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Generated Invoice
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

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {generatedInvoice.invoiceNumber}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Generated from {generatedInvoice.poReference}
                        </p>
                        <p className="text-gray-600">
                          {generatedInvoice.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending Payment
                        </span>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          R{" "}
                          {generatedInvoice.amount.toLocaleString("en-ZA", {
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
                          {generatedInvoice.customerName}
                        </p>
                        <p className="text-gray-600">
                          {generatedInvoice.customerEmail}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="font-semibold">
                            {generatedInvoice.issueDate}
                          </p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="font-semibold">
                            {generatedInvoice.dueDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">PO Reference</p>
                          <p className="font-semibold">
                            {generatedInvoice.poReference}
                          </p>
                        </div>
                      </div>
                    </div>

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
                          {generatedInvoice.items.map((item, index) => (
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

                    <div className="flex justify-end">
                      <div className="w-64">
                        <div className="flex justify-between py-2 border-t border-gray-200">
                          <span className="text-lg font-semibold">
                            Total Amount:
                          </span>
                          <span className="text-lg font-bold">
                            R{" "}
                            {generatedInvoice.amount.toLocaleString("en-ZA", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Payment Terms: {generatedInvoice.paymentTerms}
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

  // PO Detail View with Line Items
  if (selectedPO) {
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
            <SidebarLink icon={<Home />} href="/invoices" text="Invoice" />
            <SidebarLink
              icon={<FileText />}
              href="/purchase-order"
              text="Purchase Order"
              active
            />
            <SidebarLink
              icon={<DollarSign />}
              href="/request-qoute"
              text="Request for Quote"
            />
          </nav>
          <div className="absolute bottom-0">
            <a
              href="#"
              className="flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
            >
              <FileQuestion />
              <span className="font-semibold">Log a case</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
            >
              <CircleUser />
              <span className="font-semibold" style={{ marginRight: "70px" }}>
                Zuko M
              </span>
              <LogOut />
            </a>
          </div>
        </aside>

        {/* PO Detail Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center text-sm text-gray-500">
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
                <span className="mx-2">&gt;</span>
                <span>Purchase Orders</span>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-900">{selectedPO.poNumber}</span>
              </div>
            </div>

            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setSelectedPO(null);
                    setSelectedLineItems([]);
                  }}
                  className="mr-4 p-2 hover:bg-gray-100 rounded"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Purchase Order Details
                </h1>
              </div>
              <div className="flex space-x-2">
                {selectedLineItems.length > 0 && (
                  <button
                    onClick={generateInvoice}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <File className="mr-2 h-4 w-4" />
                    Generate Invoice ({selectedLineItems.length})
                  </button>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedPO.poNumber}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {selectedPO.description}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          {selectedPO.vendorName}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">
                            Date Generated
                          </p>
                          <p className="font-semibold">
                            {selectedPO.dateGenerated}
                          </p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Deadline</p>
                          <p className="font-semibold">{selectedPO.deadline}</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          R{" "}
                          {selectedPO.totalAmount.toLocaleString("en-ZA", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">Line Items</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLineItems(
                                  selectedPO.lineItems.filter(
                                    (item) =>
                                      item.status === "pending" ||
                                      item.invoicedQuantity < item.quantity
                                  )
                                );
                              } else {
                                setSelectedLineItems([]);
                              }
                            }}
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item Details
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedPO.lineItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={selectedLineItems.some(
                                (selected) => selected.id === item.id
                              )}
                              onChange={() => handleLineItemSelect(item)}
                              disabled={item.status === "fully_invoiced"}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {item.description}
                            </div>
                            {item.invoicedQuantity > 0 && (
                              <div className="text-sm text-gray-500">
                                {item.invoicedQuantity} of {item.quantity}{" "}
                                invoiced
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity - item.invoicedQuantity} remaining
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            R{" "}
                            {item.unitPrice.toLocaleString("en-ZA", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            R{" "}
                            {(
                              (item.quantity - item.invoicedQuantity) *
                              item.unitPrice
                            ).toLocaleString("en-ZA", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {getStatusText(item.status)}
                            </span>
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
  }

  // Main PO List View
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
          <SidebarLink icon={<Home />} href="/invoices" text="Invoice" />
          <SidebarLink
            icon={<FileText />}
            href="/purchase-order"
            text="Purchase Order"
            active
          />
          <SidebarLink
            icon={<DollarSign />}
            href="/request-qoute"
            text="Request for Quote"
          />
        </nav>
        <div className="absolute bottom-0">
          <a
            href="#"
            className="flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
          >
            <FileQuestion />
            <span className="font-semibold">Log a case</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 bottom-4 p-2 rounded-lg mb-2 text-gray-600 hover:bg-gray-50"
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
        <header className="bg-white shadow-sm z-10">
          <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-500">
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-900">Purchase Orders</span>
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
                Purchase Order Management
              </h1>
            </div>
            <button
              onClick={() => setIsDropDwonOpen(!isDropDwonOpen)}
              className="bg-green-700 relative hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              PO Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {isDropDwonOpen && (
              <div className="absolute right-8 z-10 mt-2 top-[100px] w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {applications.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block border-b font-semibold px-4 py-2 text-sm text-gray-700 hover:bg-green-700 hover:text-white"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <h2 className="text-lg font-semibold mb-4">
                Purchase Order List
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        PO Details
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Vendor
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
                        Date Generated
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Deadline
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchaseOrders.map((po, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded bg-green-100 text-green-600 flex items-center justify-center">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {po.poNumber}
                              </div>
                              <div className="text-sm text-gray-500">
                                {po.lineItems.length} line items
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {po.vendorName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {po.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          R{" "}
                          {po.totalAmount.toLocaleString("en-ZA", {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {po.dateGenerated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {po.deadline}
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
                                  onClick={() => setSelectedPO(po)}
                                  className="block w-full px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-1"
                                >
                                  <Eye className="inline h-4 w-4 mr-2" />
                                  View Line Items
                                </button>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-2"
                                >
                                  <Download className="inline h-4 w-4 mr-2" />
                                  Download PO
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-3"
                                >
                                  <Mail className="inline h-4 w-4 mr-2" />
                                  Send to Vendor
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

export default PurchaseOrder;
