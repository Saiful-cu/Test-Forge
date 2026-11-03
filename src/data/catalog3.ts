import type { RawCategory } from './catalog'

const m = (name: string, features: string[]) => ({ name, features })

/**
 * AI product categories. Voice agents get the deepest treatment: a voice deployment has a
 * real-time speech pipeline, telephony and compliance surface that none of the other
 * categories cover, and it is where most QA effort actually goes.
 */
export const AI_CATALOG: RawCategory[] = [
  {
    name: 'AI Voice Agents',
    icon: 'AudioLines',
    description:
      'Real-time voice agents that answer and place calls — speech pipeline, telephony, tool calling and call compliance.',
    modules: [
      m('Agent Configuration', [
        'Agent Persona & System Prompt',
        'Voice Selection & TTS Settings',
        'Language & Accent Support',
        'Agent Versioning & Rollback',
        'Business Hours & Availability',
      ]),
      m('Telephony', [
        'Inbound Call Handling',
        'Outbound Campaign Dialling',
        'Phone Number Provisioning',
        'SIP & Carrier Integration',
        'DTMF & IVR Navigation',
        'Warm Transfer & Escalation',
      ]),
      m('Speech Pipeline', [
        'Speech-to-Text Transcription',
        'Text-to-Speech Playback',
        'Barge-in & Interruption Handling',
        'Turn Detection & End-of-Speech',
        'Latency & Response Time',
        'Background Noise Suppression',
        'Voicemail & Answering Machine Detection',
      ]),
      m('Conversation Intelligence', [
        'Intent Detection',
        'Entity & Slot Filling',
        'Knowledge Base Grounding',
        'Context & Memory Across Turns',
        'Fallback & Human Handoff',
        'Multi-turn Disambiguation',
      ]),
      m('Actions & Integrations', [
        'Function & Tool Calling',
        'CRM Write-back',
        'Appointment Booking over Voice',
        'Payment Capture over Voice',
        'Post-call Webhooks',
      ]),
      m('Quality & Compliance', [
        'Call Recording & Consent',
        'Transcript Review',
        'PII Redaction in Transcripts',
        'Hallucination Guardrails',
        'Prompt Injection Defence',
        'Call QA Scoring',
      ]),
      m('Voice Analytics', [
        'Call Analytics Dashboard',
        'Containment & Deflection Rate',
        'Sentiment Analysis',
        'Cost per Call Tracking',
      ]),
    ],
  },
  {
    name: 'Conversational AI & Chatbots',
    icon: 'Bot',
    description: 'Text-based assistants across web, messaging and in-app channels, with human handoff.',
    modules: [
      m('Bot Building', ['Conversation Flow Builder', 'Intent Training', 'Entity Management', 'Multilingual Support']),
      m('Channels', ['Web Chat Widget', 'WhatsApp & SMS', 'Social Messaging', 'In-App Messaging']),
      m('Knowledge', [
        'Knowledge Base Ingestion',
        'Retrieval & Citations',
        'Answer Confidence Scoring',
        'Content Freshness & Re-indexing',
      ]),
      m('Human Handoff', ['Live Agent Routing', 'Agent Assist Suggestions', 'Conversation History', 'Queue & SLA']),
      m('Optimisation', ['Conversation Analytics', 'Unanswered Question Review', 'A/B Prompt Testing']),
    ],
  },
  {
    name: 'Generative AI Platform',
    icon: 'Sparkles',
    description: 'Building LLM applications — prompts, retrieval, agents, guardrails and token economics.',
    modules: [
      m('Model Management', ['Model Catalogue', 'Model Routing & Fallback', 'Fine-tuning Jobs', 'Model Versioning']),
      m('Prompt Engineering', [
        'Prompt Library',
        'Prompt Versioning',
        'Variable Templating',
        'Prompt Evaluation & Scoring',
      ]),
      m('Retrieval (RAG)', [
        'Document Ingestion',
        'Chunking & Embedding',
        'Vector Search',
        'Context Assembly & Citations',
      ]),
      m('Agents & Tools', [
        'Tool & Function Registry',
        'Agent Orchestration',
        'Multi-step Reasoning',
        'Human-in-the-loop Approval',
      ]),
      m('Safety & Governance', [
        'Content Moderation',
        'Prompt Injection Protection',
        'PII Redaction',
        'Output Grounding & Citations',
        'AI Usage Audit Trail',
      ]),
      m('Cost & Performance', [
        'Token Usage Tracking',
        'Rate Limiting & Quotas',
        'Response Caching',
        'Latency Monitoring',
      ]),
    ],
  },
  {
    name: 'AI / ML Operations',
    icon: 'BrainCircuit',
    description: 'Dataset to deployment — training pipelines, model registry, serving, drift and model governance.',
    modules: [
      m('Data', ['Dataset Management', 'Data Labelling', 'Feature Store', 'Data Quality & Drift Detection']),
      m('Training', ['Experiment Tracking', 'Training Pipelines', 'Hyperparameter Tuning', 'Model Registry']),
      m('Deployment', ['Model Serving', 'Canary & Shadow Deployment', 'Model Rollback', 'Batch Inference']),
      m('Monitoring', ['Prediction Monitoring', 'Model Drift & Decay', 'Bias & Fairness Checks', 'Explainability']),
      m('Governance', ['Model Cards & Documentation', 'Model Approval Workflow', 'Regulatory Compliance']),
    ],
  },
  {
    name: 'Computer Vision & Document AI',
    icon: 'ScanEye',
    description: 'Extracting structured data from images, video and documents, with human review.',
    modules: [
      m('Capture', ['Image & Video Ingestion', 'Camera & Stream Management', 'Pre-processing & Enhancement']),
      m('Document Intelligence', [
        'OCR Extraction',
        'Form & Table Parsing',
        'Document Classification',
        'Handwriting Recognition',
      ]),
      m('Visual Recognition', [
        'Object Detection',
        'Face Recognition & Consent',
        'Defect & Anomaly Detection',
        'Licence Plate Recognition',
      ]),
      m('Human Review', ['Review Queue', 'Confidence Thresholds', 'Correction & Retraining Loop']),
      m('Output', ['Structured Data Export', 'Downstream System Integration']),
    ],
  },
]
