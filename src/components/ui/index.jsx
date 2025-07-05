// Shared UI Components for consistent design across the application

export const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    ghost: "text-gray-300 hover:text-white hover:bg-gray-700/50",
    outline: "border border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export const Avatar = ({ src, alt, fallback, className = "", isOnline = false }) => (
  <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-full ring-2 ring-gray-700 hover:ring-gray-500 transition-all duration-200 ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <span className="text-sm font-semibold text-white">{fallback}</span>
    )}
    {isOnline && (
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
    )}
  </div>
)

export const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    success: "bg-green-500 text-white",
  }
  
  return (
    <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-bold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

export const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className={`relative bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl ${className}`}>
        {children}
      </div>
    </div>
  )
}

export const SearchInput = ({ placeholder, value, onChange, className = "", autoFocus = false, SearchIcon }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {SearchIcon && <SearchIcon className="h-5 w-5 text-gray-400" />}
    </div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
      autoFocus={autoFocus}
    />
  </div>
)

export const Tooltip = ({ children, content, className = "" }) => (
  <div className={`relative group ${className}`}>
    {children}
    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
      {content}
    </div>
  </div>
)
