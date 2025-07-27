'use client';

import { useTranslations } from 'next-intl';
import { FileJson, FileType2, Shield, Zap, Infinity } from 'lucide-react';


const BENEFIT_ICONS = {
  privacy: Shield,
  speed: Zap,
  formats: FileJson,
  unlimited: Infinity
} as const;

export function Benefits() {
  const t = useTranslations('benefits');
  const benefits = ['privacy', 'speed','formats', 'unlimited'] as const;

  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = BENEFIT_ICONS[benefit];
            return (
              <div key={benefit} className="flex flex-col items-center text-center p-6">
                <Icon className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  {t(`items.${benefit}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`items.${benefit}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}