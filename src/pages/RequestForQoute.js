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
  Calendar,
  Trash2,
  X,
} from "lucide-react";
import ItacLogo from "../assets/images/dcs-logo.png";

const RequestForQoute = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropDwonOpen, setIsDropDwonOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);
  const [selectedRFQ, setSelectedRFQ] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedQuote, setSavedQuote] = useState(null);

  const [quoteForm, setQuoteForm] = useState({
    customerName: "",
    quoteNumber: "QT-000001",
    reference: "",
    quoteDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    salesperson: "",
    projectName: "",
    subject: "",
    items: [
      {
        id: 1,
        description: "",
        quantity: 1.0,
        rate: 0.0,
        discount: 0,
        discountType: "%",
        amount: 0.0,
      },
    ],
    customerNotes: "Looking forward for your business.",
    termsConditions: "",
    subtotal: 0.0,
    total: 0.0,
  });

  const requestsForQuote = [
    {
      rfqNumber: "RFQ-2024-001",
      customerName: "ABC Manufacturing Ltd",
      requestDate: "Jan 15, 2024",
      dueDate: "Jan 30, 2024",
      status: "pending",
      description: "Industrial steel supplies",
      customerEmail: "procurement@abcmanufacturing.com",
      items: [
        {
          description: "Steel plates 20mm",
          quantity: 100,
          specifications: "Grade A36, Hot rolled",
        },
        {
          description: "Steel bars 12mm",
          quantity: 50,
          specifications: "Reinforcement grade",
        },
        {
          description: "Welding consumables",
          quantity: 200,
          specifications: "E7018 electrodes",
        },
      ],
    },
    {
      rfqNumber: "RFQ-2024-002",
      customerName: "Tech Solutions Inc",
      requestDate: "Jan 18, 2024",
      dueDate: "Feb 5, 2024",
      status: "quoted",
      description: "Office equipment and computers",
      customerEmail: "purchasing@techsolutions.com",
      items: [
        {
          description: "Laptops - Business grade",
          quantity: 25,
          specifications: "Intel i7, 16GB RAM, 512GB SSD",
        },
        {
          description: "Monitors 27-inch",
          quantity: 30,
          specifications: "4K resolution, USB-C",
        },
        {
          description: "Docking stations",
          quantity: 25,
          specifications: "Universal compatibility",
        },
      ],
    },
    {
      rfqNumber: "RFQ-2024-003",
      customerName: "Construction Corp",
      requestDate: "Jan 20, 2024",
      dueDate: "Feb 10, 2024",
      status: "pending",
      description: "Heavy machinery rental",
      customerEmail: "ops@constructioncorp.com",
      items: [
        {
          description: "Excavator rental",
          quantity: 2,
          specifications: "320 class, monthly rental",
        },
        {
          description: "Crane rental",
          quantity: 1,
          specifications: "50-ton capacity",
        },
        {
          description: "Generator rental",
          quantity: 3,
          specifications: "100kW diesel",
        },
      ],
    },
    {
      rfqNumber: "RFQ-2024-004",
      customerName: "Medical Supplies Ltd",
      requestDate: "Jan 22, 2024",
      dueDate: "Feb 8, 2024",
      status: "under_review",
      description: "Medical equipment procurement",
      customerEmail: "buyer@medicalsupplies.com",
      items: [
        {
          description: "Digital X-ray system",
          quantity: 1,
          specifications: "Portable, wireless",
        },
        {
          description: "Patient monitors",
          quantity: 10,
          specifications: "Multi-parameter",
        },
        {
          description: "Surgical instruments",
          quantity: 1,
          specifications: "Basic surgery set",
        },
      ],
    },
  ];

  const applications = [
    "Create New RFQ",
    "Import RFQ Data",
    "Export RFQ Report",
    "Customer Management",
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "quoted":
        return "bg-green-100 text-green-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Quote";
      case "quoted":
        return "Quoted";
      case "under_review":
        return "Under Review";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  const calculateItemAmount = (item) => {
    const baseAmount = item.quantity * item.rate;
    const discountAmount =
      item.discountType === "%"
        ? (baseAmount * item.discount) / 100
        : item.discount;
    return baseAmount - discountAmount;
  };

  const updateQuoteForm = (field, value) => {
    setQuoteForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateQuoteItem = (index, field, value) => {
    const updatedItems = [...quoteForm.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Recalculate amount for this item
    updatedItems[index].amount = calculateItemAmount(updatedItems[index]);

    // Recalculate totals
    const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);

    setQuoteForm((prev) => ({
      ...prev,
      items: updatedItems,
      subtotal,
      total: subtotal,
    }));
  };

  const addQuoteItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      quantity: 1.0,
      rate: 0.0,
      discount: 0,
      discountType: "%",
      amount: 0.0,
    };

    setQuoteForm((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeQuoteItem = (index) => {
    if (quoteForm.items.length > 1) {
      const updatedItems = quoteForm.items.filter((_, i) => i !== index);
      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);

      setQuoteForm((prev) => ({
        ...prev,
        items: updatedItems,
        subtotal,
        total: subtotal,
      }));
    }
  };

  const handleSaveQuote = (action) => {
    // Create the saved quote object
    const quote = {
      ...quoteForm,
      action: action, // 'draft' or 'sent'
      createdDate: new Date().toISOString().split("T")[0],
      rfqReference: selectedRFQ?.rfqNumber,
    };

    setSavedQuote(quote);
    setShowSuccess(true);
    setShowQuoteForm(false);
  };

  const resetToRFQList = () => {
    setShowSuccess(false);
    setShowQuoteForm(false);
    setSelectedRFQ(null);
    setSavedQuote(null);
    // Reset form
    setQuoteForm({
      customerName: "",
      quoteNumber: "QT-000001",
      reference: "",
      quoteDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      salesperson: "",
      projectName: "",
      subject: "",
      items: [
        {
          id: 1,
          description: "",
          quantity: 1.0,
          rate: 0.0,
          discount: 0,
          discountType: "%",
          amount: 0.0,
        },
      ],
      customerNotes: "Looking forward for your business.",
      termsConditions: "",
      subtotal: 0.0,
      total: 0.0,
    });
  };

  // Success Screen
  if (showSuccess) {
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
            />
            <SidebarLink
              icon={<DollarSign />}
              href="/request-order"
              text="Request for Quote"
              active
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

        {/* Success Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center text-sm text-gray-500">
                <Home className="h-4 w-4 mr-1" />
                <span>Home</span>
                <span className="mx-2">&gt;</span>
                <span>Request for Quote</span>
                <span className="mx-2">&gt;</span>
                <span className="text-gray-900">Quote Created</span>
              </div>
            </div>

            <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Quote Successfully Created
                </h1>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="mx-auto py-12 sm:px-6 lg:px-8 max-w-4xl">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {/* Success Header */}
                <div className="px-6 py-8 text-center border-b border-gray-200">
                  <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Quote {savedQuote?.action === "sent" ? "Sent" : "Saved"}{" "}
                    Successfully!
                  </h2>
                  <p className="text-gray-600">
                    Your quote{" "}
                    <strong>{savedQuote?.quoteNumber || "N/A"}</strong> has been{" "}
                    {savedQuote?.action === "sent"
                      ? "sent to the customer"
                      : "saved as a draft"}
                    .
                  </p>
                </div>

                {/* Quote Summary */}
                <div className="px-6 py-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quote Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Quote Details
                      </h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">
                            Quote Number:
                          </dt>
                          <dd className="text-sm font-semibold text-gray-900">
                            {savedQuote?.quoteNumber || "N/A"}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">Customer:</dt>
                          <dd className="text-sm font-semibold text-gray-900">
                            {savedQuote?.customerName || "N/A"}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">Quote Date:</dt>
                          <dd className="text-sm font-semibold text-gray-900">
                            {savedQuote?.quoteDate || "N/A"}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">
                            Expiry Date:
                          </dt>
                          <dd className="text-sm font-semibold text-gray-900">
                            {savedQuote?.expiryDate || "N/A"}
                          </dd>
                        </div>
                        {savedQuote?.rfqReference && (
                          <div className="flex justify-between">
                            <dt className="text-sm text-gray-600">
                              RFQ Reference:
                            </dt>
                            <dd className="text-sm font-semibold text-gray-900">
                              {savedQuote.rfqReference}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        Quote Value
                      </h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">
                            Number of Items:
                          </dt>
                          <dd className="text-sm font-semibold text-gray-900">
                            {savedQuote?.items?.length || 0}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">Subtotal:</dt>
                          <dd className="text-sm font-semibold text-gray-900">
                            R {savedQuote?.subtotal?.toFixed(2) || "0.00"}
                          </dd>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                          <dt className="text-lg font-semibold text-gray-900">
                            Total Amount:
                          </dt>
                          <dd className="text-lg font-bold text-green-600">
                            R {savedQuote?.total?.toFixed(2) || "0.00"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Quoted Items
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        {(savedQuote?.items || []).map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                          >
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-900">
                                {item?.description || `Item ${index + 1}`}
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                (Qty: {item?.quantity || 0})
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              R {item?.amount?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-6">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        savedQuote?.action === "sent"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {savedQuote?.action === "sent"
                        ? "Sent to Customer"
                        : "Saved as Draft"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="flex space-x-3">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Eye className="h-4 w-4 mr-2" />
                        View Quote
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </button>
                      {savedQuote?.action === "draft" && (
                        <button className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Quote
                        </button>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={resetToRFQList}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to RFQ List
                      </button>
                      <button
                        onClick={() => setShowQuoteForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Another Quote
                      </button>
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

  const handleCreateQuote = (rfq) => {
    setSelectedRFQ(rfq);
    setQuoteForm((prev) => ({
      ...prev,
      customerName: rfq.customerName,
      subject: `Quote for ${rfq.description}`,
      quoteNumber: `QT-${Date.now().toString().slice(-6)}`,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    }));
    setShowQuoteForm(true);
  };

  // Quote Creation Form
  if (showQuoteForm) {
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
            />
            <SidebarLink
              icon={<DollarSign />}
              href="/request-order"
              text="Request for Quote"
              active
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

        {/* Quote Form Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">
                  New Quote
                </h1>
                <label className="ml-6 flex items-center text-sm text-gray-500">
                  <input type="checkbox" className="mr-2" />
                  Use Simplified View
                </label>
              </div>
            </div>
          </header>

          {/* Quote Form */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Customer and Quote Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-500 mb-2">
                    Customer Name*
                  </label>
                  <div className="relative">
                    <select
                      value={quoteForm.customerName}
                      onChange={(e) =>
                        updateQuoteForm("customerName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="">Select or add a customer</option>
                      <option value="ABC Manufacturing Ltd">
                        ABC Manufacturing Ltd
                      </option>
                      <option value="Tech Solutions Inc">
                        Tech Solutions Inc
                      </option>
                      <option value="Construction Corp">
                        Construction Corp
                      </option>
                    </select>
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-500 mb-2">
                    Quote#*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={quoteForm.quoteNumber}
                      onChange={(e) =>
                        updateQuoteForm("quoteNumber", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference#
                  </label>
                  <input
                    type="text"
                    value={quoteForm.reference}
                    onChange={(e) =>
                      updateQuoteForm("reference", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-red-500 mb-2">
                    Quote Date*
                  </label>
                  <input
                    type="date"
                    value={quoteForm.quoteDate}
                    onChange={(e) =>
                      updateQuoteForm("quoteDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={quoteForm.expiryDate}
                    onChange={(e) =>
                      updateQuoteForm("expiryDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="yyyy/MM/dd"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salesperson
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select or Add Salesperson</option>
                    <option value="John Smith">John Smith</option>
                    <option value="Jane Doe">Jane Doe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select a project</option>
                    <option value="Project Alpha">Project Alpha</option>
                    <option value="Project Beta">Project Beta</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select a customer to associate a project.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <textarea
                  value={quoteForm.subject}
                  onChange={(e) => updateQuoteForm("subject", e.target.value)}
                  placeholder="Let your customer know what this Quote is for"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                />
              </div>

              {/* Item Table */}
              <div className="bg-white">
                <h3 className="text-lg font-semibold mb-4">Item Table</h3>

                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                          Item Details
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                          Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                          Discount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quoteForm.items.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                updateQuoteItem(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Type or click to select an item."
                              className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-0"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuoteItem(
                                  index,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              step="0.01"
                              className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-0 text-center"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) =>
                                updateQuoteItem(
                                  index,
                                  "rate",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              step="0.01"
                              className="w-full px-2 py-1 border-0 focus:outline-none focus:ring-0 text-center"
                            />
                          </td>
                          <td className="px-4 py-3 border-r">
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={item.discount}
                                onChange={(e) =>
                                  updateQuoteItem(
                                    index,
                                    "discount",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                step="0.01"
                                className="w-16 px-2 py-1 border-0 focus:outline-none focus:ring-0 text-center"
                              />
                              <select
                                value={item.discountType}
                                onChange={(e) =>
                                  updateQuoteItem(
                                    index,
                                    "discountType",
                                    e.target.value
                                  )
                                }
                                className="ml-1 border-0 focus:outline-none focus:ring-0"
                              >
                                <option value="%">%</option>
                                <option value="fixed">Fixed</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-3 border-r text-right font-semibold">
                            {item.amount.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => removeQuoteItem(index)}
                              className="text-red-500 hover:text-red-700"
                              disabled={quoteForm.items.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={addQuoteItem}
                    className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Row
                  </button>
                  <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Items in Bulk
                  </button>
                </div>
              </div>

              {/* Totals and Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Notes
                  </label>
                  <textarea
                    value={quoteForm.customerNotes}
                    onChange={(e) =>
                      updateQuoteForm("customerNotes", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Sub Total</span>
                    <span className="font-semibold">
                      {quoteForm.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-300">
                    <span className="text-lg font-bold">Total ( R )</span>
                    <span className="text-lg font-bold">
                      {quoteForm.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    value={quoteForm.termsConditions}
                    onChange={(e) =>
                      updateQuoteForm("termsConditions", e.target.value)
                    }
                    placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attach File(s) to Quote
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="h-4 w-4 mr-2" />
                      Upload File
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      You can upload a maximum of 3 files, 10MB each
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Additional Fields:</strong> Start adding custom fields
                  for your quotes by going to{" "}
                  <span className="text-blue-600">Settings ➜ Quotes</span>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveQuote("draft")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSaveQuote("sent")}
                  className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  Save & Send
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Main RFQ List View
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
          />
          <SidebarLink
            icon={<DollarSign />}
            href="/request-order"
            text="Request for Quote"
            active
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
              <span className="text-gray-900">Request for Quote</span>
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
                Request for Quote Management
              </h1>
            </div>
            <button
              onClick={() => setIsDropDwonOpen(!isDropDwonOpen)}
              className="bg-green-700 relative hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              RFQ Actions
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
                Request for Quote List
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        RFQ Details
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
                        Request Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requestsForQuote.map((rfq, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded bg-orange-100 text-orange-600 flex items-center justify-center">
                              <DollarSign className="h-5 w-5" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {rfq.rfqNumber}
                              </div>
                              <div className="text-sm text-gray-500">
                                {rfq.items.length} items requested
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {rfq.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rfq.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {rfq.requestDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {rfq.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              rfq.status
                            )}`}
                          >
                            {getStatusText(rfq.status)}
                          </span>
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
                                  onClick={() => handleCreateQuote(rfq)}
                                  className="block w-full px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-1"
                                >
                                  <FileText className="inline h-4 w-4 mr-2" />
                                  Create Quote
                                </button>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-2"
                                >
                                  <Eye className="inline h-4 w-4 mr-2" />
                                  View Details
                                </a>
                                <a
                                  href="#"
                                  className="block px-4 py-2 font-semibold text-sm text-left text-gray-700 hover:bg-green-700 hover:text-white"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-3"
                                >
                                  <Download className="inline h-4 w-4 mr-2" />
                                  Download RFQ
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

export default RequestForQoute;
