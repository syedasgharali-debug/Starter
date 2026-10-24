import React from 'react';
import { useApp } from '../../context/AppContext';
import { Forbidden403 } from './Forbidden403';

interface RBACGuardProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export const RBACGuard: React.FC<RBACGuardProps> = ({ children, pageTitle }) => {
  const { effectiveRole } = useApp();

  if (effectiveRole !== 'Administrator') {
    return <Forbidden403 pageTitle={pageTitle} />;
  }

  return <>{children}</>;
};
