import type { DocumentSummary, Risk, LegalBrief, ChatMessage } from '@/types';
import { DEMO_SUMMARY, DEMO_RISKS } from '@/data/demoDocument';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyseDocument(): Promise<{ summary: DocumentSummary; risks: Risk[] }> {
  await delay(2200);
  return { summary: DEMO_SUMMARY, risks: DEMO_RISKS };
}

export async function generateBrief(summary: DocumentSummary, risks: Risk[]): Promise<LegalBrief> {
  await delay(1800);

  const totalValue = 'SGD 45,000/month (SGD 1.62M over 3 years)';

  return {
    overview: `${summary.title} is a ${summary.documentType.toLowerCase()} between ${summary.parties[0].name} (${summary.parties[0].role}) and ${summary.parties[1].name} (${summary.parties[1].role}). The agreement covers cloud infrastructure and managed IT services for an initial term of three (3) years, valued at approximately ${totalValue}. The contract is governed by the laws of the Republic of Singapore with SIAC arbitration.`,
    keyFacts: [
      `Parties: ${summary.parties.map((p) => `${p.name} (${p.role})`).join(' and ')}`,
      `Contract value: ${totalValue}`,
      `Initial term: 3 years (January 15, 2026 — January 15, 2029)`,
      `Payment: SGD 45,000/month, due within 14 days of invoice`,
      `Governing law: Singapore (SIAC arbitration)`,
      `Liability cap: 3 months of fees (SGD 135,000)`,
    ],
    importantClauses: summary.importantClauses.map(
      (c) => `${c.clauseNumber} (${c.title}): ${c.summary}`,
    ),
    potentialRisks: risks.map(
      (r) => `[${r.level.toUpperCase()}] ${r.clauseTitle} (${r.clauseNumber}, p.${r.page}): ${r.whyRisky}`,
    ),
    importantDates: summary.importantDates.map(
      (d) => `${d.label}: ${d.date} — ${d.description}`,
    ),
    questionsForReview: [
      'Should the liability cap be increased from 3 months to at least 12 months of fees?',
      'Should carve-outs be added for data loss and confidentiality breaches?',
      'Should the Client have consent rights over assignment and sub-contracting?',
      'Should the annual fee increase cap be reduced from 15% to a CPI-linked rate?',
      'Should the Client own custom developments rather than the Service Provider?',
      'Should anonymisation standards for Client data use be defined explicitly?',
      'Should a cure period be added before the Provider can terminate for non-payment?',
    ],
  };
};

export interface QAResponse {
  answer: string;
  source: string;
}

export async function askQuestion(question: string): Promise<QAResponse> {
  await delay(1200);

  const q = question.toLowerCase();

  if (q.includes('termin')) {
    return {
      answer:
        'This Agreement can be terminated in three ways:\n\n1. Either party may terminate for material breach with 30 days written notice, provided the breaching party fails to cure within that period (Clause 4.1).\n2. The Service Provider may terminate immediately and without notice if the Client fails to make any payment within 60 days of the due date (Clause 4.2).\n3. The agreement naturally expires at the end of the initial 3-year term on January 15, 2029.\n\nUpon termination, the Client must pay all outstanding fees within 7 days (Clause 4.3).',
      source: 'Clause 4, Page 5',
    };
  }

  if (q.includes('payment') || q.includes('pay') || q.includes('fee') || q.includes('cost') || q.includes('responsible for payment')) {
    return {
      answer:
        'Orion Technologies Inc. (the Client) is responsible for all payments under this Agreement. Key payment terms:\n\n- Monthly service fee: SGD 45,000, invoiced in advance (Clause 3.1)\n- Payment due: within 14 days of invoice date (Clause 3.1)\n- Late payment interest: 2% per month (Clause 3.1)\n- Annual fee increase: up to 15% with 30 days notice (Clause 3.3)',
      source: 'Clause 3, Page 3',
    };
  }

  if (q.includes('risk') || q.includes('biggest risk') || q.includes('danger') || q.includes('concern')) {
    return {
      answer:
        'The biggest risks in this agreement are:\n\n1. [HIGH] Liability cap is only 3 months of fees (SGD 135,000) with all consequential damages excluded (Clause 5). This is disproportionately low for a SGD 1.62M contract.\n\n2. [HIGH] The Service Provider can assign or sub-contract the entire agreement without the Client\u2019s consent (Clause 11), meaning critical services could go to an unknown third party.\n\n3. [MEDIUM] Annual fee increases of up to 15% are unilateral (Clause 3.3) — over 3 years, fees could rise by ~52%.\n\n4. [MEDIUM] All IP vests in the Service Provider (Clause 7), limiting the Client\u2019s ability to migrate or reuse custom work.',
      source: 'Clauses 3, 5, 7, 11 — Pages 3, 6, 8, 10',
    };
  }

  if (q.includes('summar') || q.includes('overview') || q.includes('what is this') || q.includes('brief')) {
    return {
      answer:
        'This is a Service Agreement between Orion Technologies Inc. (Client) and Helios Cloud Systems Ltd. (Service Provider) for cloud hosting, infrastructure management, and 24/7 technical support.\n\nKey terms:\n- Duration: 3 years (Jan 15, 2026 — Jan 15, 2029)\n- Value: SGD 45,000/month (SGD 1.62M total)\n- Governing law: Singapore (SIAC arbitration)\n- Liability: capped at 3 months of fees; consequential damages excluded\n- IP: owned by Service Provider; Client has internal-use licence only\n- Confidentiality: survives 5 years post-termination\n\nThe agreement contains several clauses warranting legal review, particularly around liability, assignment, and IP ownership.',
      source: 'Full Agreement, Pages 1-12',
    };
  }

  if (q.includes('total') || q.includes('value') || q.includes('how much') || q.includes('contract value')) {
    return {
      answer:
        'The total contract value is approximately SGD 1,620,000 over the 3-year initial term, based on the monthly fee of SGD 45,000. Note that the Service Provider may increase fees by up to 15% annually (Clause 3.3), so the actual total could be significantly higher.',
      source: 'Clause 3, Page 3',
    };
  }

  if (q.includes('intellectual') || q.includes('ip') || q.includes('ownership') || q.includes('property')) {
    return {
      answer:
        'All intellectual property developed during the provision of services vests in the Service Provider (Helios Cloud Systems Ltd.). The Client (Orion Technologies) receives only a non-exclusive, non-transferable licence for internal business purposes (Clause 7).\n\nThis means any custom developments, configurations, or integrations are owned by the Provider, which could limit the Client\u2019s ability to migrate to another provider or reuse the work independently.',
      source: 'Clause 7, Page 8',
    };
  }

  if (q.includes('confidential') || q.includes('data') || q.includes('privacy')) {
    return {
      answer:
        'Confidentiality obligations (Clause 6):\n\n- Both parties must maintain confidentiality of proprietary information (Clause 6.1)\n- Obligations survive 5 years post-termination (Clause 6.2)\n- The Service Provider may use Client data for internal research and product improvement if anonymised (Clause 6.3)\n- Personal data is processed in accordance with Singapore\u2019s PDPA 2012 (Clause 8)\n\nThe data-use provision (6.3) is a potential risk as anonymisation standards are not defined.',
      source: 'Clauses 6 & 8, Pages 7 & 9',
    };
  }

  if (q.includes('liab') || q.includes('indemn')) {
    return {
      answer:
        'Liability and indemnification terms (Clause 5):\n\n- Provider\u2019s total aggregate liability: capped at 3 months of fees (~SGD 135,000) (Clause 5.1)\n- All indirect, consequential, and special damages are excluded, including loss of profits and data (Clause 5.2)\n- The Client must indemnify the Provider against all third-party claims arising from the Client\u2019s use of services (Clause 5.3)\n\nThe liability cap and broad exclusion of consequential damages are among the highest-risk provisions in this agreement.',
      source: 'Clause 5, Page 6',
    };
  }

  if (q.includes('govern') || q.includes('law') || q.includes('jurisdiction') || q.includes('dispute') || q.includes('arbitration')) {
    return {
      answer:
        'This Agreement is governed by the laws of the Republic of Singapore. Any disputes are to be resolved through arbitration in Singapore under the SIAC (Singapore International Arbitration Centre) Rules (Clause 9).\n\nNote: Orion Technologies is a Delaware corporation, so pursuing claims in Singapore may involve logistical and cost considerations.',
      source: 'Clause 9, Page 9',
    };
  }

  if (q.includes('assign') || q.includes('sub-contract') || q.includes('transfer')) {
    return {
      answer:
        'The Service Provider may assign or sub-contract this Agreement, in whole or in part, without the prior written consent of the Client (Clause 11).\n\nThis is a significant risk — the Client has no control over who ultimately delivers the services, which could impact service quality and data security.',
      source: 'Clause 11, Page 10',
    };
  }

  if (q.includes('term') || q.includes('duration') || q.includes('how long') || q.includes('when')) {
    return {
      answer:
        'The initial term of this Agreement is three (3) years, commencing on January 15, 2026 and terminating on January 15, 2029 (Clause 2). The Agreement may be terminated earlier in accordance with the termination provisions in Clause 4.',
      source: 'Clause 2, Page 2',
    };
  }

  if (q.includes('party') || q.includes('parties') || q.includes('who') || q.includes('between')) {
    return {
      answer:
        'This Service Agreement is between:\n\n1. Orion Technologies Inc. — a Delaware corporation acting as the Client\n2. Helios Cloud Systems Ltd. — a Singapore private limited company acting as the Service Provider\n\nThe Client engages the Service Provider to provide cloud infrastructure and managed IT services.',
      source: 'Preamble, Page 1',
    };
  }

  return {
    answer: 'No supporting information was found in this document.',
    source: 'N/A',
  };
}

export function formatBriefAsText(brief: LegalBrief): string {
  const lines: string[] = [];
  lines.push('═══════════════════════════════════════════════');
  lines.push('         LEGAL BRIEF — AI GENERATED');
  lines.push('═══════════════════════════════════════════════');
  lines.push('');
  lines.push('DOCUMENT OVERVIEW');
  lines.push('─────────────────');
  lines.push(brief.overview);
  lines.push('');
  lines.push('KEY FACTS');
  lines.push('─────────');
  brief.keyFacts.forEach((f) => lines.push(`  • ${f}`));
  lines.push('');
  lines.push('IMPORTANT CLAUSES');
  lines.push('─────────────────');
  brief.importantClauses.forEach((c) => lines.push(`  • ${c}`));
  lines.push('');
  lines.push('POTENTIAL RISKS');
  lines.push('───────────────');
  brief.potentialRisks.forEach((r) => lines.push(`  • ${r}`));
  lines.push('');
  lines.push('IMPORTANT DATES');
  lines.push('───────────────');
  brief.importantDates.forEach((d) => lines.push(`  • ${d}`));
  lines.push('');
  lines.push('QUESTIONS FOR LAWYER REVIEW');
  lines.push('───────────────────────────');
  brief.questionsForReview.forEach((q) => lines.push(`  • ${q}`));
  lines.push('');
  lines.push('═══════════════════════════════════════════════');
  lines.push('AI-generated insights are for research and');
  lines.push('decision-support only. Final legal decisions');
  lines.push('should be reviewed by a qualified legal');
  lines.push('professional.');
  lines.push('═══════════════════════════════════════════════');
  return lines.join('\n');
}
