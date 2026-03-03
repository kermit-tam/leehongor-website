/**
 * CEM (Chinese/English/Math) 頁面佈局
 * 為 trychi、tryeng、trymath 頁面提供獨立導航
 * CEM Layout - Independent navigation for exercise pages
 */

import { CEMNavbar } from './cem-navbar';

interface CEMLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export function CEMLayout({ children, showNavbar = true }: CEMLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <CEMNavbar />}
      {children}
    </div>
  );
}
