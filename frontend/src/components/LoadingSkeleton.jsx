import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 space-y-4 animate-pulse border border-gray-100">
      <div className="h-40 bg-gray-100 rounded-xl w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-100 rounded-md w-1/2" />
        <div className="h-6 bg-gray-100 rounded-md w-3/4" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 bg-gray-100 rounded-md w-1/3" />
        <div className="h-10 bg-gray-100 rounded-xl w-1/3" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
