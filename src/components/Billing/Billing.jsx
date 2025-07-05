import { useState, useRef, useEffect } from "react"
import { Plus, Settings, ChevronRight, FileText, Folder, ChevronDown, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

// Custom Button Component
const Button = ({ children, onClick, variant = "primary", size = "md", className = "", disabled = false }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white focus:ring-gray-500",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

// Custom Select Component
const Select = ({ options, value, onChange, placeholder = "Select...", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        type="button"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-left text-white hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? "text-white" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className="w-full px-3 py-2 text-left text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    sent: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    viewed: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    signed: "bg-green-500/20 text-green-400 border-green-500/30",
    default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Custom Card Components
const Card = ({ children, className = "" }) => {
  return <div className={`bg-gray-800 border border-gray-700 rounded-lg ${className}`}>{children}</div>
}

const CardHeader = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 border-b border-gray-700 ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

// Custom Tabs Component
const Tabs = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`flex space-x-8 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative pb-2 text-sm font-medium transition-colors ${
            activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

// Custom Input Component
const Input = ({ label, type = "text", value, onChange, placeholder, className = "", required = false }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-gray-400 mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  )
}

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main Dashboard Component
const BillingDashboard = ({ modelInfo }) => {
  const [activeTab, setActiveTab] = useState("all")
  const [template, setTemplate] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    templateId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const token = JSON.parse(localStorage.getItem("auth"))?.token

  const getTemplate = async () => {
    try {
      const res = await axios.get(`${baseUrl}/panda/templates`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTemplate(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllDocuments = async () => {
    try {
      const res = await axios.get(`${baseUrl}/panda/documents`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(res.data)
    } catch (err) {
      console.error("Failed to fetch documents:", err)
    }
  }

  const createDocument = async () => {
    if (!formData.recipientName || !formData.recipientEmail || !formData.templateId) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await axios.post(
        `${baseUrl}/panda/create-document/${modelInfo._id}`,
        {
          recipientName: formData.recipientName,
          recipientEmail: formData.recipientEmail,
          templateId: formData.templateId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      console.log(res.data)

      // Reset form and close modal
      setFormData({
        recipientName: "",
        recipientEmail: "",
        templateId: "",
      })
      setShowModal(false)

      // Optionally refresh documents
      getDocumentsByModel()
    } catch (err) {
      console.error("Error creating document:", err.response?.data || err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDocumentsByModel = async () => {
    try {
      const res = await axios.get(`${baseUrl}/panda/documents/model/${modelInfo._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(res.data)
      return res.data
    } catch (err) {
      console.error("Error fetching model documents:", err.response?.data || err.message)
      throw err
    }
  }

  // Mock data
  const contractsData = [
    {
      id: 1,
      model: "Emma Wilson",
      agency: "Starlight Models",
      template: "Model Agreement",
      status: "sent",
    },
    {
      id: 2,
      model: "Sophia Lee",
      agency: "Elite Talents",
      template: "Model Agreement",
      status: "viewed",
    },
    {
      id: 3,
      model: "Isabella Meyer",
      agency: "Iconic Faces",
      template: "Model Agreement",
      status: "signed",
    },
  ]

  const billingData = [
    { month: "Jul", gross: "8,400$", platform: "840$", net: "7,560$" },
    { month: "June", gross: "7,600$", platform: "760$", net: "6,840$" },
  ]

  const documentsData = [
    { name: "HR", icon: Folder },
    { name: "Marketing", icon: Folder },
    { name: "Model Contracts", icon: FileText },
    { name: "Agreement.pdf", icon: FileText },
    { name: "Tax Docs", icon: FileText },
    { name: "Contract Letter.pdf", icon: FileText },
  ]

  const tabs = [
    { id: "all", label: "All contracts" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
    { id: "expired", label: "Expired" },
  ]

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "sent":
        return "sent"
      case "viewed":
        return "viewed"
      case "signed":
        return "signed"
      default:
        return "default"
    }
  }

  // Convert templates to select options
  const templateOptions = template.map((t) => ({
    value: t.id,
    label: t.name,
  }))

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const openModal = () => {
    setShowModal(true)
    // Pre-fill recipient name if modelInfo is available
    if (modelInfo?.fullName) {
      setFormData((prev) => ({
        ...prev,
        recipientName: modelInfo.fullName,
        recipientEmail: modelInfo.email
      }))
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({
      recipientName: "",
      recipientEmail: "",
      templateId: "",
    })
  }

  useEffect(() => {
    getTemplate()
    // getDocumentsByModel()
    // fetchAllDocuments()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-white">Billing</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={openModal}>
              <Plus className="w-4 h-4 mr-2" />
              New Contract
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Contracts</h1>

            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

            <Button onClick={openModal} className="mb-6">
              <Plus className="w-4 h-4 mr-2" />
              New Contract
            </Button>

            {/* Contracts Table */}
            <Card>
              <div className="overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 text-sm text-gray-400 font-medium">
                  <div>MODEL</div>
                  <div>AGENCY</div>
                  <div>TEMPLATE</div>
                  <div>STATUS</div>
                </div>

                {contractsData.map((contract, index) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-4 gap-4 p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-750 transition-colors"
                  >
                    <div className="font-medium">{contract.model}</div>
                    <div className="text-gray-400">{contract.agency}</div>
                    <div className="text-gray-400">{contract.template}</div>
                    <div>
                      <Badge variant={getStatusVariant(contract.status)}>
                        {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-gray-800 p-6">
          {/* Monthly Billing Area */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Monthly Billing Area</h2>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                  View All
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Vice VAI</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2 text-sm text-gray-400 font-medium">
                  <div>Month</div>
                  <div>Gross</div>
                  <div>Platform</div>
                  <div>Net</div>
                </div>

                {billingData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-4 gap-2 text-sm"
                  >
                    <div className="font-medium">{item.month}</div>
                    <div>{item.gross}</div>
                    <div>{item.platform}</div>
                    <div>{item.net}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Documents</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documentsData.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <doc.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Contract Modal */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create New Contract</h2>
            <Button variant="ghost" size="sm" onClick={closeModal}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Recipient Name"
              value={formData.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
              placeholder="Enter recipient name"
              required
            />

            <Input
              label="Recipient Email"
              type="email"
              value={formData.recipientEmail}
              onChange={(e) => handleInputChange("recipientEmail", e.target.value)}
              placeholder="Enter recipient email"
              required
            />

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Template <span className="text-red-400">*</span>
              </label>
              <Select
                options={templateOptions}
                value={formData.templateId}
                onChange={(value) => handleInputChange("templateId", value)}
                placeholder="Select template"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={createDocument} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Creating..." : "Create Contract"}
              </Button>
              <Button variant="secondary" onClick={closeModal} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Modal>
    </div>
  )
}

export default BillingDashboard
