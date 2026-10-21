import { Language } from '../types';

export interface TranslationDictionary {
  // Common Navigation
  skipToContent: string;
  brandTagline: string;
  navWhyAudit: string;
  navWhatWeAudit: string;
  navBenefits: string;
  navProcess: string;
  navPricing: string;
  navContact: string;
  navFaq: string;
  navPhone: string;
  requestReview: string;
  launchPortal: string;
  backToLanding: string;

  // Marquee
  marquee1: string;
  marquee2: string;

  // Hero Section
  heroEyebrow: string;
  heroHeading1: string;
  heroHeadingAccent: string;
  heroHeading2: string;
  heroLead: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  trustNoObligation: string;
  trustSwissCompany: string;
  trustDocumentedFindings: string;
  trustYouDecide: string;

  // Sample Audit Card
  sampleTitle: string;
  sampleBadge: string;
  samplePoAmount: string;
  sampleInvoiceAmount: string;
  sampleVarianceFound: string;
  sampleNote: string;

  // Section 1: Thorough Review
  thoroughEyebrow: string;
  thoroughTitle: string;
  thoroughTitleAccent: string;
  thoroughText: string;

  // Section 2: Why Audit
  whyEyebrow: string;
  whyTitleLine1: string;
  whyTitleLine2: string;
  whyLead: string;
  whyReason1Title: string;
  whyReason1Text: string;
  whyReason2Title: string;
  whyReason2Text: string;
  whyReason3Title: string;
  whyReason3Text: string;
  whyReason4Title: string;
  whyReason4Text: string;
  whyImpactTitle: string;
  whyImpact1Title: string;
  whyImpact1Text: string;
  whyImpact2Title: string;
  whyImpact2Text: string;
  whyImpact3Title: string;
  whyImpact3Text: string;

  // Section 3: What We Audit
  whatEyebrow: string;
  whatTitle: string;
  whatLead: string;
  pillar1Title: string;
  pillar1Text: string;
  pillar2Title: string;
  pillar2Text: string;
  pillar3Title: string;
  pillar3Text: string;
  pillar4Title: string;
  pillar4Text: string;
  pillar5Title: string;
  pillar5Text: string;
  docMatchTitle: string;
  docMatchText: string;
  docMatch1Title: string;
  docMatch1Text: string;
  docMatch2Title: string;
  docMatch2Text: string;
  docMatch3Title: string;
  docMatch3Text: string;
  docMatch4Title: string;
  docMatch4Text: string;

  // Section 4: Benefits
  benefitEyebrow: string;
  benefitTitle: string;
  benefitLead: string;
  benefitCard1Title: string;
  benefitCard1Text: string;
  benefitCard2Title: string;
  benefitCard2Text: string;
  benefitCard3Title: string;
  benefitCard3Text: string;

  // Section 5: Process
  processEyebrow: string;
  processTitle: string;
  step1Title: string;
  step1Text: string;
  step2Title: string;
  step2Text: string;
  step3Title: string;
  step3Text: string;
  step4Title: string;
  step4Text: string;
  step5Title: string;
  step5Text: string;
  examplePanelTitle: string;
  findingPanelTitle: string;
  findingBadge: string;
  findingText: string;
  nextStepsTitle: string;
  nextStepsText: string;

  // Section 6: Packages / Tiers
  pricingEyebrow: string;
  pricingTitle: string;
  pricingLead: string;
  pkgStarterTitle: string;
  pkgStarterPrice: string;
  pkgStarterDesc: string;
  pkgProTitle: string;
  pkgProPrice: string;
  pkgProDesc: string;
  pkgEnterpriseTitle: string;
  pkgEnterprisePrice: string;
  pkgEnterpriseDesc: string;
  pkgPopularBadge: string;

  // Section 7: Calculator
  calcEyebrow: string;
  calcTitle: string;
  calcLead: string;
  calcInvoiceVolume: string;
  calcAvgAmount: string;
  calcErrorRate: string;
  calcHourlyRate: string;
  calcEstLoss: string;
  calcHoursSaved: string;
  calcNetRoi: string;
  calcApplyButton: string;

  // Section 8: FAQ
  faqEyebrow: string;
  faqTitle: string;
  faqLead: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;

  // Section 9: CTA & Contact
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  contactEyebrow: string;
  contactTitle: string;
  contactLead: string;
  contactDirectTitle: string;
  contactFormTitle: string;
  contactFormHint: string;
  labelName: string;
  labelEmail: string;
  labelMessage: string;
  labelNdaConsent: string;
  btnSubmitQuote: string;
  formSubmitting: string;
  formSuccessMsg: string;
  formFooterNote: string;

  // Klara Chatbot
  chatTitle: string;
  chatSub: string;
  chatWelcome: string;
  chatChip1: string;
  chatChip2: string;
  chatChip3: string;
  chatChip4: string;
  chatChip5: string;
  chatPlaceholder: string;
  chatSendBtn: string;
  chatEmailPrompt: string;
  chatEmailSubmit: string;
  chatEmailSuccess: string;

  // Footer & Legal
  footerCopyright: string;
  footerSwitzerland: string;
  legalDatenschutzTitle: string;
  legalNdaTitle: string;
  legalCompanyTitle: string;

  // Dashboard UI
  dashTitle: string;
  dashSubtitle: string;
  dashTabOverview: string;
  dashTabInvoices: string;
  dashTabScanner: string;
  dashTabDisputes: string;
  dashTabSuppliers: string;
  dashTabSettings: string;
  dashTotalAudited: string;
  dashRecoveredLosses: string;
  dashActiveDiscrepancies: string;
  dashAuditEfficiency: string;
  dashRecentInvoices: string;
  dashUploadInvoice: string;
  dashRunAiScanner: string;
  dashDiscrepancyType: string;
  dashRiskLevel: string;
  dashStatus: string;
  dashAction: string;
  dashFilterAll: string;
  dashFilterDiscrepancy: string;
  dashFilterApproved: string;
  dashGenerateLetter: string;
  dashCopyLetter: string;
  dashLetterCopied: string;
  dashSupplierName: string;
  dashTotalOvercharge: string;
  dashErrorRate: string;
  dashErpConnected: string;
  dashExportFilteredCsv: string;
  dashExportDiscrepanciesCsv: string;
  dashExportSuccess: string;
  dashExportOptions: string;
  dashExportSingleInvoice: string;

  // Admin Portal & Security
  dashTabAdmin: string;
  adminSecurityGate: string;
  adminTitle: string;
  adminSubtitle: string;
  adminSignIn: string;
  adminUsersTitle: string;
  adminUsersSubtitle: string;
  adminAddUser: string;
  adminSearchUser: string;
  adminRulesTitle: string;
  adminRulesSubtitle: string;
  adminMaxTolerance: string;
  adminAutoFlagDuplicates: string;
  adminStrictVat: string;
  adminDualSignoff: string;
  adminSavePolicies: string;
  adminSystemHealth: string;
  adminSecurityLogs: string;
  adminLogsSubtitle: string;
  adminAuthSuccess: string;
  adminPolicyUpdated: string;
  adminModalTitle: string;
  adminModalSubtitle: string;
  adminEmailLabel: string;
  adminPasswordLabel: string;
  adminRoleLabel: string;
  adminAuthenticate: string;
  adminInviteUserTitle: string;
  adminInviteUserSubtitle: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  de: {
    skipToContent: 'Zum Inhalt springen',
    brandTagline: 'Kostenverlust-Prüfung für Unternehmen',
    navWhyAudit: 'Warum prüfen',
    navWhatWeAudit: 'Was wir prüfen',
    navBenefits: 'Ihr Nutzen',
    navProcess: 'Ablauf',
    navPricing: 'Konditionen',
    navContact: 'Kontakt',
    navFaq: 'FAQ',
    navPhone: '044 589 72 88',
    requestReview: 'Prüfung anfragen',
    launchPortal: 'Kundenportal',
    backToLanding: 'Zur Startseite',

    marquee1: 'Kostenverlust-Prüfung für Unternehmen – wir prüfen Ihre Lieferantenrechnungen auf vermeidbare Kosten',
    marquee2: 'Doppelabrechnungen · Preisabweichungen · Mengenfehler · weitere Abrechnungsfehler',

    heroEyebrow: 'Intelligente Rechnungsprüfung',
    heroHeading1: 'Sparen Sie bis zu 90% Zeit',
    heroHeadingAccent: '',
    heroHeading2: 'bei der Rechnungsprüfung.',
    heroLead: 'klar solution prüft Rechnungen, Bestellungen und weitere Belege nachvollziehbar, erklärt Abweichungen und zeigt die nächsten Schritte. Ihr Team behält die Entscheidung.',
    heroCtaPrimary: 'Kundenbereich / Live-Dashboard →',
    heroCtaSecondary: 'Funktionen entdecken ›',
    trustNoObligation: '✓ Entwickelt in der Schweiz',
    trustSwissCompany: '✓ DSGVO-konform',
    trustDocumentedFindings: '✓ Nachvollziehbar dokumentierte Befunde',
    trustYouDecide: '✓ Sie behalten die Freigabe',

    sampleTitle: 'Beispiel: Preisabweichung',
    sampleBadge: 'Fiktives Beispiel',
    samplePoAmount: 'Bestellung – vereinbarter Betrag',
    sampleInvoiceAmount: 'Rechnung – berechneter Betrag',
    sampleVarianceFound: '⚠ Abweichung festgestellt',
    sampleNote: 'Vereinfachtes, fiktives Beispiel zur Veranschaulichung des Prüfprinzips. Es handelt sich nicht um echte Kundendaten.',

    thoroughEyebrow: 'Kostenverlust-Prüfung für Unternehmen',
    thoroughTitle: 'Gründliche Prüfung Ihrer ',
    thoroughTitleAccent: 'Lieferantenrechnungen',
    thoroughText: 'Wir gleichen Ihre Lieferantenrechnungen systematisch mit Bestellungen, Lieferscheinen und Verträgen ab – soweit vorhanden – und dokumentieren jede Abweichung nachvollziehbar.',

    whyEyebrow: 'Warum die Prüfung sinnvoll ist',
    whyTitleLine1: 'Fehlerhafte Abrechnungen fallen nicht immer auf.',
    whyTitleLine2: 'Sie kosten trotzdem Geld.',
    whyLead: 'Im Tagesgeschäft bleibt selten Zeit, jede Lieferantenrechnung im Detail abzugleichen. Abweichungen können dabei unbemerkt bleiben und die Kosten Ihres Unternehmens erhöhen.',
    whyReason1Title: 'Viele Rechnungen, wenig Zeit',
    whyReason1Text: 'Nicht jede Position wird mit Bestellung und Lieferung verglichen.',
    whyReason2Title: 'Konditionen ändern sich',
    whyReason2Text: 'Preise und Vertragsbedingungen stimmen nicht immer mit der Rechnung überein.',
    whyReason3Title: 'Fehler wiederholen sich',
    whyReason3Text: 'Ein falscher Preis oder eine falsche Menge kann jede weitere Rechnung betreffen.',
    whyReason4Title: 'Doppelte Belastung',
    whyReason4Text: 'Rechnungen können mehrfach gestellt oder erneut eingereicht werden.',
    whyImpactTitle: 'Mögliche Folgen unbemerkter Fehler',
    whyImpact1Title: 'Zu hohe Zahlungen',
    whyImpact1Text: 'Überhöhte, doppelte oder nicht geschuldete Beträge werden bezahlt.',
    whyImpact2Title: 'Aufwendigere Klärung',
    whyImpact2Text: 'Je länger ein Fehler unentdeckt bleibt, desto schwieriger kann die Klärung mit dem Lieferanten werden.',
    whyImpact3Title: 'Höhere laufende Kosten',
    whyImpact3Text: 'Wiederkehrende Fehler erhöhen die Ausgaben Ihres Unternehmens über längere Zeit.',

    whatEyebrow: 'Was wir prüfen',
    whatTitle: 'Lieferantenrechnungen auf Fehler und vermeidbare Kosten prüfen.',
    whatLead: 'Im Mittelpunkt stehen Ihre Lieferantenrechnungen. Wir prüfen sie auf die folgenden Abweichungen und auf weitere mögliche Abrechnungsfehler.',
    pillar1Title: 'Doppelabrechnungen',
    pillar1Text: 'Dieselbe Leistung wird mehrfach berechnet oder eine bezahlte Rechnung erneut eingereicht.',
    pillar2Title: 'Preisabweichungen',
    pillar2Text: 'Berechnete Preise weichen von Bestellung oder Vertrag ab.',
    pillar3Title: 'Mengenfehler',
    pillar3Text: 'Berechnete Mengen stimmen nicht mit der Lieferung überein.',
    pillar4Title: 'Rechen- und MWST-Fehler',
    pillar4Text: 'Falsche Summen, Rechenfehler oder fehlerhafte MWST-Angaben.',
    pillar5Title: 'Vertragskonditionen',
    pillar5Text: 'Vereinbarte Konditionen werden in der Rechnung nicht eingehalten.',
    docMatchTitle: 'Abgleich mit Ihren Unterlagen',
    docMatchText: 'Soweit vorhanden, gleichen wir die Rechnungen mit weiteren Unterlagen ab. Jede Abweichung wird nachvollziehbar dokumentiert.',
    docMatch1Title: 'Bestellungen',
    docMatch1Text: 'Vereinbarte Preise und Mengen werden mit der Rechnung verglichen.',
    docMatch2Title: 'Lieferscheine',
    docMatch2Text: 'Tatsächlich gelieferte Mengen werden mit den berechneten Mengen verglichen.',
    docMatch3Title: 'Verträge',
    docMatch3Text: 'Vereinbarte Konditionen werden mit den berechneten Beträgen verglichen.',
    docMatch4Title: 'Dokumentierte Befunde',
    docMatch4Text: 'Jede Abweichung wird mit den betroffenen Belegen festgehalten.',

    benefitEyebrow: 'Ihr Nutzen',
    benefitTitle: 'Nur bezahlen, was tatsächlich geschuldet ist.',
    benefitLead: 'Die Prüfung zeigt Ihnen, wo Rechnungen von Bestellung, Lieferung oder Vertrag abweichen. Wie hoch ein mögliches Einsparpotenzial ist, hängt von Ihren Rechnungen ab und lässt sich erst nach der Prüfung beurteilen.',
    benefitCard1Title: 'Unberechtigte Kosten erkennen',
    benefitCard1Text: 'Sie sehen, wo Rechnungen zu hoch, doppelt oder fehlerhaft ausgestellt wurden.',
    benefitCard2Title: 'Unnötige Ausgaben reduzieren',
    benefitCard2Text: 'Festgestellte Fehler können Sie mit dem Lieferanten klären und künftig vermeiden.',
    benefitCard3Title: 'Nachvollziehbare Befunde',
    benefitCard3Text: 'Jede Abweichung wird mit den betroffenen Belegen dokumentiert. Die Entscheidung über nächste Schritte bleibt bei Ihnen.',

    processEyebrow: 'So geht es weiter',
    processTitle: 'Von der Anfrage zum Befund.',
    step1Title: 'Anfrage',
    step1Text: 'Sie nehmen Kontakt mit uns auf.',
    step2Title: 'Unterlagen',
    step2Text: 'Sie übermitteln Lieferantenrechnungen und weitere Belege.',
    step3Title: 'Prüfung',
    step3Text: 'Wir gleichen die Rechnungen systematisch ab.',
    step4Title: 'Befund',
    step4Text: 'Abweichungen werden nachvollziehbar dokumentiert.',
    step5Title: 'Entscheidung',
    step5Text: 'Sie entscheiden über die nächsten Schritte.',
    examplePanelTitle: 'Fiktives Beispiel: Mengenfehler',
    findingPanelTitle: 'So sieht ein Befund aus',
    findingBadge: 'BEFUND',
    findingText: 'Auf der Rechnung sind 20 Stück mehr berechnet, als bestellt und geliefert wurden.',
    nextStepsTitle: 'Mögliche nächste Schritte',
    nextStepsText: 'Abweichung mit dem Lieferanten klären und eine Korrektur der Rechnung verlangen. Die Entscheidung liegt bei Ihnen.',

    pricingEyebrow: 'Prüfpakete & Konditionen',
    pricingTitle: 'Flexible Prüfpakete für jede Unternehmensgrösse',
    pricingLead: 'Wählen Sie das passende Kontingent für Ihre wiederkehrenden Lieferantenrechnungen.',
    pkgStarterTitle: 'Starter Auditing',
    pkgStarterPrice: 'CHF 490 / Monat',
    pkgStarterDesc: 'Ideal für KMU mit bis zu 200 Rechnungen / Monat. Inklusive automatischer Preis- & Mengenprüfung.',
    pkgProTitle: 'Professional Audit',
    pkgProPrice: 'CHF 1,290 / Monat',
    pkgProDesc: 'Für wachsende Unternehmen mit bis zu 1,000 Rechnungen / Monat. Inklusive KI-Anomalie-Erkennung & Vorlagenerstellung.',
    pkgEnterpriseTitle: 'Enterprise Complete',
    pkgEnterprisePrice: 'Individuell',
    pkgEnterpriseDesc: 'Für Konzerne & Großunternehmen mit ERP-Direktanbindung (SAP, Abacus) und dediziertem Audit-Spezialisten.',
    pkgPopularBadge: 'Am beliebtesten',

    calcEyebrow: 'Interaktiver Einsparungsrechner',
    calcTitle: 'Berechnen Sie Ihr mögliches Rückforderungspotenzial',
    calcLead: 'Schätzen Sie Ihr jährliches Einsparpotenzial basierend auf typischen Fehlerquoten in B2B-Lieferantenrechnungen.',
    calcInvoiceVolume: 'Monatliches Rechnungsvolumen (Anzahl):',
    calcAvgAmount: 'Durchschnittlicher Rechnungsbetrag (CHF):',
    calcErrorRate: 'Geschätzte Abweichungsquote (%):',
    calcHourlyRate: 'Stundensatz für interne Belegprüfung (CHF):',
    calcEstLoss: 'Identifiziertes Jahres-Einsparpotenzial',
    calcHoursSaved: 'Eingesparte Prüfungsstunden / Jahr',
    calcNetRoi: 'Geschätzter Netto-ROI',
    calcApplyButton: 'Jetzt mit diesen Werten Prüfung anfragen →',

    faqEyebrow: 'Häufige Fragen',
    faqTitle: 'Die wichtigsten Antworten vor der Anfrage.',
    faqLead: 'Ein kurzer Überblick, damit Sie schnell entscheiden können, ob eine Prüfung für Ihr Unternehmen sinnvoll ist.',
    faqQ1: 'Welche Rechnungen können geprüft werden?',
    faqA1: 'Wir prüfen Lieferantenrechnungen und gleichen sie – soweit vorhanden – mit Bestellungen, Lieferscheinen, Verträgen und weiteren Belegen ab.',
    faqQ2: 'Was brauche ich für eine erste Anfrage?',
    faqA2: 'Kurze Angaben zu Ihrer Situation genügen. Den genauen Umfang und die benötigten Unterlagen besprechen wir persönlich.',
    faqQ3: 'Wer entscheidet über die nächsten Schritte?',
    faqA3: 'Sie behalten jederzeit die Entscheidungshoheit. Wir dokumentieren die Befunde nachvollziehbar und bereiten die möglichen nächsten Schritte vor.',
    faqQ4: 'Wie starte ich?',
    faqA4: 'Schreiben Sie an info@klarsolution.com oder rufen Sie uns unter 044 589 72 88 an.',

    ctaEyebrow: 'Prüfung anfragen',
    ctaTitle: 'Lassen Sie Ihre Lieferantenrechnungen prüfen.',
    ctaText: 'Schildern Sie uns kurz Ihre Situation oder übermitteln Sie einen konkreten Fall. Umfang und Konditionen der Prüfung besprechen wir individuell mit Ihnen.',
    ctaButton: 'Prüfung anfragen',
    contactEyebrow: 'Kontakt',
    contactTitle: 'Prüfung anfragen',
    contactLead: 'Rufen Sie uns an, schreiben Sie uns oder nutzen Sie das Formular. Wir melden uns und besprechen mit Ihnen Umfang und Konditionen der Prüfung.',
    contactDirectTitle: 'Direkt erreichbar',
    contactFormTitle: 'Ich möchte eine Prüfung anfragen',
    contactFormHint: 'Kurze Angaben genügen – wir melden uns bei Ihnen.',
    labelName: 'Name (optional)',
    labelEmail: 'Ihre E-Mail *',
    labelMessage: 'Nachricht (optional)',
    labelNdaConsent: 'Ich akzeptiere die Vertraulichkeitsvereinbarung (NDA).',
    btnSubmitQuote: 'Prüfung anfragen →',
    formSubmitting: 'Wird gesendet…',
    formSuccessMsg: '✓ Vielen Dank! Ihre Anfrage wurde direkt an unser Team übermittelt. Wir melden uns innerhalb eines Werktags.',
    formFooterNote: 'Ihre Daten werden ausschliesslich zur Kontaktaufnahme verwendet.',

    chatTitle: 'Klara',
    chatSub: 'Assistentin von KlarSolution',
    chatWelcome: 'Hallo 👋 Ich bin Klara von KlarSolution. Wir prüfen Lieferantenrechnungen auf Doppelabrechnungen, Preisabweichungen, Mengenfehler und weitere vermeidbare Kosten. Ich erkläre Ihnen gerne, wie es funktioniert!',
    chatChip1: 'Was prüfen Sie?',
    chatChip2: 'Was habe ich davon?',
    chatChip3: 'Wie läuft es ab?',
    chatChip4: 'Was kostet es?',
    chatChip5: 'Prüfung anfragen',
    chatPlaceholder: 'Frage eingeben...',
    chatSendBtn: '→',
    chatEmailPrompt: 'Möchten Sie eine persönliche Rückmeldung? Hinterlassen Sie Ihre E-Mail-Adresse:',
    chatEmailSubmit: 'Senden',
    chatEmailSuccess: 'Vielen Dank! Wir haben Ihre Anfrage erhalten.',

    footerCopyright: '© 2026 klar solution – Alle Rechte vorbehalten',
    footerSwitzerland: 'Schweiz 🇨🇭',
    legalDatenschutzTitle: 'DATENSCHUTZ',
    legalNdaTitle: 'VERTRAULICHKEITSVEREINBARUNG (NDA)',
    legalCompanyTitle: 'UNTERNEHMEN',

    dashTitle: 'Audit Analytics & Recovery Portal',
    dashSubtitle: 'KlarSolution B2B Cockpit – Echtzeit-Überwachung aller Rechnungsprüfungen & Lieferantenanomalien',
    dashTabOverview: 'Übersicht',
    dashTabInvoices: 'Rechnungs-Center',
    dashTabScanner: 'KI-Belegscanner',
    dashTabDisputes: 'Reklamations-Hub',
    dashTabSuppliers: 'Lieferanten-Risiko',
    dashTabSettings: 'Integrationen & Settings',
    dashTotalAudited: 'Geprüfte Rechnungen',
    dashRecoveredLosses: 'Identifizierte Überzahlungen',
    dashActiveDiscrepancies: 'Offene Abweichungen',
    dashAuditEfficiency: 'Prüfungsquote',
    dashRecentInvoices: 'Aktuelle Rechnungsprüfungen',
    dashUploadInvoice: 'Neue Rechnung hochladen',
    dashRunAiScanner: 'KI-Analyse starten',
    dashDiscrepancyType: 'Abweichungsart',
    dashRiskLevel: 'Risikostufe',
    dashStatus: 'Status',
    dashAction: 'Aktion',
    dashFilterAll: 'Alle Rechnungen',
    dashFilterDiscrepancy: 'Mit Abweichung',
    dashFilterApproved: 'Freigegeben',
    dashGenerateLetter: 'Reklamation generieren',
    dashCopyLetter: 'Text kopieren',
    dashLetterCopied: 'Kopiert!',
    dashSupplierName: 'Lieferant',
    dashTotalOvercharge: 'Gesamte Abweichungen',
    dashErrorRate: 'Fehlerquote',
    dashErpConnected: 'ERP Verbunden',
    dashExportFilteredCsv: 'Gefilterte Rechnungen exportieren (CSV)',
    dashExportDiscrepanciesCsv: 'Abweichungen & Positionen exportieren (CSV)',
    dashExportSuccess: 'CSV-Bericht erfolgreich exportiert',
    dashExportOptions: 'Export-Optionen',
    dashExportSingleInvoice: 'Diesen Beleg als CSV exportieren',

    dashTabAdmin: 'Admin-Portal',
    adminSecurityGate: 'Schweizer Bankenstandard Sicherheitskonsole',
    adminTitle: 'Admin-Governance & Sicherheitskontrolle',
    adminSubtitle: 'Verwalten Sie Systemberechtigungen, konfigurieren Sie automatische Toleranzgrenzen, prüfen Sie Compliance-Protokolle und steuern Sie Benutzerrollen.',
    adminSignIn: 'Anmelden am Admin-Portal',
    adminUsersTitle: 'Benutzerzugriffs- & Rechteverwaltung',
    adminUsersSubtitle: 'Aktive Compliance-Teamkonten und Rollenberechtigungen',
    adminAddUser: 'Compliance-Officer einladen',
    adminSearchUser: 'Benutzer nach Name, E-Mail oder Abteilung suchen...',
    adminRulesTitle: 'Prüftoleranz-Regelwerk',
    adminRulesSubtitle: 'KI-Abweichungsschwellenwerte und Auto-Flagging konfigurieren',
    adminMaxTolerance: 'Maximale Abweichungstoleranz',
    adminAutoFlagDuplicates: 'Doppelrechnungen automatisch markieren',
    adminStrictVat: 'Strikte Schweizer MwSt. 8.1% Prüfung',
    adminDualSignoff: 'Zweitunterschrift ab CHF 5\'000 erforderlich',
    adminSavePolicies: 'Governance-Regeln speichern',
    adminSystemHealth: 'Systemdiagnose & Status',
    adminSecurityLogs: 'Sicherheits- & Compliance-Audit-Trail',
    adminLogsSubtitle: 'Unveränderliche Systemereignisse und Benutzersicherheitsprotokolle',
    adminAuthSuccess: 'Admin-Sitzung erfolgreich authentifiziert.',
    adminPolicyUpdated: 'Prüftoleranzrichtlinien erfolgreich aktualisiert.',
    adminModalTitle: 'Admin-Sicherheitsportal',
    adminModalSubtitle: 'Authentifizieren Sie sich mit Unternehmensdaten für Governance-Zugriff.',
    adminEmailLabel: 'Unternehmens-E-Mail',
    adminPasswordLabel: 'Sicherheitstoken / Passwort',
    adminRoleLabel: 'Autorisierungsrolle wählen',
    adminAuthenticate: 'Sitzung authentifizieren',
    adminInviteUserTitle: 'Compliance-Officer einladen',
    adminInviteUserSubtitle: 'Gewähren Sie rollenbasierten Zugriff auf Ihr Enterprise-Prüfportal.',
  },

  en: {
    skipToContent: 'Skip to content',
    brandTagline: 'Cost-Loss Audit for Businesses',
    navWhyAudit: 'Why Audit',
    navWhatWeAudit: 'What We Audit',
    navBenefits: 'Your Benefits',
    navProcess: 'How It Works',
    navPricing: 'Pricing',
    navContact: 'Contact',
    navFaq: 'FAQ',
    navPhone: '+41 44 589 72 88',
    requestReview: 'Request Review',
    launchPortal: 'Customer Portal',
    backToLanding: 'Back to Home',

    marquee1: 'Cost-loss review for companies – we check your supplier invoices for avoidable costs',
    marquee2: 'Duplicate charges · Price deviations · Quantity errors · Other billing errors',

    heroEyebrow: 'Supplier Invoice Review',
    heroHeading1: 'Cost-Loss Audit',
    heroHeadingAccent: '',
    heroHeading2: 'for Businesses',
    heroLead: 'We review supplier invoices for duplicate charges, price deviations, quantity errors and other avoidable costs – so your company only pays what is actually owed.',
    heroCtaPrimary: 'Request Review →',
    heroCtaSecondary: 'What We Audit ›',
    trustNoObligation: '✓ No-obligation request',
    trustSwissCompany: '✓ Swiss company',
    trustDocumentedFindings: '✓ Clearly documented findings',
    trustYouDecide: '✓ You decide on the next steps',

    sampleTitle: 'Example: Price Deviation',
    sampleBadge: 'Fictional Example',
    samplePoAmount: 'Purchase Order – agreed amount',
    sampleInvoiceAmount: 'Invoice – billed amount',
    sampleVarianceFound: '⚠ Deviation identified',
    sampleNote: 'Simplified, fictional example to illustrate the review principle. Not actual customer data.',

    thoroughEyebrow: 'Cost-loss review for companies',
    thoroughTitle: 'Thorough review of your ',
    thoroughTitleAccent: 'supplier invoices',
    thoroughText: 'We systematically compare your supplier invoices with purchase orders, delivery notes and contracts, where available, and document every deviation clearly.',

    whyEyebrow: 'Why a review makes sense',
    whyTitleLine1: 'Incorrect billing does not always stand out.',
    whyTitleLine2: 'It still costs money.',
    whyLead: 'Day-to-day work rarely leaves time to check every supplier invoice in detail. Deviations can go unnoticed and increase your company’s costs.',
    whyReason1Title: 'Many invoices, little time',
    whyReason1Text: 'Not every line item is compared with the order and delivery.',
    whyReason2Title: 'Terms change',
    whyReason2Text: 'Prices and contract terms do not always match the invoice.',
    whyReason3Title: 'Errors repeat',
    whyReason3Text: 'An incorrect price or quantity can affect every subsequent invoice.',
    whyReason4Title: 'Duplicate charges',
    whyReason4Text: 'Invoices may be issued more than once or resubmitted.',
    whyImpactTitle: 'Possible effects of unnoticed errors',
    whyImpact1Title: 'Overpayments',
    whyImpact1Text: 'Inflated, duplicate or unjustified amounts are paid.',
    whyImpact2Title: 'More complex clarification',
    whyImpact2Text: 'The longer an error remains undiscovered, the more difficult clarification with the supplier can become.',
    whyImpact3Title: 'Higher ongoing costs',
    whyImpact3Text: 'Recurring errors increase your company’s expenses over time.',

    whatEyebrow: 'What we review',
    whatTitle: 'Review supplier invoices for errors and avoidable costs.',
    whatLead: 'Your supplier invoices are at the center of the review. We check them for the following deviations and other possible billing errors.',
    pillar1Title: 'Duplicate Charges',
    pillar1Text: 'The same service is billed more than once or a paid invoice is resubmitted.',
    pillar2Title: 'Price Deviations',
    pillar2Text: 'Billed prices differ from the purchase order or contract.',
    pillar3Title: 'Quantity Errors',
    pillar3Text: 'Billed quantities do not match actual delivery notes.',
    pillar4Title: 'Calculation & VAT Errors',
    pillar4Text: 'Incorrect totals, arithmetic mistakes or wrong VAT rates.',
    pillar5Title: 'Contract Terms',
    pillar5Text: 'Agreed contract conditions are not reflected on the invoice.',
    docMatchTitle: 'Comparison with your documents',
    docMatchText: 'Where available, we compare invoices with additional documents. Every deviation is documented clearly.',
    docMatch1Title: 'Purchase Orders',
    docMatch1Text: 'Agreed prices and quantities are compared with the invoice.',
    docMatch2Title: 'Delivery Notes',
    docMatch2Text: 'Actual delivered quantities are compared with billed quantities.',
    docMatch3Title: 'Contracts',
    docMatch3Text: 'Agreed terms are compared with billed amounts.',
    docMatch4Title: 'Documented Findings',
    docMatch4Text: 'Every deviation is recorded with the relevant supporting documents.',

    benefitEyebrow: 'Your Benefit',
    benefitTitle: 'Pay only what is actually owed.',
    benefitLead: 'The review shows where invoices differ from the order, delivery or contract. Potential savings depend on your invoice volume and are assessed after the audit.',
    benefitCard1Title: 'Identify Unjustified Costs',
    benefitCard1Text: 'See where invoices were issued too high, duplicated, or incorrectly.',
    benefitCard2Title: 'Reduce Unnecessary Expenses',
    benefitCard2Text: 'Clarify identified errors with suppliers and avoid them in the future.',
    benefitCard3Title: 'Traceable Audit Findings',
    benefitCard3Text: 'Every deviation is documented with affected receipts. You decide on next steps.',

    processEyebrow: 'What Happens Next',
    processTitle: 'From Request to Audit Report.',
    step1Title: 'Request',
    step1Text: 'Get in touch with us.',
    step2Title: 'Documents',
    step2Text: 'Provide supplier invoices and supporting receipts.',
    step3Title: 'Audit',
    step3Text: 'We systematically compare and audit all line items.',
    step4Title: 'Report',
    step4Text: 'Deviations are clearly documented.',
    step5Title: 'Decision',
    step5Text: 'You decide on claim actions or supplier discussions.',
    examplePanelTitle: 'Fictional Example: Quantity Error',
    findingPanelTitle: 'What an audit finding looks like',
    findingBadge: 'AUDIT FINDING',
    findingText: 'The invoice billed 20 items more than were ordered and delivered.',
    nextStepsTitle: 'Possible Next Steps',
    nextStepsText: 'Clarify deviation with the supplier and request a credit note. The decision is yours.',

    pricingEyebrow: 'Audit Packages & Pricing',
    pricingTitle: 'Flexible Audit Contingents for Every Business Size',
    pricingLead: 'Choose the right quota for your recurring supplier invoice volume.',
    pkgStarterTitle: 'Starter Auditing',
    pkgStarterPrice: 'CHF 490 / month',
    pkgStarterDesc: 'Ideal for SMEs with up to 200 invoices / month. Includes automatic price & quantity checks.',
    pkgProTitle: 'Professional Audit',
    pkgProPrice: 'CHF 1,290 / month',
    pkgProDesc: 'For growing enterprises with up to 1,000 invoices / month. Includes AI anomaly detection & dispute templates.',
    pkgEnterpriseTitle: 'Enterprise Complete',
    pkgEnterprisePrice: 'Custom Quote',
    pkgEnterpriseDesc: 'For large corporations with direct ERP integration (SAP, Abacus) and dedicated audit specialist.',
    pkgPopularBadge: 'Most Popular',

    calcEyebrow: 'Interactive Savings Calculator',
    calcTitle: 'Calculate Your Potential Loss Recovery',
    calcLead: 'Estimate your annual recoverable savings based on benchmark error rates in B2B supplier invoices.',
    calcInvoiceVolume: 'Monthly Invoice Volume (count):',
    calcAvgAmount: 'Average Invoice Value (CHF):',
    calcErrorRate: 'Estimated Discrepancy Rate (%):',
    calcHourlyRate: 'Internal Verification Hourly Cost (CHF):',
    calcEstLoss: 'Identified Annual Recovery Potential',
    calcHoursSaved: 'Audit Hours Saved / Year',
    calcNetRoi: 'Estimated Net ROI',
    calcApplyButton: 'Request Audit with these Values →',

    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'Key Answers Before You Request.',
    faqLead: 'A quick overview to help you decide if an audit is right for your organization.',
    faqQ1: 'Which invoices can be audited?',
    faqA1: 'We audit all B2B supplier invoices and cross-check them against POs, delivery notes, and contracts.',
    faqQ2: 'What do I need for an initial request?',
    faqA2: 'A brief description of your invoice volume is sufficient. We discuss exact details personally.',
    faqQ3: 'Who decides on supplier disputes?',
    faqA3: 'You maintain full control. We document findings transparently and prepare dispute materials for you.',
    faqQ4: 'How do I get started?',
    faqA4: 'Email us at info@klarsolution.com or call +41 44 589 72 88.',

    ctaEyebrow: 'Request Audit',
    ctaTitle: 'Have Your Supplier Invoices Audited.',
    ctaText: 'Describe your situation or send a sample case. Scope and terms will be discussed individually with you.',
    ctaButton: 'Request Review',
    contactEyebrow: 'Contact',
    contactTitle: 'Request an Audit Review',
    contactLead: 'Call us, email us, or fill out the form. We will reach out within one business day.',
    contactDirectTitle: 'Direct Contact',
    contactFormTitle: 'I want to request an invoice audit',
    contactFormHint: 'Brief information is enough – we will get back to you.',
    labelName: 'Name (optional)',
    labelEmail: 'Your Email *',
    labelMessage: 'Message (optional)',
    labelNdaConsent: 'I accept the Non-Disclosure Agreement (NDA).',
    btnSubmitQuote: 'Request Review →',
    formSubmitting: 'Sending…',
    formSuccessMsg: '✓ Thank you! Your request has been sent to our team. We will respond within one business day.',
    formFooterNote: 'Your data is strictly used for contacting you regarding this inquiry.',

    chatTitle: 'Klara',
    chatSub: 'KlarSolution AI Assistant',
    chatWelcome: 'Hello 👋 I am Klara from KlarSolution. We review supplier invoices for overcharges, price variances, quantity mistakes and duplicate billing. Let me know how I can help!',
    chatChip1: 'What do you audit?',
    chatChip2: 'What is my benefit?',
    chatChip3: 'How does it work?',
    chatChip4: 'What does it cost?',
    chatChip5: 'Request audit review',
    chatPlaceholder: 'Ask Klara a question...',
    chatSendBtn: '→',
    chatEmailPrompt: 'Would you like a direct follow-up? Leave your email address below:',
    chatEmailSubmit: 'Send',
    chatEmailSuccess: 'Thank you! We received your email request.',

    footerCopyright: '© 2026 klar solution – All Rights Reserved',
    footerSwitzerland: 'Switzerland 🇨🇭',
    legalDatenschutzTitle: 'PRIVACY POLICY',
    legalNdaTitle: 'NON-DISCLOSURE AGREEMENT (NDA)',
    legalCompanyTitle: 'COMPANY IMPRESSUM',

    dashTitle: 'Audit Analytics & Recovery Portal',
    dashSubtitle: 'KlarSolution B2B Cockpit – Real-time tracking of invoice audits, price variances & supplier risks',
    dashTabOverview: 'Overview',
    dashTabInvoices: 'Invoice Center',
    dashTabScanner: 'AI Invoice Scanner',
    dashTabDisputes: 'Dispute Hub',
    dashTabSuppliers: 'Supplier Risk',
    dashTabSettings: 'Integrations & Settings',
    dashTotalAudited: 'Invoices Audited',
    dashRecoveredLosses: 'Overcharges Identified',
    dashActiveDiscrepancies: 'Open Discrepancies',
    dashAuditEfficiency: 'Audit Accuracy Rate',
    dashRecentInvoices: 'Recent Invoice Audits',
    dashUploadInvoice: 'Upload Invoice',
    dashRunAiScanner: 'Start AI Scan',
    dashDiscrepancyType: 'Discrepancy Type',
    dashRiskLevel: 'Risk Level',
    dashStatus: 'Status',
    dashAction: 'Action',
    dashFilterAll: 'All Invoices',
    dashFilterDiscrepancy: 'Discrepancies',
    dashFilterApproved: 'Approved',
    dashGenerateLetter: 'Generate Claim Letter',
    dashCopyLetter: 'Copy Text',
    dashLetterCopied: 'Copied!',
    dashSupplierName: 'Supplier Name',
    dashTotalOvercharge: 'Total Overcharges',
    dashErrorRate: 'Error Rate',
    dashErpConnected: 'ERP Connected',
    dashExportFilteredCsv: 'Export Filtered Invoices (CSV)',
    dashExportDiscrepanciesCsv: 'Export Flagged Discrepancies & Line-Items (CSV)',
    dashExportSuccess: 'CSV audit report exported successfully',
    dashExportOptions: 'Export Options',
    dashExportSingleInvoice: 'Export this invoice as CSV',

    dashTabAdmin: 'Admin Portal',
    adminSecurityGate: 'Swiss Bank-Grade Security Console',
    adminTitle: 'Admin Governance & Security Control',
    adminSubtitle: 'Manage system permissions, customize automated audit tolerance rules, inspect compliance logs, and govern user roles across your enterprise.',
    adminSignIn: 'Sign In to Admin Portal',
    adminUsersTitle: 'User Access & Permissions Management',
    adminUsersSubtitle: 'Active compliance team accounts and role authorizations',
    adminAddUser: 'Invite Compliance Officer',
    adminSearchUser: 'Search users by name, email, or department...',
    adminRulesTitle: 'Audit Tolerance Engine',
    adminRulesSubtitle: 'Configure AI discrepancy threshold and auto-flag parameters',
    adminMaxTolerance: 'Max Discrepancy Tolerance',
    adminAutoFlagDuplicates: 'Auto-Flag Duplicate Invoices',
    adminStrictVat: 'Strict Swiss VAT 8.1% Verification',
    adminDualSignoff: 'Require Senior Sign-off > CHF 5,000',
    adminSavePolicies: 'Save Governance Rules',
    adminSystemHealth: 'System Diagnostics',
    adminSecurityLogs: 'Security & Compliance Audit Trail',
    adminLogsSubtitle: 'Immutable system events and user security logs',
    adminAuthSuccess: 'Admin session successfully authenticated.',
    adminPolicyUpdated: 'Audit tolerance policies updated successfully.',
    adminModalTitle: 'Admin Security Portal',
    adminModalSubtitle: 'Authenticate with enterprise credentials to access governance features.',
    adminEmailLabel: 'Enterprise Email',
    adminPasswordLabel: 'Security Token / Password',
    adminRoleLabel: 'Select Authorization Role',
    adminAuthenticate: 'Authenticate Session',
    adminInviteUserTitle: 'Invite Compliance Officer',
    adminInviteUserSubtitle: 'Grant role-based access to your enterprise audit portal.',
  },

  fr: {
    skipToContent: 'Aller au contenu',
    brandTagline: 'Audit des pertes de coûts pour entreprises',
    navWhyAudit: 'Pourquoi auditer',
    navWhatWeAudit: 'Ce que nous vérifions',
    navBenefits: 'Vos avantages',
    navProcess: 'Déroulement',
    navPricing: 'Conditions',
    navContact: 'Contact',
    navFaq: 'FAQ',
    navPhone: '+41 44 589 72 88',
    requestReview: 'Demander un audit',
    launchPortal: 'Espace Client',
    backToLanding: 'Accueil',

    marquee1: 'Audit de factures fournisseurs – nous vérifions vos factures pour éviter les surcoûts inutiles',
    marquee2: 'Double facturation · Écarts de prix · Erreurs de quantité · Erreurs de TVA',

    heroEyebrow: 'Contrôle des factures fournisseurs',
    heroHeading1: 'Audit de pertes de coûts',
    heroHeadingAccent: '',
    heroHeading2: 'pour entreprises',
    heroLead: 'Nous vérifions vos factures fournisseurs (doublons, écarts de prix, erreurs de quantité) pour que vous ne payiez que ce qui est réellement dû.',
    heroCtaPrimary: 'Demander un audit →',
    heroCtaSecondary: 'Ce que nous vérifions ›',
    trustNoObligation: '✓ Demande sans engagement',
    trustSwissCompany: '✓ Entreprise suisse',
    trustDocumentedFindings: '✓ Constats documentés et clairs',
    trustYouDecide: '✓ Vous décidez des étapes suivantes',

    sampleTitle: 'Exemple: Écart de prix',
    sampleBadge: 'Exemple fictif',
    samplePoAmount: 'Commande – montant convenu',
    sampleInvoiceAmount: 'Facture – montant facturé',
    sampleVarianceFound: '⚠ Écart détecté',
    sampleNote: 'Exemple simplifié pour illustrer le principe de vérification.',

    thoroughEyebrow: 'Audit pour entreprises',
    thoroughTitle: 'Contrôle approfondi de vos ',
    thoroughTitleAccent: 'factures fournisseurs',
    thoroughText: 'Nous comparons vos factures fournisseurs avec les bons de commande, bons de livraison et contrats pour documenter chaque écart.',

    whyEyebrow: 'Pourquoi auditer ?',
    whyTitleLine1: 'Les erreurs de facturation ne sautent pas toujours aux yeux.',
    whyTitleLine2: 'Elles coûtent néanmoins de l’argent.',
    whyLead: 'Au quotidien, il manque souvent du temps pour vérifier chaque ligne de facture. Les écarts passent inaperçus et augmentent vos coûts.',
    whyReason1Title: 'Beaucoup de factures, peu de temps',
    whyReason1Text: 'Toutes les positions ne sont pas comparées à la livraison.',
    whyReason2Title: 'Changement de conditions',
    whyReason2Text: 'Les prix facturés diffèrent parfois des contrats.',
    whyReason3Title: 'Répétition des erreurs',
    whyReason3Text: 'Un mauvais prix peut impacter toutes les factures suivantes.',
    whyReason4Title: 'Doublons de facturation',
    whyReason4Text: 'Des factures payées sont parfois soumises deux fois.',
    whyImpactTitle: 'Conséquences des erreurs non détectées',
    whyImpact1Title: 'Surpaiements',
    whyImpact1Text: 'Des montants trop élevés ou injustifiés sont réglés.',
    whyImpact2Title: 'Clarifications complexes',
    whyImpact2Text: 'Plus le délai passe, plus la contestation est difficile.',
    whyImpact3Title: 'Coûts récurrents élevés',
    whyImpact3Text: 'Des erreurs systématiques pèsent lourd sur le budget.',

    whatEyebrow: 'Ce que nous contrôlons',
    whatTitle: 'Détecter les erreurs et économiser.',
    whatLead: 'Nous analysons minutieusement vos factures fournisseurs pour identifier les anomalies suivantes.',
    pillar1Title: 'Doublons de facturation',
    pillar1Text: 'Même prestation facturée plusieurs fois.',
    pillar2Title: 'Écarts de prix',
    pillar2Text: 'Prix facturés supérieurs aux tarifs convenus.',
    pillar3Title: 'Erreurs de quantité',
    pillar3Text: 'Quantités facturées ne correspondant pas au bon de livraison.',
    pillar4Title: 'Erreurs de calcul & TVA',
    pillar4Text: 'Taux de TVA inexacts ou erreurs de somme.',
    pillar5Title: 'Conditions contractuelles',
    pillar5Text: 'Non-respect des remises et conditions négociées.',
    docMatchTitle: 'Rapprochement documentaire',
    docMatchText: 'Nous rapprochons vos factures avec tous vos documents d’achat.',
    docMatch1Title: 'Commandes',
    docMatch1Text: 'Vérification des prix et quantités commandées.',
    docMatch2Title: 'Bons de livraison',
    docMatch2Text: 'Contrôle des marchandises réellement reçues.',
    docMatch3Title: 'Contrats',
    docMatch3Text: 'Validation des remises et conditions spécifiques.',
    docMatch4Title: 'Rapports d’audit',
    docMatch4Text: 'Chaque anomalie est étayée par les pièces justificatives.',

    benefitEyebrow: 'Vos Avantages',
    benefitTitle: 'Ne payez que ce que vous devez.',
    benefitLead: 'L’audit révèle exactement où se situent les écarts. Les économies réalisées dépendent de votre volume de factures.',
    benefitCard1Title: 'Identifier les surcoûts',
    benefitCard1Text: 'Visualisez les factures surfacturées ou répétées.',
    benefitCard2Title: 'Réduire les dépenses',
    benefitCard2Text: 'Réglez les litiges avec les fournisseurs et évitez les erreurs futures.',
    benefitCard3Title: 'Preuves incontestables',
    benefitCard3Text: 'Tous les écarts sont documentés avec précision.',

    processEyebrow: 'Déroulement',
    processTitle: 'De la demande au rapport.',
    step1Title: 'Demande',
    step1Text: 'Vous prenez contact avec nous.',
    step2Title: 'Documents',
    step2Text: 'Vous transmettez vos factures et justificatifs.',
    step3Title: 'Audit',
    step3Text: 'Nous procédons à la vérification systématique.',
    step4Title: 'Rapport',
    step4Text: 'Les anomalies sont documentées clairement.',
    step5Title: 'Décision',
    step5Text: 'Vous décidez des réclamations à lancer.',
    examplePanelTitle: 'Exemple fictif: Erreur de quantité',
    findingPanelTitle: 'Exemple de constat d’audit',
    findingBadge: 'CONSTAT',
    findingText: 'La facture compte 20 articles de plus que ce qui a été livré.',
    nextStepsTitle: 'Étapes suivantes',
    nextStepsText: 'Contacter le fournisseur et demander un avoir. La décision vous appartient.',

    pricingEyebrow: 'Forfaits & Tarifs',
    pricingTitle: 'Forfaits d’audit adaptés à votre entreprise',
    pricingLead: 'Choisissez la formule correspondant à votre volume mensuel de factures.',
    pkgStarterTitle: 'Audit Starter',
    pkgStarterPrice: 'CHF 490 / mois',
    pkgStarterDesc: 'Idéal pour PME jusqu’à 200 factures / mois. Inclus le contrôle prix et quantité.',
    pkgProTitle: 'Audit Professionnel',
    pkgProPrice: 'CHF 1 290 / mois',
    pkgProDesc: 'Pour entreprises jusqu’à 1 000 factures / mois. Détection d’anomalies par IA & lettres de litige.',
    pkgEnterpriseTitle: 'Enterprise Sur-Mesure',
    pkgEnterprisePrice: 'Sur devis',
    pkgEnterpriseDesc: 'Connexion directe ERP (SAP, Abacus) et auditeur dédié.',
    pkgPopularBadge: 'Plus populaire',

    calcEyebrow: 'Calculateur d’Économies',
    calcTitle: 'Calculez votre potentiel de récupération',
    calcLead: 'Estimez vos économies annuelles selon les taux d’erreur moyens observés.',
    calcInvoiceVolume: 'Volume mensuel de factures (nombre):',
    calcAvgAmount: 'Montant moyen par facture (CHF):',
    calcErrorRate: 'Taux d’erreur estimé (%):',
    calcHourlyRate: 'Coût horaire interne de contrôle (CHF):',
    calcEstLoss: 'Économies potentielles identifiées / an',
    calcHoursSaved: 'Heures de contrôle économisées / an',
    calcNetRoi: 'ROI Net estimé',
    calcApplyButton: 'Demander un audit avec ces chiffres →',

    faqEyebrow: 'Foire Aux Questions',
    faqTitle: 'Vos questions les plus fréquentes.',
    faqLead: 'Un aperçu rapide pour vous aider à décider.',
    faqQ1: 'Quelles factures peuvent être contrôlées ?',
    faqA1: 'Toutes les factures fournisseurs B2B avec leurs bons de commande et livraison.',
    faqQ2: 'Que faut-il pour démarrer ?',
    faqA2: 'Une brève description de votre volume de factures suffit.',
    faqQ3: 'Qui gère les litiges fournisseurs ?',
    faqA3: 'Vous gardez le contrôle total. Nous préparons les dossiers de contestation.',
    faqQ4: 'Comment nous contacter ?',
    faqA4: 'Par email à info@klarsolution.com ou téléphone au +41 44 589 72 88.',

    ctaEyebrow: 'Demander un audit',
    ctaTitle: 'Faites vérifier vos factures fournisseurs.',
    ctaText: 'Décrivez votre situation. Nous discuterons des conditions de manière personnalisée.',
    ctaButton: 'Demander un audit',
    contactEyebrow: 'Contact',
    contactTitle: 'Demande de vérification',
    contactLead: 'Appelez-nous ou remplissez le formulaire ci-dessous.',
    contactDirectTitle: 'Contact Direct',
    contactFormTitle: 'Demander un contrôle de factures',
    contactFormHint: 'Informations sommaires suffisantes.',
    labelName: 'Nom (optionnel)',
    labelEmail: 'Votre Email *',
    labelMessage: 'Message (optionnel)',
    labelNdaConsent: 'J’accepte l’accord de confidentialité (NDA).',
    btnSubmitQuote: 'Envoyer ma demande →',
    formSubmitting: 'Envoi en cours…',
    formSuccessMsg: '✓ Merci ! Votre demande a été transmise à notre équipe.',
    formFooterNote: 'Vos données sont utilisées exclusivement pour vous recontacter.',

    chatTitle: 'Klara',
    chatSub: 'Assistante KlarSolution',
    chatWelcome: 'Bonjour 👋 Je suis Klara de KlarSolution. Nous contrôlons vos factures fournisseurs pour éliminer les surcoûts. Comment puis-je vous aider ?',
    chatChip1: 'Que vérifiez-vous ?',
    chatChip2: 'Quel est mon bénéfice ?',
    chatChip3: 'Comment ça marche ?',
    chatChip4: 'Combien ça coûte ?',
    chatChip5: 'Demander un audit',
    chatPlaceholder: 'Posez votre question...',
    chatSendBtn: '→',
    chatEmailPrompt: 'Souhaitez-vous être recontacté directement ? Laissez votre email :',
    chatEmailSubmit: 'Envoyer',
    chatEmailSuccess: 'Merci ! Nous avons bien reçu votre email.',

    footerCopyright: '© 2026 klar solution – Tous droits réservés',
    footerSwitzerland: 'Suisse 🇨🇭',
    legalDatenschutzTitle: 'PROTECTION DES DONNÉES',
    legalNdaTitle: 'ACCORD DE CONFIDENTIALITÉ (NDA)',
    legalCompanyTitle: 'INFORMATIONS ÉDITEUR',

    dashTitle: 'Portail d’Audit & Analyse B2B',
    dashSubtitle: 'Cockpit KlarSolution – Suivi en temps réel des audits de factures et erreurs fournisseurs',
    dashTabOverview: 'Vue générale',
    dashTabInvoices: 'Centre de Factures',
    dashTabScanner: 'Scanner IA',
    dashTabDisputes: 'Litiges & Avoir',
    dashTabSuppliers: 'Risque Fournisseur',
    dashTabSettings: 'Intégrations ERP',
    dashTotalAudited: 'Factures contrôlées',
    dashRecoveredLosses: 'Surfacturations identifiées',
    dashActiveDiscrepancies: 'Anomalies ouvertes',
    dashAuditEfficiency: 'Taux de précision',
    dashRecentInvoices: 'Audits récents',
    dashUploadInvoice: 'Importer une facture',
    dashRunAiScanner: 'Lancer le scanner IA',
    dashDiscrepancyType: 'Type d’anomalie',
    dashRiskLevel: 'Niveau de risque',
    dashStatus: 'Statut',
    dashAction: 'Action',
    dashFilterAll: 'Toutes les factures',
    dashFilterDiscrepancy: 'Avec anomalie',
    dashFilterApproved: 'Validées',
    dashGenerateLetter: 'Générer réclamation',
    dashCopyLetter: 'Copier texte',
    dashLetterCopied: 'Copié !',
    dashSupplierName: 'Fournisseur',
    dashTotalOvercharge: 'Surfacturation totale',
    dashErrorRate: 'Taux d’erreur',
    dashErpConnected: 'ERP Connecté',
    dashExportFilteredCsv: 'Exporter les factures filtrées (CSV)',
    dashExportDiscrepanciesCsv: 'Exporter les anomalies & lignes (CSV)',
    dashExportSuccess: 'Rapport CSV exporté avec succès',
    dashExportOptions: 'Options d’export',
    dashExportSingleInvoice: 'Exporter cette facture en CSV',

    dashTabAdmin: 'Portail Admin',
    adminSecurityGate: 'Console de sécurité standard bancaire suisse',
    adminTitle: 'Gouvernance & Contrôle de Sécurité Admin',
    adminSubtitle: 'Gérez les autorisations, définissez les seuils de tolérance d’audit, contrôlez les journaux de conformité et attribuez les rôles.',
    adminSignIn: 'Se connecter au Portail Admin',
    adminUsersTitle: 'Gestion des Accès & Rôles',
    adminUsersSubtitle: 'Comptes d’équipe de conformité actifs et autorisations',
    adminAddUser: 'Inviter un auditeur de conformité',
    adminSearchUser: 'Rechercher un utilisateur par nom, e-mail...',
    adminRulesTitle: 'Règles de Tolérance d’Audit',
    adminRulesSubtitle: 'Configurer le seuil d’anomalie IA et les paramètres automatiques',
    adminMaxTolerance: 'Seuil maximal de tolérance',
    adminAutoFlagDuplicates: 'Signaler automatiquement les doublons',
    adminStrictVat: 'Vérification stricte de la TVA suisse (8.1%)',
    adminDualSignoff: 'Double signature requise > 5 000 CHF',
    adminSavePolicies: 'Enregistrer les règles de gouvernance',
    adminSystemHealth: 'Diagnostics Système',
    adminSecurityLogs: 'Journal d’Audit & Sécurité',
    adminLogsSubtitle: 'Événements système inaltérables et sécurité des utilisateurs',
    adminAuthSuccess: 'Session administrateur authentifiée avec succès.',
    adminPolicyUpdated: 'Règles de tolérance mises à jour.',
    adminModalTitle: 'Portail de Sécurité Admin',
    adminModalSubtitle: 'Authentifiez-vous pour accéder aux fonctions de gouvernance.',
    adminEmailLabel: 'E-mail professionnel',
    adminPasswordLabel: 'Jeton de sécurité / Mot de passe',
    adminRoleLabel: 'Rôle d’autorisation',
    adminAuthenticate: 'Authentifier la session',
    adminInviteUserTitle: 'Inviter un auditeur',
    adminInviteUserSubtitle: 'Accordez un accès basé sur les rôles à votre portail.',
  },

  it: {
    skipToContent: 'Vai al contenuto',
    brandTagline: 'Audit delle perdite di costo per aziende',
    navWhyAudit: 'Perché verificare',
    navWhatWeAudit: 'Cosa verifichiamo',
    navBenefits: 'I tuoi vantaggi',
    navProcess: 'Procedimento',
    navPricing: 'Condizioni',
    navContact: 'Contatto',
    navFaq: 'FAQ',
    navPhone: '+41 44 589 72 88',
    requestReview: 'Richiedi verifica',
    launchPortal: 'Portale Clienti',
    backToLanding: 'Torna alla pagina iniziale',

    marquee1: 'Audit delle fatture fornitori – verifichiamo i costi evtabili per la tua azienda',
    marquee2: 'Doppia fatturazione · Errori di prezzo · Errori di quantità · Errori IVA',

    heroEyebrow: 'Verifica fatture fornitori',
    heroHeading1: 'Audit perdite di costo',
    heroHeadingAccent: '',
    heroHeading2: 'per aziende',
    heroLead: 'Verifichiamo le fatture dei fornitori per doppi addebiti, errori di prezzo e di quantità, per farvi pagare solo ciò che è realmente dovuto.',
    heroCtaPrimary: 'Richiedi verifica →',
    heroCtaSecondary: 'Cosa verifichiamo ›',
    trustNoObligation: '✓ Richiesta non vincolante',
    trustSwissCompany: '✓ Azienda svizzera',
    trustDocumentedFindings: '✓ Risultati documentati e chiari',
    trustYouDecide: '✓ Decidi tu i prossimi passi',

    sampleTitle: 'Esempio: Errore di prezzo',
    sampleBadge: 'Esempio fittizio',
    samplePoAmount: 'Ordine – importo pattuito',
    sampleInvoiceAmount: 'Fattura – importo addebitato',
    sampleVarianceFound: '⚠ Anomalia riscontrata',
    sampleNote: 'Esempio semplificato per illustrare il principio di controllo.',

    thoroughEyebrow: 'Audit per aziende',
    thoroughTitle: 'Controllo approfondito delle tue ',
    thoroughTitleAccent: 'fatture fornitori',
    thoroughText: 'Confrontiamo le fatture dei fornitori con ordini d’acquisto, bolle di consegna e contratti.',

    whyEyebrow: 'Perché svolgere l’audit ?',
    whyTitleLine1: 'Gli errori di fatturazione non sempre si notano.',
    whyTitleLine2: 'Ciononostante costano denaro.',
    whyLead: 'Nel lavoro quotidiano raramente c’è tempo per verificare ogni fattura nel dettaglio.',
    whyReason1Title: 'Molte fatture, poco tempo',
    whyReason1Text: 'Non ogni singola voce viene confrontata con l’ordine.',
    whyReason2Title: 'Cambio di condizioni',
    whyReason2Text: 'I prezzi fatturati non sempre coincidono con i contratti.',
    whyReason3Title: 'Gli errori si ripetono',
    whyReason3Text: 'Un prezzo errato incide su tutte le fatture successive.',
    whyReason4Title: 'Doppi addebiti',
    whyReason4Text: 'Fatture già saldate possono essere rinviate.',
    whyImpactTitle: 'Conseguenze degli errori non rilevati',
    whyImpact1Title: 'Pagamenti eccessivi',
    whyImpact1Text: 'Si pagano importi non dovuti o duplicati.',
    whyImpact2Title: 'Chiarimenti complessi',
    whyImpact2Text: 'Più tempo passa, più è difficile contestare l’importo.',
    whyImpact3Title: 'Costi ricorrenti elevati',
    whyImpact3Text: 'Errori sistematici aumentano le spese nel tempo.',

    whatEyebrow: 'Cosa verifichiamo',
    whatTitle: 'Individuare gli errori e risparmiare.',
    whatLead: 'Analizziamo accuratamente le vostre fatture fornitori per rilevare le seguenti anomalie.',
    pillar1Title: 'Doppia fatturazione',
    pillar1Text: 'Stessa prestazione addebitata più volte.',
    pillar2Title: 'Errori di prezzo',
    pillar2Text: 'Prezzi superiori agli accordi presi.',
    pillar3Title: 'Errori di quantità',
    pillar3Text: 'Quantità fatturate superiori alla bolla di consegna.',
    pillar4Title: 'Errori di calcolo & IVA',
    pillar4Text: 'Aliquota IVA errata o somme sbagliate.',
    pillar5Title: 'Condizioni contrattuali',
    pillar5Text: 'Mancata applicazione degli sconti pattuiti.',
    docMatchTitle: 'Riconciliazione documentale',
    docMatchText: 'Riconciliamo le fatture con tutti i vostri documenti d’acquisto.',
    docMatch1Title: 'Ordini d’acquisto',
    docMatch1Text: 'Confronto dei prezzi e delle quantità ordinate.',
    docMatch2Title: 'Bolle di consegna',
    docMatch2Text: 'Verifica della merce effettivamente ricevuta.',
    docMatch3Title: 'Contratti',
    docMatch3Text: 'Controllo degli sconti e delle condizioni pattuite.',
    docMatch4Title: 'Rapporti d’audit',
    docMatch4Text: 'Ogni anomalia è supportata dalle pezze d’appoggio.',

    benefitEyebrow: 'I tuoi Vantaggi',
    benefitTitle: 'Paga solo quello che devi.',
    benefitLead: 'L’audit evidenzia gli errori di fatturazione. Il risparmio effettivo dipende dai vostri volumi.',
    benefitCard1Title: 'Riconoscere i costi ingiustificati',
    benefitCard1Text: 'Visualizza subito i doppi addebiti o i prezzi errati.',
    benefitCard2Title: 'Ridurre le spese inutili',
    benefitCard2Text: 'Chiarisci le contestazioni con i fornitori ed evita errori futuri.',
    benefitCard3Title: 'Report chiari e documentati',
    benefitCard3Text: 'Tutte le anomalie sono tracciate con le relative fatture.',

    processEyebrow: 'Procedimento',
    processTitle: 'Dalla richiesta al report d’audit.',
    step1Title: 'Richiesta',
    step1Text: 'Ci contatti direttamente.',
    step2Title: 'Documenti',
    step2Text: 'Invia le fatture ed i relativi giustificativi.',
    step3Title: 'Audit',
    step3Text: 'Procediamo al controllo sistematico.',
    step4Title: 'Risultato',
    step4Text: 'Le anomalie vengono documentate.',
    step5Title: 'Decisione',
    step5Text: 'Decidi se procedere con la contestazione.',
    examplePanelTitle: 'Esempio fittizio: Errore di quantità',
    findingPanelTitle: 'Esempio di reperto d’audit',
    findingBadge: 'REPERTO',
    findingText: 'In fattura figurano 20 pezzi in più rispetto a quelli consegnati.',
    nextStepsTitle: 'Prossimi passi',
    nextStepsText: 'Contattare il fornitore e richiedere la nota di credito.',

    pricingEyebrow: 'Pacchetti & Tariffe',
    pricingTitle: 'Piani di audit adatti a ogni dimensione aziendale',
    pricingLead: 'Scegli il contingente ideale per il tuo volume di fatture ricorrenti.',
    pkgStarterTitle: 'Audit Starter',
    pkgStarterPrice: 'CHF 490 / mese',
    pkgStarterDesc: 'Per PMI fino a 200 fatture / mese. Include controllo prezzi e quantità.',
    pkgProTitle: 'Audit Professional',
    pkgProPrice: 'CHF 1,290 / mese',
    pkgProDesc: 'Per aziende fino a 1.000 fatture / mese. Include rilevamento anomalie con IA.',
    pkgEnterpriseTitle: 'Enterprise Completo',
    pkgEnterprisePrice: 'Su misura',
    pkgEnterpriseDesc: 'Integrazione diretta ERP (SAP, Abacus) ed auditor dedicato.',
    pkgPopularBadge: 'Più richiesto',

    calcEyebrow: 'Calcolatore di Risparmio',
    calcTitle: 'Calcola il tuo potenziale di recupero',
    calcLead: 'Stima il tuo risparmio annuo basato sui tassi di errore medi del settore B2B.',
    calcInvoiceVolume: 'Volume mensile di fatture (numero):',
    calcAvgAmount: 'Importo medio per fattura (CHF):',
    calcErrorRate: 'Tasso di errore stimato (%):',
    calcHourlyRate: 'Costo orario interno di controllo (CHF):',
    calcEstLoss: 'Risparmio annuo potenziale identificato',
    calcHoursSaved: 'Ore di controllo risparmiate / anno',
    calcNetRoi: 'ROI Netto stimato',
    calcApplyButton: 'Richiedi la verifica con questi dati →',

    faqEyebrow: 'Domande Frequenti',
    faqTitle: 'Le risposte alle domande principali.',
    faqLead: 'Una panoramica rapida per aiutarti a scegliere.',
    faqQ1: 'Quali fatture possono essere controllate?',
    faqA1: 'Tutte le fatture fornitori B2B incrociate con ordini e bolle.',
    faqQ2: 'Cosa serve per iniziare?',
    faqA2: 'È sufficiente una breve descrizione del volume di fatture.',
    faqQ3: 'Chi gestisce le contestazioni con i fornitori?',
    faqA3: 'Mantenete sempre il controllo finale. Noi prepariamo i documenti.',
    faqQ4: 'Come posso contattarvi?',
    faqA4: 'Via email a info@klarsolution.com o al +41 44 589 72 88.',

    ctaEyebrow: 'Richiedi verifica',
    ctaTitle: 'Fai verificare le tue fatture fornitori.',
    ctaText: 'Descrivi la tua situazione. Discuteremo i dettagli di persona.',
    ctaButton: 'Richiedi verifica',
    contactEyebrow: 'Contatto',
    contactTitle: 'Richiesta di controllo',
    contactLead: 'Chiamaci o compila il modulo sottostante.',
    contactDirectTitle: 'Contatto Diretto',
    contactFormTitle: 'Desidero richiedere un audit',
    contactFormHint: 'Pochi dati sono sufficienti.',
    labelName: 'Nome (opzionale)',
    labelEmail: 'La tua Email *',
    labelMessage: 'Messaggio (opzionale)',
    labelNdaConsent: 'Accetto l’accordo di riservatezza (NDA).',
    btnSubmitQuote: 'Invia la richiesta →',
    formSubmitting: 'Invio in corso…',
    formSuccessMsg: '✓ Grazie! La tua richiesta è stata inviata al nostro team.',
    formFooterNote: 'I tuoi dati saranno usati unicamente per ricontattarti.',

    chatTitle: 'Klara',
    chatSub: 'Assistente KlarSolution',
    chatWelcome: 'Buongiorno 👋 Sono Klara di KlarSolution. Verifichiamo le fatture dei fornitori per eliminare i costi imprevisti. Come posso aiutarti?',
    chatChip1: 'Cosa verificate?',
    chatChip2: 'Qual è il mio vantaggio?',
    chatChip3: 'Come funziona?',
    chatChip4: 'Quanto costa?',
    chatChip5: 'Richiedi verifica',
    chatPlaceholder: 'Scrivi la tua domanda...',
    chatSendBtn: '→',
    chatEmailPrompt: 'Vuoi essere ricontattato direttamente? Lascia la tua email:',
    chatEmailSubmit: 'Invia',
    chatEmailSuccess: 'Grazie! Abbiamo ricevuto la tua email.',

    footerCopyright: '© 2026 klar solution – Tutti i diritti riservati',
    footerSwitzerland: 'Svizzera 🇨🇭',
    legalDatenschutzTitle: 'PROTEZIONE DEI DATI',
    legalNdaTitle: 'ACCORDO DI RISERVATEZZA (NDA)',
    legalCompanyTitle: 'INFORMAZIONI SOCIETARIE',

    dashTitle: 'Portale Audit & Analytics B2B',
    dashSubtitle: 'Cockpit KlarSolution – Monitoraggio in tempo reale degli audit di fattura e anomalie fornitori',
    dashTabOverview: 'Panoramica',
    dashTabInvoices: 'Centro Fatture',
    dashTabScanner: 'Scanner IA',
    dashTabDisputes: 'Gestione Contestazioni',
    dashTabSuppliers: 'Rischio Fornitore',
    dashTabSettings: 'Integrazioni ERP',
    dashTotalAudited: 'Fatture controllate',
    dashRecoveredLosses: 'Sovrapprezzi individuati',
    dashActiveDiscrepancies: 'Anomalie aperte',
    dashAuditEfficiency: 'Tasso di accuratezza',
    dashRecentInvoices: 'Audit recenti',
    dashUploadInvoice: 'Carica fattura',
    dashRunAiScanner: 'Avvia Scanner IA',
    dashDiscrepancyType: 'Tipo di anomalia',
    dashRiskLevel: 'Livello di rischio',
    dashStatus: 'Stato',
    dashAction: 'Azione',
    dashFilterAll: 'Tutte le fatture',
    dashFilterDiscrepancy: 'Con anomalie',
    dashFilterApproved: 'Approvate',
    dashGenerateLetter: 'Genera contestazione',
    dashCopyLetter: 'Copia testo',
    dashLetterCopied: 'Copiato!',
    dashSupplierName: 'Fornitore',
    dashTotalOvercharge: 'Sovrapprezzo totale',
    dashErrorRate: 'Tasso di errore',
    dashErpConnected: 'ERP Connesso',
    dashExportFilteredCsv: 'Esporta fatture filtrate (CSV)',
    dashExportDiscrepanciesCsv: 'Esporta anomalie e dettagli voci (CSV)',
    dashExportSuccess: 'Report CSV esportato con successo',
    dashExportOptions: 'Opzioni di esportazione',
    dashExportSingleInvoice: 'Esporta questa fattura in CSV',

    dashTabAdmin: 'Portale Admin',
    adminSecurityGate: 'Console di Sicurezza Standard Bancario Svizzero',
    adminTitle: 'Governance Amministrativa & Sicurezza',
    adminSubtitle: 'Gestisci le autorizzazioni utente, configura le soglie di tolleranza di audit e monitora i registri di conformità.',
    adminSignIn: 'Accedi al Portale Admin',
    adminUsersTitle: 'Gestione Accessi & Autorizzazioni Utente',
    adminUsersSubtitle: 'Account attivi del team di conformità e autorizzazioni di ruolo',
    adminAddUser: 'Invita Auditor di Conformità',
    adminSearchUser: 'Cerca utenti per nome, email o reparto...',
    adminRulesTitle: 'Regole di Tolleranza Audit',
    adminRulesSubtitle: 'Configura la soglia di anomalia IA e i parametri di segnalazione',
    adminMaxTolerance: 'Tolleranza massima anomalia',
    adminAutoFlagDuplicates: 'Segnala automaticamente fatture duplicate',
    adminStrictVat: 'Verifica rigorosa IVA Svizzera 8.1%',
    adminDualSignoff: 'Doppia firma richiesta > CHF 5.000',
    adminSavePolicies: 'Salva Regole di Governance',
    adminSystemHealth: 'Diagnostica di Sistema',
    adminSecurityLogs: 'Registro di Audit & Sicurezza',
    adminLogsSubtitle: 'Eventi di sistema inalterabili e registro di sicurezza',
    adminAuthSuccess: 'Sessione amministratore autenticata con successo.',
    adminPolicyUpdated: 'Regole di tolleranza aggiornate con successo.',
    adminModalTitle: 'Portale Sicurezza Admin',
    adminModalSubtitle: 'Autenticati con le credenziali aziendali per accedere alla governance.',
    adminEmailLabel: 'Email aziendale',
    adminPasswordLabel: 'Token di sicurezza / Password',
    adminRoleLabel: 'Seleziona ruolo di autorizzazione',
    adminAuthenticate: 'Autentica Sessione',
    adminInviteUserTitle: 'Invita Auditor',
    adminInviteUserSubtitle: 'Concedi l\'accesso basato sui ruoli al portale aziendale.',
  },

  ar: {
    skipToContent: 'الانتقال إلى المحتوى',
    brandTagline: 'تدقيق الخسائر المالية للفواتير التجارية',
    navWhyAudit: 'لماذا التدقيق',
    navWhatWeAudit: 'ما نتحقق منه',
    navBenefits: 'فوائدك',
    navProcess: 'آلية العمل',
    navPricing: 'الأسعار والخطط',
    navContact: 'التواصل',
    navFaq: 'الأسئلة الشائعة',
    navPhone: '88 72 589 44 41+',
    requestReview: 'طلب تدقيق الفواتير',
    launchPortal: 'بوابة العملاء',
    backToLanding: 'العودة للرئيسية',

    marquee1: 'تدقيق الفواتير الموردة للشركات – نتحقق من فواتيرك لمنع التكاليف المزدوجة والأخطاء المالية',
    marquee2: 'التحصيل المزدوج · فروق الأسعار · أخطاء الكميات · أخطاء الضريبة والعملات',

    heroEyebrow: 'تدقيق فواتير الموردين',
    heroHeading1: 'تدقيق الخسائر المالية',
    heroHeadingAccent: '',
    heroHeading2: 'للشركات والمؤسسات',
    heroLead: 'نتحقق من فواتير الموردين لكشف التكاليف المزدوجة وفروق الأسعار وأخطاء الكميات – لتدفع شركتك فقط ما هو مستحق بالفعل.',
    heroCtaPrimary: 'طلب تدقيق الفواتير ←',
    heroCtaSecondary: 'ما نتحقق منه ›',
    trustNoObligation: '✓ طلب بدون التزام',
    trustSwissCompany: '✓ شركة سويسرية معتمدة',
    trustDocumentedFindings: '✓ نتائج وملاحظات موثقة بالكامل',
    trustYouDecide: '✓ أنت من يقرر الخطوات القادمة',

    sampleTitle: 'مثال: اختلاف في السعر المعتمد',
    sampleBadge: 'مثال توضيحي',
    samplePoAmount: 'أمر الشراء – المبلغ المعتمد',
    sampleInvoiceAmount: 'الفاتورة الموردة – المبلغ المفلتر',
    sampleVarianceFound: '⚠ تم اكتشاف فرورقات مالية',
    sampleNote: 'نموذج مبسط لتوضيح آلية كشف الفروق الموردة وليس بيانات عملاء حقيقيين.',

    thoroughEyebrow: 'تدقيق مالي للشركات',
    thoroughTitle: 'تدقيق شامل ودقيق لجميع ',
    thoroughTitleAccent: 'فواتير الموردين',
    thoroughText: 'نقوم بمطابقة فواتير الموردين بانتظام مع أوامر الشراء وإشعارات الاستلام والعقود لتسجيل كل اختلاف بوضوح.',

    whyEyebrow: 'لماذا يعد التدقيق ضرورياً؟',
    whyTitleLine1: 'الأخطاء في الفواتير لا تظهر دائماً بالعين المجردة.',
    whyTitleLine2: 'لكنها تكلف شركتك أموالاً طائلة.',
    whyLead: 'في زحمة العمل اليومي نادراً ما يتوفر الوقت لمطابقة كل بند في الفاتورة. قد تمر الأخطاء دون ملاحظتها وتزيد مصاريف الشراء.',
    whyReason1Title: 'فواتير كثيرة ووقت ضيق',
    whyReason1Text: 'لا يتم مقارنة كل بند مع أمر الشراء والاستلام الفعلي.',
    whyReason2Title: 'تغير الشروط والأسعار',
    whyReason2Text: 'الأسعار في الفاتورة لا تطابق دائماً أسعار العقود الرسمية.',
    whyReason3Title: 'تكرار الخطأ في الفواتير',
    whyReason3Text: 'أي خطأ في سعر أو كمية قد يتكرر في كل الفواتير القادمة.',
    whyReason4Title: 'التحصيل المزدوج',
    whyReason4Text: 'قد يتم تقديم الفاتورة نفسها مرتين أو إعادة إرسالها بعد السداد.',
    whyImpactTitle: 'الآثار المترتبة على الأخطاء غير المكتشفة',
    whyImpact1Title: 'دفع مبالغ زائدة',
    whyImpact1Text: 'سداد مبالغ مضاعفة أو غير مستحقة للموردين.',
    whyImpact2Title: 'صعوبة التسوية لاحقاً',
    whyImpact2Text: 'كلما طال وقت اكتشاف الخطأ أصبحت المطالبة باسترداده أصعب.',
    whyImpact3Title: 'ارتفاع المصاريف التشغيلية',
    whyImpact3Text: 'الأخطاء المتكررة ترفع تكاليف شركتك على المدى الطويل.',

    whatEyebrow: 'ما نتحقق منه',
    whatTitle: 'كشف الأخطاء والتكاليف القابلة للاسترداد.',
    whatLead: 'تركز عملية التدقيق على فواتير الموردين عبر فحص الاختلافات التالية والأخطاء المحاسبية.',
    pillar1Title: 'التحصيل المزدوج',
    pillar1Text: 'احتساب الخدمة أو البضاعة نفسها أكثر من مرة.',
    pillar2Title: 'فروق الأسعار',
    pillar2Text: 'احتساب أسعار أعلى من السعر المتفق عليه في العقد أو أمر الشراء.',
    pillar3Title: 'أخطاء الكميات',
    pillar3Text: 'احتساب كميات في الفاتورة أكبر من الكميات المستلمة فعلياً.',
    pillar4Title: 'أخطاء الحسابات والضريبة',
    pillar4Text: 'أخطاء المجموع أو احتساب نسب ضريبة غير صحيحة.',
    pillar5Title: 'شروط العقود',
    pillar5Text: 'عدم تطبيق الخصومات أو التسهيلات المعتمدة في العقد.',
    docMatchTitle: 'المطابقة مع وثائق الشركة',
    docMatchText: 'نقوم بمطابقة الفواتير مع كل مستندات الشراء المتاحة وتوثيق الفروق.',
    docMatch1Title: 'أوامر الشراء (PO)',
    docMatch1Text: 'مقارنة الأسعار والكميات المعتمدة في أمر الشراء.',
    docMatch2Title: 'إشعارات الاستلام',
    docMatch2Text: 'مقارنة الكميات المستلمة في المستودع مع الفاتورة.',
    docMatch3Title: 'العقود الرسمية',
    docMatch3Text: 'مراجعة الخصومات والشروط الخاصة المسجلة بالعقد.',
    docMatch4Title: 'تقارير موثقة',
    docMatch4Text: 'تسجيل كل فرورقات مالية مع تقديم الأدلة والمستندات.',

    benefitEyebrow: 'فوائدك المباشرة',
    benefitTitle: 'ادفع فقط ما هو مستحق عليك فعلياً.',
    benefitLead: 'يوضح التدقيق بدقة أماكن وجود الخلل في الفواتير. وتعتمد قيمة الاسترداد على حجم الفواتير ونسبة الأخطاء.',
    benefitCard1Title: 'كشف المبالغ غير المستحقة',
    benefitCard1Text: 'معرفة الفواتير المرتفعة أو المكررة أو الخاطئة بوضوح.',
    benefitCard2Title: 'تخفيض التكاليف غير الضرورية',
    benefitCard2Text: 'تسويه الخلافات مع الموردين وتجنب تكرار الأخطاء مستقبلاً.',
    benefitCard3Title: 'تقارير وأدلة شفافة',
    benefitCard3Text: 'توثيق كل اختلاف بالمستندات، والقرار النهائي بيدكم.',

    processEyebrow: 'خطوات العمل',
    processTitle: 'من تقديم الطلب إلى تقرير التدقيق.',
    step1Title: 'تقديم الطلب',
    step1Text: 'التواصل معنا وتحديد متطلباتك.',
    step2Title: 'إرسال المستندات',
    step2Text: 'تزويدنا بفواتير الموردين والمستندات ذات الصلة.',
    step3Title: 'عملية التدقيق',
    step3Text: 'نقوم بمطابقة الفواتير الكترونياً ومحاسبياً.',
    step4Title: 'التقرير والنتائج',
    step4Text: 'تحديد الفروق والمبالغ القابلة للاسترداد.',
    step5Title: 'اتخاذ القرار',
    step5Text: 'أنت من يقرر مطالبة المورد أو تعديل الفواتير.',
    examplePanelTitle: 'مثال توضيحي: خطأ في الكمية الموردة',
    findingPanelTitle: 'شكل نتيجة التدقيق',
    findingBadge: 'نتيجة التدقيق',
    findingText: 'تحتوي الفاتورة على 20 قطعة إضافية لم يتم طلبها أو استلامها.',
    nextStepsTitle: 'الخطوات الموصى بها',
    nextStepsText: 'التواصل مع المورد والمطالبة بإشعار دائن (Credit Note).',

    pricingEyebrow: 'خطط التدقيق والأسعار',
    pricingTitle: 'باقات تدقيق مرنة تناسب كافة أحجام الشركات',
    pricingLead: 'اختر الباقة المناسبة لحجم فواتير شركتك الشهرية.',
    pkgStarterTitle: 'التدقيق الأساسي',
    pkgStarterPrice: '490 فرنك / شهرياً',
    pkgStarterDesc: 'مناسب للشركات الصغيرة والمتوسطة حتى 200 فاتورة شهرياً. شامل فحص الأسعار والكميات.',
    pkgProTitle: 'التدقيق الاحترافي',
    pkgProPrice: '1,290 فرنك / شهرياً',
    pkgProDesc: 'للشركات النامية حتى 1,000 فاتورة شهرياً. يتضمن كشف الذكاء الاصطناعي وخطابات الاعتراض.',
    pkgEnterpriseTitle: 'باقة الشركات الكبرى',
    pkgEnterprisePrice: 'حسب الطلب',
    pkgEnterpriseDesc: 'ربط مباشر مع أنظمة ERP (مثل SAP و Abacus) ومستشار تدقيق مخصص.',
    pkgPopularBadge: 'الأكثر طلباً',

    calcEyebrow: 'حاسبة الاسترداد التفاعلية',
    calcTitle: 'احسب قيمة المبالغ القابلة للاسترداد لشركتك',
    calcLead: 'قدر حجم التوفير السنوي بناءً على معدلات الأخطاء الشائعة في فواتير الموردين.',
    calcInvoiceVolume: 'عدد الفواتير الشهرية:',
    calcAvgAmount: 'متوسط قيمة الفاتورة (فرنك):',
    calcErrorRate: 'نسبة الأخطاء المتوقعة (%):',
    calcHourlyRate: 'تكلفة ساعة التدقيق الداخلي (فرنك):',
    calcEstLoss: 'حجم المبالغ القابلة للاسترداد سنوياً',
    calcHoursSaved: 'ساعات العمل الموفرة سنوياً',
    calcNetRoi: 'عائد الاستثمار التقريبي (ROI)',
    calcApplyButton: 'طلب تدقيق باستخدام هذه الأرقام ←',

    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'إجابات هامة قبل البدء.',
    faqLead: 'نظرة سريعة لمساعدتك في اتخاذ القرار المناسب لشركتك.',
    faqQ1: 'ما هي الفواتير التي يمكن تدقيقها؟',
    faqA1: 'يمكننا تدقيق كل فواتير الموردين التجارية ومطابقتها مع أوامر الشراء وإشعارات الاستلام.',
    faqQ2: 'ماذا أحتاج لتقديم أول طلب؟',
    faqA2: 'يكفي تقديم تفاصيل بسيطة عن حجم الفواتير وسنقوم بمناقشة التفاصيل معكم.',
    faqQ3: 'من يتخذ قرار المطالبة المالية؟',
    faqA3: 'أنت صاحب القرار النهائي دائماً. نحن نوفر المستندات والخطابات الرسمية.',
    faqQ4: 'كيف أبدأ الآن؟',
    faqA4: 'عبر البريد info@klarsolution.com أو الاتصال على 88 72 589 44 41+.',

    ctaEyebrow: 'طلب تدقيق الفواتير',
    ctaTitle: 'ابدأ بتدقيق فواتير شركتك الآن.',
    ctaText: 'أرسل لنا تفاصيل حجم عملك وسنقوم بالتواصل معك وتقديم عرض مناسب.',
    ctaButton: 'طلب تدقيق الفواتير',
    contactEyebrow: 'التواصل',
    contactTitle: 'طلب تدقيق الفواتير',
    contactLead: 'اتصل بنا أو أرسل استفسارك عبر النموذج وسنتواصل معك خلال يوم عمل.',
    contactDirectTitle: 'التواصل المباشر',
    contactFormTitle: 'أرغب في طلب تدقيق فواتير الموردين',
    contactFormHint: 'بيانات مبسطة تكفي للبدء.',
    labelName: 'الاسم (اختياري)',
    labelEmail: 'البريد الإلكتروني *',
    labelMessage: 'الرسالة (اختياري)',
    labelNdaConsent: 'أوافق على اتفاقية السرية وعدم الإفصاح (NDA).',
    btnSubmitQuote: 'إرسال طلب التدقيق ←',
    formSubmitting: 'جاري الإرسال…',
    formSuccessMsg: '✓ شكراً لك! تم استلام طلبك بنجاح وسيتواصل معك فريقنا خلال يوم عمل.',
    formFooterNote: 'تستخدم بياناتك فقط للتواصل معك بشأن هذا الطلب.',

    chatTitle: 'كلارا',
    chatSub: 'المساعد الذكي لـ KlarSolution',
    chatWelcome: 'أهلاً بك 👋 أنا كلارا المساعد الذكي لـ KlarSolution. نساعد الشركات في كشف أخطاء الفواتير واسترداد المبالغ الزائدة. كيف يمكنني مساعدتك اليوم؟',
    chatChip1: 'ماذا تقومون بتدقيقه؟',
    chatChip2: 'ما هي الفائدة لشركتي؟',
    chatChip3: 'كيف تتم عملية التدقيق؟',
    chatChip4: 'ما هي تكلفة الخدمة؟',
    chatChip5: 'طلب تدقيق الفواتير',
    chatPlaceholder: 'اكتب سؤالك هنا...',
    chatSendBtn: '←',
    chatEmailPrompt: 'هل ترغب في متابعة مباشرة معنا؟ يرجى كتابة بريدك الإلكتروني:',
    chatEmailSubmit: 'إرسال',
    chatEmailSuccess: 'شكراً لك! تم استلام بريدك وسيتم التواصل معك.',

    footerCopyright: '© 2026 klar solution – جميع الحقوق محفوظة',
    footerSwitzerland: 'سويسرا 🇨🇭',
    legalDatenschutzTitle: 'سياسة الخصوصية',
    legalNdaTitle: 'اتفاقية السرية (NDA)',
    legalCompanyTitle: 'بيانات الشركة',

    dashTitle: 'بوابة التدقيق والتحليلات المالية',
    dashSubtitle: 'لوحة تحكم KlarSolution – متابعة لحظية لفحص الفواتير واسترداد الفروق المالية',
    dashTabOverview: 'النظرة العامة',
    dashTabInvoices: 'مركز الفواتير',
    dashTabScanner: 'ماسح الذكاء الاصطناعي',
    dashTabDisputes: 'إدارة الاعتراضات',
    dashTabSuppliers: 'مؤشر مخاطر الموردين',
    dashTabSettings: 'الربط والإعدادات',
    dashTotalAudited: 'الفواتير المفحوصة',
    dashRecoveredLosses: 'المبالغ المكتشفة القابلة للاسترداد',
    dashActiveDiscrepancies: 'الفروق المفتوحة',
    dashAuditEfficiency: 'معدل دقة التدقيق',
    dashRecentInvoices: 'آخر الفواتير المفحوصة',
    dashUploadInvoice: 'رفع فاتورة جديدة',
    dashRunAiScanner: 'تشغيل الفحص الذكي',
    dashDiscrepancyType: 'نوع الاختلاف',
    dashRiskLevel: 'مستوى الخطورة',
    dashStatus: 'الحالة',
    dashAction: 'الإجراء',
    dashFilterAll: 'جميع الفواتير',
    dashFilterDiscrepancy: 'الفواتير الخاطئة',
    dashFilterApproved: 'المعتمدة',
    dashGenerateLetter: 'إنشاء خطاب اعتراض',
    dashCopyLetter: 'نسخ النص',
    dashLetterCopied: 'تم النسخ!',
    dashSupplierName: 'اسم المورد',
    dashTotalOvercharge: 'إجمالي الزيادات',
    dashErrorRate: 'نسبة الأخطاء',
    dashErpConnected: 'نظام ERP متصل',
    dashExportFilteredCsv: 'تصدير الفواتير المفلترة (CSV)',
    dashExportDiscrepanciesCsv: 'تصدير الفروقات والبنود التفصيلية (CSV)',
    dashExportSuccess: 'تم تصدير تقرير التدقيق بنجاح',
    dashExportOptions: 'خيارات التصدير',
    dashExportSingleInvoice: 'تصدير هذه الفاتورة كملف CSV',

    dashTabAdmin: 'بوابة الإدارة العليا',
    adminSecurityGate: 'لوحة الأمان والحوكمة بمعايير البنوك السويسرية',
    adminTitle: 'إدارة الحوكمة والتحكم الأمني',
    adminSubtitle: 'إدارة صلاحيات المستخدمين، ضبط حدود التسامح التلقائي للتدقيق، ومتابعة سجلات الأمان والامتثال.',
    adminSignIn: 'تسجيل الدخول لبوابة الإدارة',
    adminUsersTitle: 'إدارة صلاحيات الوصول وحسابات الفريق',
    adminUsersSubtitle: 'الحسابات النشطة لفريق تدقيق الامتثال المالي والصلاحيات',
    adminAddUser: 'دعوة مسؤول تدقيق جديد',
    adminSearchUser: 'البحث عن مستخدم بالاسم أو البريد الإلكتروني...',
    adminRulesTitle: 'محرك حدود التسامح والتدقيق',
    adminRulesSubtitle: 'ضبط حدود أخطاء الذكاء الاصطناعي ومعايير التنبيه التلقائي',
    adminMaxTolerance: 'الحد الأقصى للتسامح في الأخطاء',
    adminAutoFlagDuplicates: 'التنبيه التلقائي للفواتير المكررة',
    adminStrictVat: 'التدقيق الصارم لضريبة القيمة المضافة السويسرية 8.1%',
    adminDualSignoff: 'اشتراط توقيع إضافي للمبالغ أكبر من 5,000 فرنك',
    adminSavePolicies: 'حفظ قواعد الحوكمة',
    adminSystemHealth: 'تشخيص حالة النظام والبنية التحتية',
    adminSecurityLogs: 'سجل تدقيق الأمان والامتثال المالي',
    adminLogsSubtitle: 'سجلات الأحداث غير القابلة للتعديل والعمليات الأمنية',
    adminAuthSuccess: 'تم تسجيل دخول جلسة الإدارة بنجاح.',
    adminPolicyUpdated: 'تم تحديث سياسات وقواعد التدقيق بنجاح.',
    adminModalTitle: 'بوابة الأمان للإدارة العليا',
    adminModalSubtitle: 'سجل الدخول باستخدام بيانات الشركة للوصول لخصائص الحوكمة.',
    adminEmailLabel: 'البريد الإلكتروني للشركة',
    adminPasswordLabel: 'رمز الأمان / كلمة المرور',
    adminRoleLabel: 'اختر دور الصلاحية',
    adminAuthenticate: 'تأكيد الجلسة والتسجيل',
    adminInviteUserTitle: 'دعوة مسؤول تدقيق',
    adminInviteUserSubtitle: 'منح صلاحيات محددة حسب الدور لبوابة الشركة.',
  }
};
