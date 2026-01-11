import CustomButton, { 
  PrimaryButton, 
  SecondaryButton, 
  SuccessButton, 
  ErrorButton, 
  WarningButton, 
  OutlineButton, 
  GhostButton, 
  GradientButton 
} from "./CustomButton";

const ButtonShowcase = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Beautiful Custom Buttons
          </h1>
          <p className="text-base-content/70 text-lg">
            Showcase of all custom button variants with your brand colors
          </p>
        </div>

        {/* Button Variants */}
        <div className="grid gap-8">
          {/* Primary Buttons */}
          <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
            <h3 className="text-xl font-bold text-base-content mb-4">Primary Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton size="sm">Small Primary</PrimaryButton>
              <PrimaryButton>Default Primary</PrimaryButton>
              <PrimaryButton size="lg">Large Primary</PrimaryButton>
              <PrimaryButton size="xl">Extra Large</PrimaryButton>
              <PrimaryButton disabled>Disabled</PrimaryButton>
              <PrimaryButton loading>Loading...</PrimaryButton>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
            <h3 className="text-xl font-bold text-base-content mb-4">Secondary Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <SecondaryButton size="sm">Small Secondary</SecondaryButton>
              <SecondaryButton>Default Secondary</SecondaryButton>
              <SecondaryButton size="lg">Large Secondary</SecondaryButton>
              <SecondaryButton disabled>Disabled</SecondaryButton>
            </div>
          </div>

          {/* Status Buttons */}
          <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
            <h3 className="text-xl font-bold text-base-content mb-4">Status Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <SuccessButton>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Success
              </SuccessButton>
              <ErrorButton>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Error
              </ErrorButton>
              <WarningButton>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Warning
              </WarningButton>
            </div>
          </div>

          {/* Style Variants */}
          <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
            <h3 className="text-xl font-bold text-base-content mb-4">Style Variants</h3>
            <div className="flex flex-wrap gap-4">
              <OutlineButton>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20