import LoadingSpinner from './LoadingSpinner'
import InlineSpinner from './InlineSpinner'
import PulseLoader from './PulseLoader'

const LoadingSpinnerDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#BC6C25]">Loading Spinner Variants</h2>
        
        {/* Main Loading Spinner */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Main Loading Spinner</h3>
          <div className="border rounded-lg p-4">
            <LoadingSpinner smallHeight={true} message="Loading your content..." />
          </div>
        </div>

        {/* Inline Spinners */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Inline Spinners</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span>Extra Small:</span>
              <InlineSpinner size="xs" color="primary" />
            </div>
            <div className="flex items-center gap-4">
              <span>Small:</span>
              <InlineSpinner size="sm" color="primary" />
            </div>
            <div className="flex items-center gap-4">
              <span>Medium:</span>
              <InlineSpinner size="md" color="secondary" />
            </div>
            <div className="flex items-center gap-4">
              <span>Large:</span>
              <InlineSpinner size="lg" color="primary" />
            </div>
          </div>
        </div>

        {/* Pulse Loaders */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Pulse Loaders</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span>3 Dots:</span>
              <PulseLoader count={3} size="md" color="primary" />
            </div>
            <div className="flex items-center gap-4">
              <span>5 Dots:</span>
              <PulseLoader count={5} size="sm" color="secondary" />
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Usage Examples</h3>
          <div className="space-y-4">
            <button className="btn bg-[#BC6C25] text-white hover:bg-[#DDA15E] flex items-center gap-2">
              <InlineSpinner size="sm" color="white" />
              Loading...
            </button>
            
            <div className="flex items-center gap-2 text-[#BC6C25]">
              <InlineSpinner size="xs" color="primary" />
              <span>Processing your request...</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <PulseLoader count={3} size="sm" color="gray" />
              <span>Saving changes...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinnerDemo