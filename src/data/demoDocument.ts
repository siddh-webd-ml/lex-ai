import type { LegalDocument, DocumentSummary, Risk } from '@/types';

const DEMO_CONTENT = `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into as of January 15, 2026 (the "Effective Date"), by and between:

Orion Technologies Inc., a Delaware corporation with offices at 200 Innovation Drive, Wilmington, DE ("Client"),
and
Helios Cloud Systems Ltd., a Singapore private limited company with offices at 1 Raffles Place, #20-01, Singapore 048616 ("Service Provider").

WHEREAS, the Client desires to engage the Service Provider to provide cloud infrastructure and managed IT services, and the Service Provider agrees to provide such services under the terms and conditions set forth herein.

1. SCOPE OF SERVICES
The Service Provider shall provide cloud hosting, infrastructure management, 24/7 monitoring, and technical support services as described in Schedule A attached hereto (collectively, the "Services").

2. TERM
This Agreement shall commence on the Effective Date and shall remain in effect for an initial period of three (3) years, terminating on January 15, 2029, unless terminated earlier in accordance with the provisions herein.

3. PAYMENT TERMS
3.1 The Client shall pay the Service Provider a monthly service fee of SGD 45,000, invoiced in advance on the first day of each calendar month.
3.2 All invoices are due and payable within fourteen (14) days of the invoice date. Late payments shall accrue interest at the rate of 2% per month.
3.3 The Service Provider may increase fees by up to 15% annually with thirty (30) days written notice.

4. TERMINATION
4.1 Either party may terminate this Agreement for material breach upon thirty (30) days written notice, provided the breaching party fails to cure such breach within the notice period.
4.2 The Service Provider may terminate this Agreement immediately and without notice if the Client fails to make any payment within sixty (60) days of the due date.
4.3 Upon termination, the Client shall pay all outstanding fees, including fees for services rendered up to the date of termination, within seven (7) days.

5. LIABILITY AND INDEMNIFICATION
5.1 The Service Provider's total aggregate liability under this Agreement shall not exceed the total fees paid by the Client in the three (3) months preceding the event giving rise to the claim.
5.2 In no event shall the Service Provider be liable for any indirect, incidental, consequential, or special damages, including loss of profits, loss of data, or business interruption, regardless of the cause of action.
5.3 The Client shall indemnify, defend, and hold harmless the Service Provider against all third-party claims arising from the Client's use of the Services.

6. CONFIDENTIALITY
6.1 Each party shall maintain the confidentiality of all proprietary and confidential information disclosed by the other party.
6.2 The obligations of confidentiality shall survive the termination of this Agreement for a period of five (5) years.
6.3 The Service Provider may use the Client's data for internal research and product improvement purposes, provided such data is anonymised.

7. INTELLECTUAL PROPERTY
All intellectual property developed in the course of providing the Services shall vest in the Service Provider. The Client receives a non-exclusive, non-transferable licence to use the deliverables for its internal business purposes only.

8. DATA PROTECTION
The Service Provider shall process personal data in accordance with the Singapore Personal Data Protection Act 2012 and shall implement reasonable security measures to protect the Client's data.

9. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the Republic of Singapore. Any disputes shall be resolved through arbitration in Singapore under the SIAC Rules.

10. FORCE MAJEURE
Neither party shall be liable for delay or failure to perform due to causes beyond its reasonable control, including acts of God, natural disasters, war, terrorism, labour disputes, and governmental actions.

11. ASSIGNMENT
The Service Provider may assign or sub-contract this Agreement, in whole or in part, without the prior written consent of the Client.

12. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior understandings, whether written or oral. Any amendment must be in writing and signed by both parties.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

For Orion Technologies Inc.              For Helios Cloud Systems Ltd.
________________________                  ________________________
Date: January 15, 2026                    Date: January 15, 2026`;

export const DEMO_DOCUMENT: LegalDocument = {
  id: 'demo-orion-helios',
  title: 'Orion Technologies — Service Agreement',
  documentType: 'Service Agreement',
  uploadedAt: '2026-01-15T09:00:00Z',
  pages: 12,
  content: DEMO_CONTENT,
  analysed: false,
};

export const DEMO_SUMMARY: DocumentSummary = {
  title: 'Orion Technologies — Service Agreement',
  documentType: 'Service Agreement',
  summary:
    'This Service Agreement establishes a three-year engagement between Orion Technologies Inc. (Client) and Helios Cloud Systems Ltd. (Service Provider) for cloud hosting, infrastructure management, and 24/7 technical support. The contract is valued at SGD 45,000 per month (SGD 1.62M over the full term), governed by Singapore law with SIAC arbitration. The agreement contains several clauses warranting legal review, particularly around liability caps, unilateral fee increases, IP ownership, and assignment rights.',
  parties: [
    { name: 'Orion Technologies Inc.', role: 'Client' },
    { name: 'Helios Cloud Systems Ltd.', role: 'Service Provider' },
  ],
  importantDates: [
    { label: 'Effective Date', date: 'January 15, 2026', description: 'Agreement commencement date' },
    { label: 'Initial Term End', date: 'January 15, 2029', description: 'End of the 3-year initial term' },
    { label: 'Invoice Due Date', date: 'Monthly (within 14 days)', description: 'Payment due within 14 days of invoice' },
  ],
  keyObligations: [
    { party: 'Orion Technologies Inc.', obligation: 'Pay monthly service fee of SGD 45,000 within 14 days of invoice' },
    { party: 'Helios Cloud Systems Ltd.', obligation: 'Provide cloud hosting, infrastructure management, and 24/7 monitoring' },
    { party: 'Both Parties', obligation: 'Maintain confidentiality of all proprietary information for 5 years post-termination' },
    { party: 'Orion Technologies Inc.', obligation: 'Indemnify Service Provider against third-party claims arising from use of Services' },
  ],
  importantClauses: [
    {
      title: 'Payment Terms',
      clauseNumber: 'Clause 3',
      page: 3,
      summary:
        'Monthly fee of SGD 45,000, due within 14 days. Late payments accrue 2% monthly interest. Service Provider may increase fees by up to 15% annually with 30 days notice.',
    },
    {
      title: 'Termination',
      clauseNumber: 'Clause 4',
      page: 5,
      summary:
        'Either party may terminate for material breach with 30 days notice and cure period. Provider may terminate immediately for payment defaults beyond 60 days.',
    },
    {
      title: 'Liability and Indemnification',
      clauseNumber: 'Clause 5',
      page: 6,
      summary:
        'Provider liability capped at 3 months of fees. All indirect/consequential damages excluded. Client indemnifies Provider against third-party claims.',
    },
    {
      title: 'Confidentiality',
      clauseNumber: 'Clause 6',
      page: 7,
      summary:
        'Confidentiality obligations survive 5 years post-termination. Provider may use Client data for internal research if anonymised.',
    },
    {
      title: 'Intellectual Property',
      clauseNumber: 'Clause 7',
      page: 8,
      summary:
        'All IP vests in the Service Provider. Client receives a non-exclusive, non-transferable licence for internal use only.',
    },
    {
      title: 'Assignment',
      clauseNumber: 'Clause 11',
      page: 10,
      summary: 'Service Provider may assign or sub-contract the Agreement without the Client\u2019s prior written consent.',
    },
  ],
};

export const DEMO_RISKS: Risk[] = [
  {
    id: 'risk-1',
    level: 'high',
    clauseTitle: 'Liability Cap — Consequential Damages Excluded',
    clauseNumber: 'Clause 5.2',
    page: 6,
    originalText:
      'In no event shall the Service Provider be liable for any indirect, incidental, consequential, or special damages, including loss of profits, loss of data, or business interruption, regardless of the cause of action.',
    whyRisky:
      'This clause broadly excludes all consequential damages, including loss of profits and data. For a cloud infrastructure service, data loss or downtime could cause significant financial harm to Orion Technologies. With this exclusion, the Client has virtually no recourse for business losses caused by Provider failures.',
    reviewArea: 'Negotiate carve-outs for data loss caused by Provider negligence, gross misconduct, or wilful default. Consider a separate data restoration warranty.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-2',
    level: 'high',
    clauseTitle: 'Liability Cap Amount',
    clauseNumber: 'Clause 5.1',
    page: 6,
    originalText:
      'The Service Provider\u2019s total aggregate liability under this Agreement shall not exceed the total fees paid by the Client in the three (3) months preceding the event giving rise to the claim.',
    whyRisky:
      'The liability cap is set at only 3 months of fees (SGD 135,000), which is disproportionately low for a 3-year, SGD 1.62M contract. A single major incident could cause damages far exceeding this cap, leaving the Client significantly under-compensated.',
    reviewArea: 'Negotiate a higher cap — at minimum 12 months of fees, or a fixed amount. Consider a separate super-cap for data breach and confidentiality violations.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-3',
    level: 'high',
    clauseTitle: 'Unilateral Assignment Right',
    clauseNumber: 'Clause 11',
    page: 10,
    originalText:
      'The Service Provider may assign or sub-contract this Agreement, in whole or in part, without the prior written consent of the Client.',
    whyRisky:
      'The Service Provider can assign the entire contract or sub-contract any part of it without the Client\u2019s consent. This means critical services could be handed to an unknown third party, potentially compromising service quality and data security. This is a significant asymmetry — the Client has no control over who ultimately delivers the services.',
    reviewArea: 'Require prior written consent for assignment. Add quality and security standards for any approved sub-contractors. Include a right to terminate if assignment materially changes service delivery.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-4',
    level: 'medium',
    clauseTitle: 'Unilateral Annual Fee Increase',
    clauseNumber: 'Clause 3.3',
    page: 3,
    originalText:
      'The Service Provider may increase fees by up to 15% annually with thirty (30) days written notice.',
    whyRisky:
      'A 15% annual increase is significantly above typical inflation rates (2-4%). Over the 3-year term, fees could increase by up to ~52%, turning a SGD 45,000/month contract into SGD 68,500/month. The Client has no mechanism to reject or negotiate these increases.',
    reviewArea: 'Cap annual increases at a lower rate (e.g., CPI + 3%, or a fixed 5%). Add a right to terminate without penalty if the Client does not accept the increase.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-5',
    level: 'medium',
    clauseTitle: 'IP Ownership vests in Service Provider',
    clauseNumber: 'Clause 7',
    page: 8,
    originalText:
      'All intellectual property developed in the course of providing the Services shall vest in the Service Provider. The Client receives a non-exclusive, non-transferable licence to use the deliverables for its internal business purposes only.',
    whyRisky:
      'Any custom developments, configurations, or integrations created for Orion Technologies are owned by the Service Provider. The Client only gets a limited internal-use licence. This could prevent the Client from migrating to another provider or repurposing the work independently.',
    reviewArea: 'Negotiate ownership of Client-specific customisations. At minimum, secure a broad licence including the right to modify and transfer to affiliates and successor providers.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-6',
    level: 'medium',
    clauseTitle: 'Use of Client Data for Internal Research',
    clauseNumber: 'Clause 6.3',
    page: 7,
    originalText:
      'The Service Provider may use the Client\u2019s data for internal research and product improvement purposes, provided such data is anonymised.',
    whyRisky:
      'The Service Provider has the right to use Client data for its own research and product improvement. While anonymisation is required, there is no specification of anonymisation standards or independent verification. Re-identification risks exist, especially with detailed operational data.',
    reviewArea: 'Define anonymisation standards explicitly. Add Client consent requirements for any data use beyond core service delivery. Prohibit sharing of anonymised datasets with third parties.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-7',
    level: 'low',
    clauseTitle: 'Asymmetric Termination Rights',
    clauseNumber: 'Clause 4.2',
    page: 5,
    originalText:
      'The Service Provider may terminate this Agreement immediately and without notice if the Client fails to make any payment within sixty (60) days of the due date.',
    whyRisky:
      'The Service Provider has an immediate termination right for payment default, while the Client only has a 30-day cure period termination for material breach. This asymmetry could leave the Client without services during a minor payment dispute.',
    reviewArea: 'Add a cure period for the Client before the Provider can terminate for non-payment. Mirror the 30-day cure period for consistency.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
  {
    id: 'risk-8',
    level: 'low',
    clauseTitle: 'Governing Law — Singapore Arbitration',
    clauseNumber: 'Clause 9',
    page: 9,
    originalText:
      'This Agreement shall be governed by and construed in accordance with the laws of the Republic of Singapore. Any disputes shall be resolved through arbitration in Singapore under the SIAC Rules.',
    whyRisky:
      'Singapore law and SIAC arbitration are generally reasonable, but Orion Technologies (a Delaware corporation) may face logistical and cost challenges pursuing claims in Singapore. Arbitration proceedings are also confidential, which limits transparency.',
    reviewArea: 'Confirm the Client is comfortable with Singapore as the dispute resolution forum. Consider whether a multi-tier dispute resolution clause (negotiation → mediation → arbitration) would be appropriate.',
    reviewStatus: 'pending',
    reviewComment: '',
  },
];

export const DEMO_SUGGESTED_QUESTIONS = [
  'What are the termination conditions?',
  'Who is responsible for payment?',
  'What are the biggest risks?',
  'Summarize this agreement.',
  'What is the total contract value?',
  'How is intellectual property handled?',
];
