import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';
import { Button } from './Button';
import { recentCalls, dailyStats } from '../services/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  onStartCall: () => void;
  onViewDetails: (id: string) => void;
  onOpenBacktrace: () => void;
}

// Updated Status Definitions
// OFFLINE: 离线
// PREPARING: 准备中 (Signed in, but not ready to take calls)
// AVAILABLE: 在线接听中 (Ready/Idle)
// BUSY: 忙碌中 (Busy/Break)
type AgentStatus = 'OFFLINE' | 'PREPARING' | 'AVAILABLE' | 'BUSY';

const data = [
  { name: '09:00', calls: 4 },
  { name: '10:00', calls: 7 },
  { name: '11:00', calls: 12 },
  { name: '12:00', calls: 5 },
  { name: '13:00', calls: 8 },
  { name: '14:00', calls: 10 },
  { name: '15:00', calls: 6 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onStartCall, onViewDetails, onOpenBacktrace }) => {
  // Start as OFFLINE to demonstrate the flow
  const [status, setStatus] = useState<AgentStatus>('OFFLINE');
  const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'info' }>({ 
    show: false, message: '', type: 'success' 
  });

  // Handle Toast Disappearance
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleSignIn = () => {
    // Simulate API call
    setTimeout(() => {
      setStatus('PREPARING'); // First go to PREPARING state
      showToast('签入成功');
    }, 500);
  };

  const handleSignOut = () => {
    setStatus('OFFLINE');
    showToast('签出成功');
  };

  const setAvailable = () => {
    setStatus('AVAILABLE');
    showToast('已示闲，开始接听');
  }

  const setBusy = () => {
    setStatus('BUSY');
    showToast('已示忙，暂停接听', 'info');
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50 p-6 lg:p-8 relative">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-3">
            <Icons.Check className="w-5 h-5 text-green-400" />
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">坐席工作台</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <div className="flex items-baseline mt-2">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                {idx === 0 && <span className="ml-2 text-xs text-green-600 font-medium">↑ 12%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
              <Icons.Monitor className="w-5 h-5 mr-2 text-slate-400" />
              话务量趋势
            </h2>
            <select className="text-sm border-slate-200 rounded-lg shadow-sm focus:ring-brand-500 py-1.5 px-3 bg-slate-50 hover:bg-white cursor-pointer transition-colors">
              <option>今天</option>
              <option>昨天</option>
              <option>本周</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '8px 12px'}}
                  labelStyle={{color: '#64748b', marginBottom: '4px', fontSize: '12px'}}
                  itemStyle={{color: '#0f172a', fontWeight: 'bold'}}
                />
                <Bar dataKey="calls" name="通话数" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
           <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
             <Icons.More className="w-5 h-5 mr-2 text-slate-400" />
             快捷操作
           </h2>
           <div className="space-y-4 mb-auto">
             <Button 
               onClick={onStartCall} 
               disabled={status !== 'AVAILABLE'}
               className={`w-full justify-start h-14 text-lg shadow-lg group transition-all ${
                 status === 'AVAILABLE' 
                 ? 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-brand-200/50' 
                 : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
               }`}
             >
               <div className={`p-1.5 rounded-full mr-3 transition-colors ${status === 'AVAILABLE' ? 'bg-white/20 group-hover:bg-white/30' : 'bg-slate-200'}`}>
                 <Icons.Phone className="h-5 w-5" />
               </div>
               {status === 'AVAILABLE' ? '发起呼叫' : status === 'OFFLINE' ? '请先签入' : '请先示闲'}
             </Button>
             
             <Button 
               onClick={onOpenBacktrace}
               variant="secondary" 
               className="w-full justify-start h-12 hover:bg-slate-50 transition-colors group"
             >
               <div className="bg-slate-100 p-1.5 rounded-full mr-3 group-hover:bg-white transition-colors">
                 <Icons.History className="h-5 w-5 text-slate-500" />
               </div>
               记录回溯
             </Button>
           </div>
           
           <div className="mt-8 pt-6 border-t border-slate-100">
             <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500 font-medium">坐席状态</span>
                
                {/* Status Badge */}
                {status === 'AVAILABLE' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200 transition-all">
                    <span className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                    在线接听中
                  </span>
                )}
                {status === 'PREPARING' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 transition-all">
                     <Icons.Clock className="w-3 h-3 mr-1.5" />
                     准备中
                  </span>
                )}
                {status === 'BUSY' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 transition-all">
                    <span className="w-2 h-2 mr-2 bg-red-500 rounded-full"></span>
                    忙碌中
                  </span>
                )}
                {status === 'OFFLINE' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 transition-all">
                    <span className="w-2 h-2 mr-2 bg-slate-400 rounded-full"></span>
                    离线中
                  </span>
                )}
             </div>

             {/* Status Controls */}
             <div className="bg-slate-50 rounded-xl p-2 border border-slate-200 flex space-x-2">
                {status === 'OFFLINE' ? (
                  <Button onClick={handleSignIn} className="w-full bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-200">
                    <Icons.LogIn className="w-4 h-4 mr-2" />
                    签入系统
                  </Button>
                ) : (
                  <>
                    {/* State Toggle Button */}
                    {(status === 'PREPARING' || status === 'BUSY') && (
                       <button 
                         onClick={setAvailable}
                         className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold transition-all border bg-green-100 text-green-700 border-green-200 hover:bg-green-200 shadow-sm"
                       >
                         <Icons.UserCheck className="w-4 h-4 mr-2" />
                         示闲 (开始接听)
                       </button>
                    )}

                    {status === 'AVAILABLE' && (
                       <button 
                         onClick={setBusy}
                         className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold transition-all border bg-white text-slate-600 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                       >
                         <Icons.Coffee className="w-4 h-4 mr-2" />
                         示忙 (暂停)
                       </button>
                    )}
                    
                    {/* Sign Out Button */}
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center justify-center p-2 rounded-lg bg-white text-slate-400 border border-slate-200 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                      title="签出"
                    >
                      <Icons.Power className="w-4 h-4" />
                    </button>
                  </>
                )}
             </div>
           </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center">
            <Icons.History className="w-5 h-5 mr-2 text-slate-400" />
            最近通话记录
          </h2>
          <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700 hover:bg-brand-50">查看全部</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">客户信息</th>
                <th className="px-6 py-4 font-medium">类型</th>
                <th className="px-6 py-4 font-medium">开始时间</th>
                <th className="px-6 py-4 font-medium">通话时长</th>
                <th className="px-6 py-4 font-medium">状态</th>
                <th className="px-6 py-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentCalls.map((call) => (
                <tr key={call.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 mr-3 font-bold">
                      {call.customerName.charAt(0)}
                    </div>
                    <div>
                      {call.customerName}
                      <span className="text-slate-400 font-normal block text-xs">{call.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${call.type === 'Video' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                      {call.type === 'Video' ? <Icons.Video className="w-3 h-3 mr-1.5" /> : <Icons.Phone className="w-3 h-3 mr-1.5" />}
                      {call.type === 'Video' ? '5G 视频' : '语音通话'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono">{call.startTime}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono">{call.duration}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                       call.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                       call.status === 'Missed' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
                     }`}>
                      {call.status === 'Completed' ? <Icons.Check className="w-3 h-3 mr-1" /> : null}
                      {call.status === 'Completed' ? '已完成' : call.status === 'Missed' ? '未接通' : '已取消'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onViewDetails(call.id)}
                      className="text-brand-600 hover:text-brand-800 font-medium text-xs border border-brand-200 hover:bg-brand-50 px-3 py-1 rounded transition-colors"
                    >
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};