import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1E] via-[#1A1A2E] to-[#0F0F1E] flex items-center justify-center p-4">
      {/* Premium Phone Frame */}
      <div className="relative w-full max-w-[430px] h-[932px] bg-gradient-to-b from-gray-900 to-black rounded-[50px] shadow-elevated border-[12px] border-gray-800 overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-3xl z-50 shadow-lg"></div>

        {/* Screen Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

        {/* App Content */}
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}
