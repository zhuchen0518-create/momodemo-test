import React from 'react';
import { Icons } from './Icon';
import { Button } from './Button';

interface CallHistoryProps {
  onBack: () => void;
  onViewDetails: (id: string) => void;
}

// Mock Data matching the structure in the image
const historyData = [
  {
    id: 'seataaf09bd...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '134****6133',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '视频',
    startTime: '2025-12-01 15:21:00',
    answerTime: '2025-12-01 15:21:51',
    endTime: '2025-12-01 15:23:45',
    duration: '01分54秒',
    score: 98,
  },
  {
    id: 'seataae123b...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '134****6133',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '视频',
    startTime: '2025-12-01 15:15:10',
    answerTime: '2025-12-01 15:15:22',
    endTime: '2025-12-01 15:17:12',
    duration: '01分50秒',
    score: 95,
  },
  {
    id: 'seataa03cc5...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '视频',
    startTime: '2025-12-01 15:06:05',
    answerTime: '2025-12-01 15:06:15',
    endTime: '2025-12-01 15:08:22',
    duration: '02分07秒',
    score: 55, // Low score example
  },
  {
    id: 'seataa6b63...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '视频',
    startTime: '2025-12-01 14:56:30',
    answerTime: '2025-12-01 14:56:45',
    endTime: '2025-12-01 14:58:10',
    duration: '01分25秒',
    score: 88,
  },
  {
    id: 'seataa3ab9f...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '视频',
    startTime: '2025-12-01 14:47:12',
    answerTime: '2025-12-01 14:47:20',
    endTime: '2025-12-01 14:54:11',
    duration: '06分51秒',
    score: 92,
  },
  {
    id: 'seataa19a1e...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '视频',
    startTime: '2025-12-01 14:45:00',
    answerTime: '2025-12-01 14:45:10',
    endTime: '2025-12-01 14:47:05',
    duration: '01分55秒',
    score: 59, // Low score example
  },
  {
    id: 'seataac4518...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '已接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '语音',
    startTime: '2025-12-01 14:44:10',
    answerTime: '2025-12-01 14:44:15',
    endTime: '2025-12-01 14:44:55',
    duration: '00分40秒',
    score: 85,
  },
  {
    id: 'seataa2ed18...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '未接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '语音',
    startTime: '2025-12-01 14:42:00',
    answerTime: '-',
    endTime: '2025-12-01 14:42:30',
    duration: '-',
    score: 0,
  },
  {
    id: 'seataa361bc...',
    agentName: '杨怀',
    agentAccount: 'yanghuai',
    phone: '185****3869',
    status: '未接听',
    direction: '呼出',
    outboundNum: '02569765306',
    type: '语音',
    startTime: '2025-12-01 14:41:15',
    answerTime: '-',
    endTime: '2025-12-01 14:42:00',
    duration: '-',
    score: 0,
  },
];

const FilterSelect = ({ label }: { label: string }) => (
  <div className="relative">
    <select className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5 pr-8 cursor-pointer hover:bg-white transition-colors">
      <option>{label}</option>
      <option>选项 1</option>
      <option>选项 2</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
      <Icons.ChevronDown className="w-4 h-4" />
    </div>
  </div>
);

export const CallHistory: React.FC<CallHistoryProps> = ({ onBack, onViewDetails }) => {
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      
      {/* Header */}
      <div className="flex items-center space-x-2 px-6 py-4 border-b border-slate-200">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 transition-colors flex items-center text-sm font-medium">
          <Icons.ArrowLeft className="w-4 h-4 mr-1" />
          返回
        </button>
        <div className="w-px h-4 bg-slate-300 mx-2"></div>
        <h1 className="text-lg font-bold text-slate-800">5G 通话记录</h1>
      </div>

      {/* Filter Area */}
      <div className="p-6 bg-white border-b border-slate-200">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Agent Name Search */}
          <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 px-3 py-2 w-48">
            <span className="text-sm text-slate-500 mr-2 whitespace-nowrap">坐席名称</span>
            <input type="text" placeholder="请输入" className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-slate-800 placeholder-slate-400" />
            <Icons.Search className="w-4 h-4 text-slate-400" />
          </div>

          {/* Date Range */}
          <div className="flex items-center space-x-2 border border-slate-200 rounded-lg bg-slate-50 px-3 py-2">
            <input type="text" placeholder="开始时间" className="bg-transparent border-none focus:ring-0 text-sm w-32 p-0 text-slate-800 placeholder-slate-400" />
            <span className="text-slate-400">-</span>
            <input type="text" placeholder="结束时间" className="bg-transparent border-none focus:ring-0 text-sm w-32 p-0 text-slate-800 placeholder-slate-400" />
            <Icons.Calendar className="w-4 h-4 text-slate-400" />
          </div>

          {/* Selects */}
          <div className="w-32"><FilterSelect label="通话类型" /></div>
          <div className="w-32"><FilterSelect label="AI人脸比对" /></div>
          <div className="w-32"><FilterSelect label="照片抓拍" /></div>
          <div className="w-32"><FilterSelect label="录制视频" /></div>
          <div className="w-24"><FilterSelect label="小结" /></div>
          <div className="w-32"><FilterSelect label="挂断原因" /></div>

          {/* Export Button */}
          <div className="ml-auto">
             <button className="flex items-center justify-center p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                <Icons.Download className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {[
                '视频会话ID', '坐席名称', '坐席账号', '客户手机号', 
                '接听状态', '呼叫类型', '外显号码', '通话类型', 
                '开始时间', '接听时间', '结束时间', '通话时长', '服务得分', '操作'
              ].map((header) => (
                <th key={header} className="px-4 py-4 text-xs font-semibold text-slate-500 border-b border-slate-200 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {historyData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3 text-sm text-slate-600 font-mono" title={row.id}>{row.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900 font-medium">{row.agentName}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{row.agentAccount}</td>
                <td className="px-4 py-3 text-sm text-slate-900 font-mono flex items-center">
                   {row.phone}
                   {row.status === '已接听' && <Icons.User className="w-3 h-3 text-brand-400 ml-1" />}
                </td>
                <td className="px-4 py-3 text-sm">
                   <span className={`px-2 py-0.5 rounded text-xs font-medium ${row.status === '已接听' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                     {row.status}
                   </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.direction}</td>
                <td className="px-4 py-3 text-sm text-slate-600 font-mono">{row.outboundNum}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{row.type}</td>
                <td className="px-4 py-3 text-xs text-slate-500 font-mono">{row.startTime}</td>
                <td className="px-4 py-3 text-xs text-slate-500 font-mono">{row.answerTime}</td>
                <td className="px-4 py-3 text-xs text-slate-500 font-mono">{row.endTime}</td>
                <td className="px-4 py-3 text-sm text-slate-800 font-mono">{row.duration}</td>
                <td className="px-4 py-3">
                   {/* Score Rendering Logic */}
                   {row.status !== '已接听' ? (
                      <span className="text-slate-300 ml-2">-</span>
                   ) : row.score < 60 ? (
                      // LOW SCORE: Solid Red, High Contrast, No Text Label
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold shadow-md shadow-red-200 ring-2 ring-red-100 animate-pulse">
                         <Icons.AlertTriangle className="w-3.5 h-3.5 mr-1.5 fill-white text-red-600" />
                         {row.score}
                      </span>
                   ) : row.score < 90 ? (
                      // MEDIUM SCORE: Orange Text, No Label
                      <span className="font-bold text-amber-600 font-mono text-base pl-2">{row.score}</span>
                   ) : (
                      // HIGH SCORE: Green Text & Star
                      <div className="flex items-center">
                         <span className="font-bold text-emerald-600 font-mono text-base pl-2">{row.score}</span>
                         <Icons.Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 ml-1.5 drop-shadow-sm" />
                      </div>
                   )}
                </td>
                <td className="px-4 py-3 text-sm">
                   <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => onViewDetails(row.id)}
                        className="text-brand-600 hover:text-brand-700 font-medium text-xs border border-brand-200 hover:bg-brand-50 px-3 py-1 rounded transition-colors"
                      >
                         详情
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination (Mock) */}
      <div className="p-4 border-t border-slate-200 flex justify-end items-center space-x-4 bg-slate-50/50">
         <span className="text-xs text-slate-500">共 128 条记录</span>
         <div className="flex items-center space-x-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
              <Icons.ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded bg-brand-600 text-white text-xs font-bold shadow-sm">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">3</button>
            <span className="text-slate-400 text-xs">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">10</button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              <Icons.ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
};