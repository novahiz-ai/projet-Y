
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const SkeletonBase: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-900 rounded-2xl ${className}`}>
    <div className="absolute inset-0 skeleton-shimmer" />
  </div>
);

export const CardSkeleton: React.FC = () => (
  <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-8 h-full shadow-sm">
    <div className="flex justify-between">
      <SkeletonBase className="w-16 h-16 rounded-2xl" />
      <SkeletonBase className="w-24 h-8" />
    </div>
    <div className="space-y-3">
      <SkeletonBase className="h-8 w-3/4" />
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-5/6" />
    </div>
    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
      <SkeletonBase className="w-32 h-6 rounded-full" />
      <SkeletonBase className="w-10 h-10 rounded-full" />
    </div>
  </div>
);

export const FaqSkeleton: React.FC = () => (
  <div className="space-y-4 w-full">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="p-8 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-between bg-white dark:bg-slate-900/50">
        <SkeletonBase className="h-6 w-2/3" />
        <SkeletonBase className="h-10 w-10 rounded-full" />
      </div>
    ))}
  </div>
);

export const ArticleSkeleton: React.FC = () => (
  <div className="space-y-8">
    <SkeletonBase className="aspect-video w-full rounded-[3rem]" />
    <div className="space-y-6">
      <div className="flex gap-4">
         <SkeletonBase className="h-4 w-24 rounded-full" />
         <SkeletonBase className="h-4 w-24 rounded-full" />
      </div>
      <SkeletonBase className="h-12 w-full rounded-2xl" />
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-2/3" />
      </div>
    </div>
  </div>
);

export const StatsSkeleton: React.FC = () => (
  <div className="h-[65px] w-full max-w-4xl mx-auto flex items-center px-8 bg-white/50 dark:bg-slate-900/50 rounded-full border border-slate-100 dark:border-slate-800/50">
    <div className="flex-1 flex justify-around md:justify-center md:space-x-16 lg:space-x-24">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <SkeletonBase className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <SkeletonBase className="h-3 w-16" />
            <SkeletonBase className="h-2 w-10" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
