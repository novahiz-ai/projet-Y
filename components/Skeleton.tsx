import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const SkeletonBase: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl ${className}`} />
);

export const PageTransitionSkeleton: React.FC = () => (
  <div className="fixed inset-0 z-[600] bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex flex-col p-10 space-y-12">
    <div className="max-w-7xl mx-auto w-full space-y-12">
      <div className="space-y-4">
        <SkeletonBase className="h-6 w-32" />
        <SkeletonBase className="h-16 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-8 border border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-4">
            <SkeletonBase className="w-12 h-12 rounded-xl" />
            <SkeletonBase className="h-6 w-full" />
            <SkeletonBase className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="w-full min-h-screen pt-32 px-6 space-y-12 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-6">
        <SkeletonBase className="h-6 w-32" />
        <SkeletonBase className="h-16 w-3/4" />
        <SkeletonBase className="h-16 w-1/2" />
        <SkeletonBase className="h-24 w-full" />
        <div className="flex space-x-4">
          <SkeletonBase className="h-14 w-40 rounded-full" />
          <SkeletonBase className="h-14 w-40 rounded-full" />
        </div>
      </div>
      <div className="hidden lg:block">
        <SkeletonBase className="w-full aspect-square rounded-[3rem]" />
      </div>
    </div>
  </div>
);

export const CardSkeleton: React.FC = () => (
  <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-8 h-full">
    <div className="flex justify-between">
      <SkeletonBase className="w-16 h-16 rounded-2xl" />
      <SkeletonBase className="w-24 h-8" />
    </div>
    <SkeletonBase className="h-8 w-3/4" />
    <SkeletonBase className="h-20 w-full" />
    <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between">
      <SkeletonBase className="w-32 h-4" />
      <SkeletonBase className="w-10 h-10 rounded-full" />
    </div>
  </div>
);

export const ArticleSkeleton: React.FC = () => (
  <div className="space-y-4">
    <SkeletonBase className="aspect-[16/10] w-full rounded-[2.5rem]" />
    <div className="space-y-4 px-2">
      <SkeletonBase className="h-4 w-1/4" />
      <SkeletonBase className="h-8 w-full" />
      <SkeletonBase className="h-12 w-full" />
    </div>
  </div>
);

export const FaqSkeleton: React.FC = () => (
  <div className="space-y-4 w-full">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="p-8 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex items-center justify-between">
        <SkeletonBase className="h-6 w-1/2" />
        <SkeletonBase className="h-8 w-8 rounded-full" />
      </div>
    ))}
  </div>
);

export const StatsSkeleton: React.FC = () => (
  <div className="h-[60px] max-w-5xl mx-auto flex items-center px-8 space-x-12 bg-white/50 dark:bg-slate-900/50 rounded-full border border-slate-100 dark:border-slate-800/50">
    <SkeletonBase className="h-4 w-20 hidden md:block" />
    <div className="flex-1 flex justify-around">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <SkeletonBase className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <SkeletonBase className="h-4 w-12" />
            <SkeletonBase className="h-2 w-16" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const IconGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] space-y-4">
        <SkeletonBase className="h-14 w-14 rounded-2xl" />
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-2 w-16" />
      </div>
    ))}
  </div>
);