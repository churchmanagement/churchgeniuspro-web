import type { LucideIcon } from 'lucide-react';
import {
  Users,
  Heart,
  Landmark,
  Sparkles,
  MessageSquare,
  CalendarDays,
  GraduationCap,
  ShieldCheck,
  LifeBuoy,
  Search,
  FileText,
  Mail,
  Bell,
  Mic,
  ScanLine,
  Camera,
  Wallet,
  Receipt,
  RefreshCcw,
  Briefcase,
  Bot,
  MessagesSquare,
  CalendarPlus,
  Smartphone,
  Star,
  QrCode,
  Nfc,
  Wifi,
  MonitorPlay,
  Baby,
  HandHeart,
  BookOpen,
  ClipboardCheck,
  UserCheck,
  Music,
  Award,
  Gift,
  Target,
  PieChart,
  UsersRound,
  KeyRound,
} from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureCategory {
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  features: Feature[];
}

export const featureCategories: FeatureCategory[] = [
  {
    id: 'people',
    icon: Users,
    name: 'Member & Family Management',
    tagline: 'Know & care for your people',
    description:
      'Everything in your church starts with people. Keep every member, family, and visitor organized in one living directory — and make sure no one is forgotten.',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      {
        icon: Users,
        title: 'People & Member Management',
        description:
          'A complete, always-up-to-date record of everyone in your church family — individuals and whole households together, with contact details, relationships, roles, and milestones.',
      },
      {
        icon: Search,
        title: 'Searchable Member Directory',
        description:
          'A searchable, shareable directory with privacy controls, so members stay connected and only see what they are meant to.',
      },
      {
        icon: FileText,
        title: 'Auto-Fill from Membership Forms',
        description:
          'Snap a photo of a paper or digital membership form and the AI reads it, filling in member details automatically. No retyping, no mistakes.',
      },
      {
        icon: UsersRound,
        title: 'Groups + Group Email & SMS',
        description:
          'Organize small groups, ministries, teams, and age groups — then reach any of them with a single email or text.',
      },
      {
        icon: ClipboardCheck,
        title: 'Follow-Up Management',
        description:
          'First-time visitors, prayer requests, and pastoral needs never fall through the cracks. Assign follow-ups, track progress, and see what is outstanding at a glance.',
      },
    ],
  },
  {
    id: 'giving',
    icon: Heart,
    name: 'Giving & Generosity',
    tagline: 'Made effortless',
    description:
      'Make giving simple for your congregation and painless for you to manage — with a clear view of every gift and pledge, updated in real time.',
    gradient: 'from-rose-500 to-pink-500',
    features: [
      {
        icon: Heart,
        title: 'Online & Text-to-Give Donations',
        description:
          'Let people give online in a few taps or by sending a quick text. Every gift flows straight into your records, matched to the right donor and fund.',
      },
      {
        icon: PieChart,
        title: 'Real-Time Donation Tracking',
        description:
          'See exactly who gave, when, how, and to which fund — everything ready for receipts and reporting whenever you need it.',
      },
      {
        icon: Target,
        title: 'Pledge & Campaign Management',
        description:
          'Run building funds and giving campaigns with confidence. Record pledges and watch fulfillment update automatically as gifts come in.',
      },
      {
        icon: Gift,
        title: 'Giving Management',
        description:
          'Manage every fund, campaign, and gift from one dashboard — no reconciling by hand, no lost envelopes.',
      },
    ],
  },
  {
    id: 'accounting',
    icon: Landmark,
    name: 'Accounting, Payroll & Finance',
    tagline: 'Without the headache',
    description:
      "You don't need an accounting degree to keep clean books. Proper financial tools, supercharged with AI that reads your documents and takes dictation.",
    gradient: 'from-emerald-500 to-teal-500',
    features: [
      {
        icon: Landmark,
        title: 'Full Accounting System & Financial Reports',
        description:
          'Track income and expenses by fund and category, then generate clear, board-ready financial reports any time.',
      },
      {
        icon: Receipt,
        title: 'Automatic Tax Statement Generation',
        description:
          'Generate accurate giving statements for every donor in a few clicks — ready to email or print. Tax season becomes a non-event.',
      },
      {
        icon: RefreshCcw,
        title: 'Recurring Income & Expenses',
        description:
          'Set up repeating payments and income once — rent, salaries, subscriptions, regular gifts — and the system enters them on schedule.',
      },
      {
        icon: Camera,
        title: 'AI Auto-Fill from Check Photos (OCR)',
        description:
          'Take a photo of a check or scanned document and the AI reads the amount, date, and payer — then fills in the entry for you.',
      },
      {
        icon: ScanLine,
        title: 'Bank Statement Photo → Transactions',
        description:
          'Photograph a bank statement and the AI extracts every line, ready to import as income and expenses in one batch.',
      },
      {
        icon: Mic,
        title: 'Hands-Free Voice Accounting Entry',
        description:
          'Say what you received or spent, and the AI captures amounts, dates, and categories into the right fields — completely hands-free.',
      },
      {
        icon: Briefcase,
        title: 'Employee Records & Payroll',
        description:
          'Keep staff records in order and run payroll right inside ChurchGeniusPro — no separate payroll service required.',
      },
      {
        icon: Wallet,
        title: 'Fund & Budget Tracking',
        description:
          'Every dollar stays connected to your accounting, from designated funds to campaign budgets.',
      },
    ],
  },
  {
    id: 'ai',
    icon: Sparkles,
    name: 'Built-In AI Assistant',
    tagline: 'Like a staff member living inside your software',
    description:
      'Instead of hunting through menus and filling out forms, search in plain English, give one-word commands, or simply talk — and the assistant does the work.',
    gradient: 'from-purple-500 to-violet-500',
    features: [
      {
        icon: Search,
        title: 'AI Text Search & Commands',
        description:
          'Type "show last month\'s giving" or "add a new family" and the assistant responds instantly — no need to learn where every menu lives.',
      },
      {
        icon: Mic,
        title: 'Voice Commands',
        description:
          'Speak your request and ChurchGeniusPro listens and acts — navigate, search, or start a task entirely hands-free.',
      },
      {
        icon: MessagesSquare,
        title: 'Conversational AI',
        description:
          'Have an actual back-and-forth with your church software. The assistant asks the right questions, confirms details, and completes multi-step tasks with you.',
      },
      {
        icon: CalendarPlus,
        title: 'One-Word Meeting Creation',
        description:
          'Speak the details — or use a single word — and the AI sets up your meeting with the right people, time, and place.',
      },
      {
        icon: Bot,
        title: 'AI-Powered Document Reading (OCR)',
        description:
          'The AI reads checks, bank statements, and membership forms from a photo, and fills in the data for you.',
      },
    ],
  },
  {
    id: 'communication',
    icon: MessageSquare,
    name: 'Communication & Engagement',
    tagline: 'The heartbeat of community',
    description:
      'Keep your congregation informed, encouraged, and remembered — automatically. Email, SMS, reminders, daily verses, and certificates all in one place.',
    gradient: 'from-sky-500 to-blue-500',
    features: [
      {
        icon: Mail,
        title: 'Email & SMS Messaging',
        description:
          'Reach the right people with the right message, individually or in groups. Tied to your member data, your lists are always current.',
      },
      {
        icon: Bell,
        title: 'Custom Reminders & Notifications',
        description:
          'Automatic reminders for meetings, events, birthdays, anniversaries, and holidays — worded the way you want them.',
      },
      {
        icon: BookOpen,
        title: 'Daily Bible Verses',
        description:
          'A verse of encouragement in front of your congregation every day — a simple, consistent touchpoint that keeps people connected.',
      },
      {
        icon: Award,
        title: 'Certificate Generation',
        description:
          'Create polished certificates for baptisms, dedications, course completions, and volunteer service in moments — no design tool needed.',
      },
    ],
  },
  {
    id: 'events',
    icon: CalendarDays,
    name: 'Events, Worship & Scheduling',
    tagline: 'Perfectly in sync',
    description:
      'From a single shared calendar to a fully planned worship service, keep your church schedule and teams aligned.',
    gradient: 'from-amber-500 to-orange-500',
    features: [
      {
        icon: CalendarDays,
        title: 'Event Management & Shared Calendar',
        description:
          'Plan, publish, and manage every event on one calendar your whole church can see — with registration and check-in in the same place.',
      },
      {
        icon: Music,
        title: 'Worship Planning & Service Order',
        description:
          'Build your service order, schedule worship team members, and share the plan so everyone knows their part before Sunday.',
      },
      {
        icon: UserCheck,
        title: 'Attendance Tracking',
        description:
          'Accurate attendance for services, classes, groups, and events — with trends over time so you know where to focus care and outreach.',
      },
      {
        icon: HandHeart,
        title: 'Smart Volunteer Assignment',
        description:
          'Match the right volunteers to the right roles based on availability and interests — so serving feels like a fit, not a chore.',
      },
    ],
  },
  {
    id: 'ministries',
    icon: GraduationCap,
    name: 'Sunday School, Kids & Prayer',
    tagline: 'Ministries that practically run themselves',
    description:
      'Your most people-intensive ministries get purpose-built tools that save volunteers time and keep families safe and cared for.',
    gradient: 'from-green-500 to-emerald-500',
    features: [
      {
        icon: GraduationCap,
        title: 'Sunday School with Auto Exams & Grading',
        description:
          'Manage classes and students, let the system generate and auto-grade exams, and follow each learner with clear progress tracking.',
      },
      {
        icon: Baby,
        title: 'Kids Check-In (Code & Barcode)',
        description:
          'Secure code and barcode check-in for fast, safe drop-off and pick-up — with mobile check-in for contactless arrivals.',
      },
      {
        icon: ShieldCheck,
        title: 'Auto Classroom Assignment + Medical Info',
        description:
          'Children are automatically placed in the right classroom by age, with allergies and medical needs always on hand for volunteers.',
      },
      {
        icon: HandHeart,
        title: 'Prayer Ministry Management',
        description:
          'Collect prayer requests, assign them to your prayer team, and track how each one is being lifted up — so no request goes unanswered.',
      },
    ],
  },
  {
    id: 'access',
    icon: ShieldCheck,
    name: 'Portals, Mobile & Security',
    tagline: 'Exactly the access everyone needs',
    description:
      'Staff, members, and children each get tailored experiences across web, mobile, and campus screens — with smart security protecting sensitive pages.',
    gradient: 'from-indigo-500 to-purple-500',
    features: [
      {
        icon: KeyRound,
        title: 'Staff, Member & Child Portals',
        description:
          'Three tailored experiences in one platform. Each person signs in and sees what is relevant to them — nothing more, nothing less.',
      },
      {
        icon: ShieldCheck,
        title: 'Role-Based Access & Account Switching',
        description:
          'Link related accounts and switch roles in a tap — a parent who is also a volunteer and staff member sees only what each role should.',
      },
      {
        icon: Smartphone,
        title: 'Mobile App',
        description:
          'Giving, check-in, communication, and everyday tools right in your pocket — in the lobby, at home, or on the go.',
      },
      {
        icon: QrCode,
        title: 'QR Code / Barcode Quick Login',
        description:
          'Volunteers and guests get quick, secure, time-limited access by scanning a barcode — access ends automatically after their shift.',
      },
      {
        icon: Nfc,
        title: 'NFC (NTAG) Login & Page Access',
        description:
          'A physical NFC tap becomes an instant doorway to the right page — perfect for kiosks, check-in stations, and on-site tools.',
      },
      {
        icon: Wifi,
        title: 'Wi-Fi-Only Private Pages',
        description:
          'Lock sensitive pages so they only open on your church network — an easy, powerful layer of protection.',
      },
      {
        icon: MonitorPlay,
        title: 'Public Screens & Displays',
        description:
          'Power welcome displays, announcements, and event info on any monitor or TV around your campus.',
      },
      {
        icon: Star,
        title: 'Favorites & Quick Access',
        description:
          'Pin the pages and tools you use most for one-tap access, so your daily routine is always a click away.',
      },
    ],
  },
  {
    id: 'help',
    icon: LifeBuoy,
    name: 'Reports, Analytics & Help',
    tagline: 'Help whenever you need it',
    description:
      'Board-ready reports, engagement analytics, and a step-by-step Help Center that turns first-time users into confident pros.',
    gradient: 'from-slate-500 to-slate-700',
    features: [
      {
        icon: PieChart,
        title: 'Reports & Analytics',
        description:
          'Financial reports, giving summaries, attendance trends, and ministry insights — generated in seconds, ready for your board.',
      },
      {
        icon: LifeBuoy,
        title: 'Advanced Help Center',
        description:
          'Clear, friendly help for every feature — step-by-step instructions and guided tutorials built right into the platform.',
      },
      {
        icon: BookOpen,
        title: 'Built-In Tutorials & Guidance',
        description:
          'Learn as you go with helpful prompts and walkthroughs. No experience required — just follow along.',
      },
    ],
  },
];
