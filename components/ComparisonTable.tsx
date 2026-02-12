
import React from 'react';
import { COMPARISON_DATA } from '../constants';

const ComparisonTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-red-600 p-4">
        <h3 className="text-white font-bold text-lg">Differential Diagnosis: PFAPA vs FMF</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Feature</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">PFAPA (The Duck)</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider">FMF (The Dog)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {COMPARISON_DATA.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{item.feature}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.pfapa}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{item.fmf}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-yellow-50 border-t border-yellow-100">
        <p className="text-xs text-yellow-800 italic">
          *Note: 19% of PFAPA patients in Israel/Turkey also have FMF (1 in 5). They may present with both!
        </p>
      </div>
    </div>
  );
};

export default ComparisonTable;
