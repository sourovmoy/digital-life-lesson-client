import toast from 'react-hot-toast';

// Custom toast functions with your brand colors
export const customToast = {
  // Success toast with primary color
  success: (message, options = {}) => {
    return toast.success(message, {
      style: {
        background: '#BC6C25',
        color: '#ffffff',
        border: '2px solid #DDA15E',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(188, 108, 37, 0.4)',
        fontWeight: '600',
        fontSize: '14px',
        padding: '12px 16px',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#BC6C25',
      },
      duration: 3000,
      ...options,
    });
  },

  // Error toast with error color and primary accent
  error: (message, options = {}) => {
    return toast.error(message, {
      style: {
        background: '#ef4444',
        color: '#ffffff',
        border: '2px solid #BC6C25',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
        fontWeight: '600',
        fontSize: '14px',
        padding: '12px 16px',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#ef4444',
      },
      duration: 4000,
      ...options,
    });
  },

  // Loading toast with secondary color
  loading: (message, options = {}) => {
    return toast.loading(message, {
      style: {
        background: '#DDA15E',
        color: '#283618',
        border: '2px solid #BC6C25',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(221, 161, 94, 0.4)',
        fontWeight: '600',
        fontSize: '14px',
        padding: '12px 16px',
      },
      ...options,
    });
  },

  // Custom toast with gradient background
  custom: (message, options = {}) => {
    return toast(message, {
      style: {
        background: 'linear-gradient(135deg, #BC6C25 0%, #DDA15E 100%)',
        color: '#ffffff',
        border: '2px solid #606C38',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(188, 108, 37, 0.4)',
        fontWeight: '600',
        fontSize: '14px',
        padding: '12px 16px',
      },
      duration: 3500,
      ...options,
    });
  },

  // Promise toast for async operations
  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, messages, {
      style: {
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '14px',
        padding: '12px 16px',
      },
      success: {
        style: {
          background: '#BC6C25',
          color: '#ffffff',
          border: '2px solid #DDA15E',
          boxShadow: '0 10px 25px rgba(188, 108, 37, 0.4)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#BC6C25',
        },
      },
      error: {
        style: {
          background: '#ef4444',
          color: '#ffffff',
          border: '2px solid #BC6C25',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#ef4444',
        },
      },
      loading: {
        style: {
          background: '#DDA15E',
          color: '#283618',
          border: '2px solid #BC6C25',
          boxShadow: '0 10px 25px rgba(221, 161, 94, 0.4)',
        },
      },
      ...options,
    });
  },

  // Dismiss all toasts
  dismiss: () => toast.dismiss(),

  // Remove specific toast
  remove: (toastId) => toast.remove(toastId),
};

// Export individual functions for convenience
export const { success, error, loading, custom, promise } = customToast;

// Default export
export default customToast;