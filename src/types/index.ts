export type Language = 'de' | 'en' | 'fr' | 'it' | 'ar';

export type AppView = 'landing' | 'kundenbereich' | 'admin-portal';

export type DashboardView = 'overview' | 'invoices' | 'scanner' | 'disputes' | 'suppliers' | 'settings' | 'admin';

export type DiscrepancyType =
  | 'Price Variance'
  | 'Quantity Mismatch'
  | 'Duplicate Billing'
  | 'VAT Error'
  | 'Contract Terms';

export type RiskLevel = 'High' | 'Medium' | 'Low';

export type InvoiceStatus = 'discrepancy' | 'approved' | 'duplicate' | 'processing' | 'in_review' | 'resolved';

export type UserRole = 'Super Admin' | 'Lead Auditor' | 'Finance Manager' | 'ERP Specialist';

export interface MultiTenantClient {
  id: string;
  companyName: string;
  erpSystem: 'Abacus' | 'SAP S/4HANA' | 'Bexio' | 'Sage 50';
  totalAuditedCHF: number;
  totalSavingsCHF: number;
  activeInvoicesCount: number;
  flaggedDiscrepanciesCount: number;
  leadAuditor: string;
  status: 'Active' | 'Onboarding' | 'Audit In Progress';
}

export interface AuditorQueueItem {
  id: string;
  clientName: string;
  invoiceNumber: string;
  supplierName: string;
  billedCHF: number;
  varianceCHF: number;
  discrepancyType: DiscrepancyType;
  flaggedDate: string;
  confidenceScore: number;
  status: 'Pending Verification' | 'Approved' | 'Adjusted' | 'Discarded';
  notes: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Pending' | 'Suspended';
  lastLogin: string;
  avatarUrl?: string;
  department: string;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category: 'Security' | 'Invoice Audit' | 'ERP Sync' | 'Rule Update';
  status: 'Success' | 'Warning' | 'Failed';
  details: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  poUnitPrice: number;
  billedUnitPrice: number;
  poQuantity: number;
  billedQuantity: number;
  varianceCHF: number;
  reason: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  invoiceDate: string;
  poNumber: string;
  totalBilledCHF: number;
  totalPOCHF: number;
  varianceCHF: number;
  status: InvoiceStatus;
  discrepancyType: DiscrepancyType;
  riskLevel: RiskLevel;
  confidenceScore: number;
  lineItems: InvoiceLineItem[];
  disputeLetter: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  country: string;
  totalInvoices: number;
  flaggedInvoices: number;
  errorRatePct: number;
  totalOverchargeCHF: number;
  riskLevel: RiskLevel;
  lastAuditDate: string;
  complianceScore: number;
}
