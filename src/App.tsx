import { AuthProvider } from './context/AuthContext';
import { useNavigation } from './hooks/useNavigation';
import { AppRoutes } from './routes';

function AppContent() {
  const {
    currentPath,
    navigate,
    isSidebarCollapsed,
    toggleSidebarCollapse,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  } = useNavigation();

  return (
    <AppRoutes
      currentPath={currentPath}
      onNavigate={navigate}
      isSidebarCollapsed={isSidebarCollapsed}
      onToggleSidebarCollapse={toggleSidebarCollapse}
      isMobileMenuOpen={isMobileMenuOpen}
      onToggleMobileMenu={toggleMobileMenu}
      onCloseMobileMenu={closeMobileMenu}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
