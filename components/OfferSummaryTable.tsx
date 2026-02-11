import React from 'react';
import { useTranslation } from 'react-i18next';

interface SummaryRow {
  label: string;
  value: string | React.ReactNode;
  isHighlight?: boolean;
}

interface OfferSummaryTableProps {
  rows: SummaryRow[];
  title?: string;
}

const OfferSummaryTable: React.FC<OfferSummaryTableProps> = ({ rows, title }) => {
  const { t } = useTranslation();
  const displayTitle = title || t('labels.see_details');

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-black uppercase tracking-tight">{displayTitle}</h2>
      <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-8 py-4 font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-widest">
                {t('labels.characteristic')}
              </th>
              <th className="px-8 py-4 font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-widest">
                {t('labels.details')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="px-8 py-4 text-slate-500 text-sm font-bold uppercase tracking-tight">{row.label}</td>
                <td className={`px-8 py-4 font-black ${row.isHighlight ? 'text-indigo-600 text-2xl tracking-tighter italic' : 'text-lg'}`}>
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferSummaryTable;