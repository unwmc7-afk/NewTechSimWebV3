import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProcessComparison from './ProcessComparison';

const ProcessComparisonPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
            {t.processComparison?.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-light">
            {t.processComparison?.subtitle}
          </p>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.processComparison?.desc}
          </p>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <ProcessComparison />
        </div>
      </div>
    </div>
  );
};

export default ProcessComparisonPage;
