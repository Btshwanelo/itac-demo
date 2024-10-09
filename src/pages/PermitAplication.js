import React, { useState } from "react";
import {
  Home,
  ChevronRight,
  HelpCircle,
  FileText,
  DollarSign,
  Users,
  FileQuestion,
  MoreVertical,
  ChevronDown,
  Search,
  Plus,
} from "lucide-react";
import ItacLogo from "../assets/images/itac-logo.jpeg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PermitApplicationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Initialize state for all form fields here
    nameOfBusiness: "",
    tradeName: "",
    customCodeNumber: "",
    ccRegistration: "",
    businessCommenceDate: "",
    contactPerson: "",
    telephoneNumber: "",
    cellularNumber: "",
    faxNumber: "",
    emailAddress: "",
    taxNumber: "",
    vatNumber: "",
    province: "",
    numberOfEmployees: "",
    businessType: "",
    descriptionOfGoods: "",
    warehouseSize: "",
    streetAddress: "",
    suburb: "",
    postalProvince: "",
    postalCode: "",
    postalAddressSameAsPhysical: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    // Swal.fire({
    //   icon: "success",
    //   text: "Application created sccessfully !",
    // }).then(() => navigate("/dashboard"));
    navigate("/thank-you");
  };

  const dummyData = {
    nameOfBusiness: "Global Trade Enterprises",
    tradeName: "GTE",
    customCodeNumber: "CUST123456",
    ccRegistration: "2023/123456/07",
    businessCommenceDate: "2020-01-15",
    contactPerson: "John Doe",
    telephoneNumber: "+27 11 123 4567",
    cellularNumber: "+27 82 123 4567",
    faxNumber: "+27 11 765 4321",
    emailAddress: "johndoe@gte.co.za",
    taxNumber: "TX1234567890",
    vatNumber: "VAT987654321",
    province: "Gauteng",
    numberOfEmployees: "50",
    businessType: "Partnership",
    descriptionOfGoods: "Electronic equipment and accessories",
    warehouseSize: "2000 sqm",
    streetAddress: "123 Business Park Avenue",
    suburb: "Industrial Zone",
    postalProvince: "Gauteng",
    postalCode: "2000",
    postalAddressSameAsPhysical: true,
  };

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 ${
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
        <nav>
          <SidebarLink icon={<Home />} text="Home" active />
          <SidebarLink icon={<FileText />} text="Contracts" hasSubmenu />
          <SidebarLink icon={<DollarSign />} text="Billing" />
          <SidebarLink icon={<Users />} text="Import & Export Control" />
          <SidebarLink icon={<FileQuestion />} text="Log a case" />
        </nav>
      </aside>
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <img
              src="/api/placeholder/100/40"
              alt="ITAC Logo"
              className="h-8"
            />
            <nav className="flex">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Home className="h-5 w-5" />
              </a>
              <ChevronRight className="h-5 w-5 text-gray-400 mx-2" />
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Home
              </a>
              <ChevronRight className="h-5 w-5 text-gray-400 mx-2" />
              <span className="text-gray-900">Refer a Dispute</span>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="border-t border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-sm text-gray-500">
              <Home className="h-4 w-4 mr-1" />
              <span
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer"
              >
                Home
              </span>
              <span className="mx-2">&gt;</span>
              <span>Applications</span>
              <span className="mx-2">&gt;</span>
              <span className="text-gray-900">Refer a Dispute</span>
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
                Application
              </h1>
            </div>
            <button
              onClick={() => setFormData(dummyData)}
              className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <Plus className="ml-2 h-4 w-4" />
              populate
            </button>
          </div>
        </header>

        {/* Main content */}

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              APPLICATION TO REGISTER AS AN IMPORTER OR CHANGE OF CURRENT
              INFORMATION
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              All fields marked with (*) are required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <FormSection title="Business Information">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputField
                    label="Name of Business or Applicant"
                    name="nameOfBusiness"
                    value={formData.nameOfBusiness}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Trade name"
                    name="tradeName"
                    value={formData.tradeName}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Custom Code Number"
                    name="customCodeNumber"
                    value={formData.customCodeNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="CO, CC Registration Nr or Individual ID Number"
                    name="ccRegistration"
                    value={formData.ccRegistration}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Business Commence Date"
                    name="businessCommenceDate"
                    type="date"
                    value={formData.businessCommenceDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Contact Information">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputField
                    label="Contact Person"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Telephone Number"
                    name="telephoneNumber"
                    value={formData.telephoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Cellular Number"
                    name="cellularNumber"
                    value={formData.cellularNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Fax Number"
                    name="faxNumber"
                    value={formData.faxNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Email Address"
                    name="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Financial Information">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputField
                    label="Tax Number"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="VAT Number"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Business Details">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <SelectField
                    label="Province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    options={[
                      "Gauteng",
                      "Western Cape",
                      "KwaZulu-Natal",
                      "Eastern Cape",
                      "Free State",
                      "Limpopo",
                      "Mpumalanga",
                      "North West",
                      "Northern Cape",
                    ]}
                    required
                  />
                  <InputField
                    label="Number of Employees"
                    name="numberOfEmployees"
                    type="number"
                    value={formData.numberOfEmployees}
                    onChange={handleInputChange}
                    required
                  />
                  <SelectField
                    label="Business Type"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    options={[
                      "Sole Proprietorship",
                      "Partnership",
                      "Corporation",
                      "Limited Liability Company (LLC)",
                    ]}
                    required
                  />
                  <InputField
                    label="Description of Goods Handled"
                    name="descriptionOfGoods"
                    value={formData.descriptionOfGoods}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Logistics">
                <InputField
                  label="Warehouse size"
                  name="warehouseSize"
                  value={formData.warehouseSize}
                  onChange={handleInputChange}
                  required
                />
              </FormSection>

              <FormSection title="Address Information">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <InputField
                    label="Street Address"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    label="Suburb"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleInputChange}
                    required
                  />
                  <SelectField
                    label="Province"
                    name="postalProvince"
                    value={formData.postalProvince}
                    onChange={handleInputChange}
                    options={[
                      "Gauteng",
                      "Western Cape",
                      "KwaZulu-Natal",
                      "Eastern Cape",
                      "Free State",
                      "Limpopo",
                      "Mpumalanga",
                      "North West",
                      "Northern Cape",
                    ]}
                    required
                  />
                  <InputField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="postalAddressSameAsPhysical"
                      checked={formData.postalAddressSameAsPhysical}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">
                      Postal address same as physical address
                    </span>
                  </label>
                </div>
              </FormSection>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

const FormSection = ({ title, children }) => (
  <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 py-2 block w-full shadow-sm sm:text-sm px-3 border-gray-300 rounded-md focus:outline  focus:border-blue-500  focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options, required }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
      {required && "*"}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-[#fff] rounded-md shadow-sm focus:outline sm:text-sm"
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const SidebarLink = ({ icon, text, active = false, hasSubmenu = false }) => (
  <a
    href="#"
    className={`flex items-center space-x-2 p-2 rounded-lg ${
      active ? "bg-gray-100 text-green-600" : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    <span>{text}</span>
    {hasSubmenu && <ChevronDown className="ml-auto h-4 w-4" />}
  </a>
);

export default PermitApplicationForm;
