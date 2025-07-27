import { NextResponse } from 'next/server';
import whois from 'whois-parsed-v2';

interface WhoisResponse {
  status: 'available' | 'unavailable' | 'error';
  tld: string; // Add tld to the interface
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

async function queryDomain(domain: string, tld: string): Promise<WhoisResponse> {
  try {
    console.log('query:'+domain);
    const result = await whois.lookup(domain);
    console.log('query:'+domain+',result:\n'+JSON.stringify(result));
    // Check if domain is available based on isAvailable flag
    if (result.isAvailable) {
      return {
        status: 'available',
        tld,
        whoisData: {
          rawText: result.raw
        }
      };
    }
    
    // Domain is registered
    return {
      status: 'unavailable',
      tld,
      registrar: result.registrar || 'Unknown',
      createdDate: result.creationDate,
      expiresDate: result.expirationDate,
      whoisData: {
        nameServers: result.nameServers || [],
        rawText: result.raw,
        registrant: result.registrant,
        admin: result.admin,
        tech: result.tech
      }
    };
  } catch (error) {
    // Check if the error indicates the domain is available
    if (error.message?.includes('No match for domain') || 
        error.message?.includes('Domain not found') ||
        error.message?.includes('Status: AVAILABLE')) {
      return {
        status: 'available',
        tld,
        whoisData: { rawText: error.message }
      };
    }
    console.log('Domain lookup:'+domain+',error:'+JSON.stringify(error));
    return {
      status: 'error',
      tld,
      error: error.message || 'Failed to check domain availability'
    };
  }
}

export async function POST(request: Request) {
  try {
    const { domain, tld } = await request.json();
    
    if (!domain || !tld) {
      return NextResponse.json(
        { error: 'Domain and TLD are required' },
        { status: 400 }
      );
    }

    // Validate domain name format
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/;
    if (!domainRegex.test(domain)) {
      return NextResponse.json(
        { error: 'Invalid domain name format' },
        { status: 400 }
      );
    }

    const result = await queryDomain(`${domain}.${tld}`, tld);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Failed to check domain availability',
        details: error.message
      },
      { status: 500 }
    );
  }
}