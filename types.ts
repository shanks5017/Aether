import React from 'react';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // How strong the magnetic pull is
}