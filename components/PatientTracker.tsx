
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { FeverEpisode } from '../types';

interface PatientTrackerProps {
  episodes: FeverEpisode[];
}

const PatientTracker: React.FC<PatientTrackerProps> = ({ episodes }) => {
  const chartData = episodes.map(e => ({
    date: e.date,
    temp: e.maxTemp,
    duration: e.durationDays
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Fever Intensity Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={[37, 41]} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Episode Duration (Days)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="duration" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp (°C)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {episodes.map((e) => (
              <tr key={e.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{e.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{e.maxTemp}°C</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.durationDays}d</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-wrap gap-1">
                    {e.symptoms.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">{s}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTracker;
