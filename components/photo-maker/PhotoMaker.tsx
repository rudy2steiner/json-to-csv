'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2, Check, X, AlertCircle, ChevronDown, Info, Settings, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CsvToJsonConverter } from '@/components/csv-to-json';
import { JsonToCsvConverter } from '@/components/json-to-csv';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DomainStatus {
  tld: string;
  status: 'checking' | 'available' | 'unavailable' | 'error' | null;
  registrar?: string;
  createdDate?: string;
  expiresDate?: string;
  error?: string;
  whoisData?: {
    nameServers?: string[];
    rawText?: string;
    registrant?: any;
    admin?: any;
    tech?: any;
  };
}


const testimonials = [
  {
    name: "Alice W.",
    feedback: "The JSON to CSV tool is fast, accurate, and super easy to use. It saved me hours of manual work! Highly recommended for anyone needing JSON to CSV conversion.",
    color: "bg-blue-400",
  },
  {
    name: "Devon L.",
    feedback: "I love how secure and private this JSON to CSV converter is. Everything happens in my browser, and the CSV output is perfect every time.",
    color: "bg-green-400",
  },
  {
    name: "Priya S.",
    feedback: "Best free JSON to CSV converter online! The preview and download options are a game changer for my workflow.",
    color: "bg-pink-400",
  },
];

const faqs = [
  {
    q: "What is a JSON to CSV converter?",
    a: "A JSON to CSV converter is a tool that transforms JSON data into CSV format, making it easier to work with in spreadsheets and databases.",
  },
  {
    q: "Is my data safe when using this JSON to CSV tool?",
    a: "Yes! All conversions happen locally in your browser. Your JSON data never leaves your device.",
  },
  {
    q: "Can I convert large JSON files to CSV?",
    a: "Our JSON to CSV converter supports files up to 10MB, making it suitable for most use cases.",
  },
  {
    q: "Does the JSON to CSV converter handle nested JSON?",
    a: "Yes, our tool is designed to handle complex JSON structures, including nested objects and arrays, for accurate CSV output.",
  },
];

const DEFAULT_TLDS = [
  // Generic TLDs
  'com', 'net', 'org', 'io', 'co', 
  // Tech TLDs
  'dev', 'app', 'ai',
  // Business TLDs
  'biz',
  // Other Popular TLDs
  'info', 'me', 'xyz', 'online'
] as const;

const REGISTRARS = [
  { 
    name: 'Dynadot',
    url: (domain: string) => `https://www.dynadot.com/domain/search?domain=${domain}`,
    logo: '/dynadot.ico'
  },
  {
      name: 'GoDaddy',
      url: (domain: string) => `https://www.godaddy.com/domainsearch/find?domainToCheck=${domain}`,
      logo: '/godadday.png'
  }
];

export function PhotoMaker() {
  const t = useTranslations();
  const { toast } = useToast();
  const [domain, setDomain] = useState('');
  const [customTld, setCustomTld] = useState('');
  const [tlds, setTlds] = useState<string[]>([...DEFAULT_TLDS]);
  const [domainStatuses, setDomainStatuses] = useState<DomainStatus[]>(
    DEFAULT_TLDS.map(tld => ({ tld, status: null }))
  );
  const [isChecking, setIsChecking] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const addTlds = () => {
    if (!customTld) return;
    
    const newTlds = customTld
      .toLowerCase()
      .split(/[\s,]+/)
      .map(tld => tld.trim().replace(/[^a-z0-9-]/g, ''))
      .filter(tld => tld && !tlds.includes(tld));

    if (newTlds.length) {
      const updatedTlds = [...tlds, ...newTlds];
      setTlds(updatedTlds);
      setDomainStatuses(prev => [
        ...prev,
        ...newTlds.map(tld => ({ tld, status: null }))
      ]);
      setCustomTld('');
    }
  };

  const removeTld = (tldToRemove: string) => {
    setTlds(tlds.filter(tld => tld !== tldToRemove));
    setDomainStatuses(prev => prev.filter(status => status.tld !== tldToRemove));
  };

  const clearAllTlds = () => {
    setTlds([]);
    setDomainStatuses([]);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  const checkDomain = async (domainName: string, tld: string) => {
    try {
      const response = await fetch('/api/domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: domainName, tld }),
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('common.domain.error'));
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking domain:', error);
      return { 
        tld, 
        status: 'error',
        error: error.message 
      };
    }
  };

  const handleCheck = async () => {
    if (!domain || isChecking) return;

    // Check if the input contains a dot to determine if it includes a TLD
    const parts = domain.toLowerCase().split('.');
    let domainName: string;
    let specificTld: string | null = null;

    if (parts.length > 1) {
      // If input includes TLD (e.g., "example.com")
      domainName = parts.slice(0, -1).join('').replace(/[^a-z0-9-]/g, '');
      specificTld = parts[parts.length - 1].replace(/[^a-z0-9-]/g, '');
    } else {
      // If input is just a domain name
      domainName = domain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }

    if (!domainName) {
      toast({
        title: t('common.error'),
        description: t('common.domain.invalidDomain'),
        variant: 'destructive',
      });
      return;
    }

    setIsChecking(true);
    
    try {
      if (specificTld) {
        // Check only the specific TLD
        const result = await checkDomain(domainName, specificTld);
        setDomainStatuses([result]);
      } else {
        // Check all configured TLDs
        setDomainStatuses(prev =>
          prev.map(item => ({ ...item, status: 'checking' }))
        );
        const results = await Promise.all(
          tlds.map(tld => checkDomain(domainName, tld))
        );
        setDomainStatuses(results);
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('common.domain.checkFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div id="photo-maker" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-10 mb-8" id="converter">
          <JsonToCsvConverter />
        </section>
    </div>
  );
}