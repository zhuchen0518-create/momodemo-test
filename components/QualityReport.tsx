import React from 'react';
import { Icons } from './Icon';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, AreaChart, Area } from 'recharts';

interface QualityReportProps {
  onBack: () => void;
}

const pieData = [
  { name: '优秀 (90-100)', value: 45, color: '#22c55e' },
  { name: '合格 (60-89)', value: 35, color: '#3b82f6' },
  { name: '待改进 (<60)', value: 20, color: '#f97316' },
];

const barData = [
  { name: '开场白缺失', count: 12 },
  { name: '语速过快', count: 8 },
  { name: '抢话插嘴', count: 15 },
  { name: '未核验身份', count: 3 },
  { name: '风险未提示', count: 5 },
  { name: '结束语不规范', count: 9 },
];

const trendData = [
  { name: '周一', score: 88, calls: 320 },
  { name: '周二', score: 92, calls: 450 },
  { name: '周三', score: 85, calls: 380 },
  { name: '周四', score: 90, calls: 410 },
  { name: '周五', score: 94, calls: 520 },
  { name: '周六', score: 91, calls: 230 },
  { name: '周日', score: 95, calls: 180 },
];

const agentRanking = [
  { id: 1, name: '杨怀', calls: 124, score: 98.5, trend: 'up' },
  { id: 2, name: '李晓华', calls: 98, score: 96.2, trend: 'up' },
  { id: 3, name: '张伟', calls: 112, score: 94.8, trend: 'down' },
  { id: 4, name: '王芳', calls: 87, score: 92.5, trend: 'up' },
  { id: 5, name: '陈静', calls: 105, score: 89.4, trend: 'down' },
  { id: 6, name: '刘强', calls: 92, score: 88.7, trend: 'down' },
  { id: 7, name: '赵敏', calls: 115, score: 87.2, trend: 'up' },
];

export const QualityReport: React.FC<QualityReportProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 font-sans overflow-y-auto custom-scrollbar">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors md:hidden">
            <Icons.ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-800 flex items-center">
              智能质检报表
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              数据更新时间：2023-10-24 16:30:00
            </p>
          </div>
        </div>
        
        {/* Date Filter */}
        <div className="flex items-center space-x-2 bg-slate-100/50 border border-slate-200 rounded-lg p-1">
           {['今日', '本周', '本月', '自定义'].map((t, i) => (
             <button key={t} className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${i === 1 ? 'bg-white shadow text-brand-600' : 'text-slate-500 hover:bg-slate-200/50'}`}>
               {t}
             </button>
           ))}
        </div>
      </div>

      <div className="p-6 w-full space-y-4">
         
         {/* KPI Cards - More Compact & Horizontal */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Icons.FileCheck className="w-16 h-16 text-brand-600" />
               </div>
               <div className="flex justify-between items-start z-10">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">质检通话总量</p>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">2,845</h3>
                  </div>
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                     <Icons.FileCheck className="w-5 h-5" />
                  </div>
               </div>
               <div className="flex items-center z-10 mt-auto">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center border border-green-100">
                     <Icons.TrendingUp className="w-3 h-3 mr-1" /> +12%
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2">较上周环比</span>
               </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Icons.Check className="w-16 h-16 text-green-600" />
               </div>
               <div className="flex justify-between items-start z-10">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">合格率</p>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">96.8%</h3>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg text-green-600">
                     <Icons.Check className="w-5 h-5" />
                  </div>
               </div>
               <div className="flex items-center z-10 mt-auto">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center border border-green-100">
                     <Icons.TrendingUp className="w-3 h-3 mr-1" /> +2.5%
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2">较上周环比</span>
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Icons.PieChart className="w-16 h-16 text-purple-600" />
               </div>
               <div className="flex justify-between items-start z-10">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">平均得分</p>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">92.4</h3>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                     <Icons.PieChart className="w-5 h-5" />
                  </div>
               </div>
               <div className="flex items-center z-10 mt-auto">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex items-center border border-slate-200">
                     - 0.0%
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2">保持平稳</span>
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Icons.AlertCircle className="w-16 h-16 text-orange-600" />
               </div>
               <div className="flex justify-between items-start z-10">
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">致命项违规</p>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight">12</h3>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                     <Icons.AlertCircle className="w-5 h-5" />
                  </div>
               </div>
               <div className="flex items-center z-10 mt-auto">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center border border-red-100">
                     <Icons.TrendingUp className="w-3 h-3 mr-1" /> +5
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2">需重点关注</span>
               </div>
            </div>
         </div>

         {/* Charts Area */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Score Distribution */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-1 flex flex-col">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-slate-800 text-sm">评分分布</h3>
                 <button className="text-slate-400 hover:text-slate-600"><Icons.More className="w-4 h-4" /></button>
               </div>
               <div className="flex-1 min-h-[220px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px'}}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-2xl font-bold text-slate-800">92.4</span>
                     <span className="text-xs text-slate-400">平均分</span>
                  </div>
               </div>
               <div className="flex justify-center gap-3 mt-2">
                  {pieData.map((entry) => (
                     <div key={entry.name} className="flex items-center text-[10px] text-slate-500 font-medium">
                        <span className="w-2 h-2 rounded-full mr-1.5" style={{backgroundColor: entry.color}}></span>
                        {entry.name.split(' ')[0]}
                     </div>
                  ))}
               </div>
            </div>

            {/* Quality Trend - Combined Chart */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col">
               <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                     <h3 className="font-bold text-slate-800 text-sm">质检趋势分析</h3>
                     <div className="flex space-x-3">
                        <span className="flex items-center text-[10px] text-slate-500"><span className="w-2 h-2 rounded-full bg-brand-500 mr-1"></span> 得分</span>
                        <span className="flex items-center text-[10px] text-slate-500"><span className="w-2 h-2 rounded-full bg-slate-300 mr-1"></span> 通话量</span>
                     </div>
                  </div>
                  <div className="flex bg-slate-100 rounded p-0.5">
                     <button className="px-2 py-0.5 text-[10px] bg-white shadow-sm rounded text-slate-700 font-medium">近7天</button>
                     <button className="px-2 py-0.5 text-[10px] text-slate-500 hover:text-slate-700">近30天</button>
                  </div>
               </div>
               <div className="flex-1 w-full min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} domain={[80, 100]} />
                        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                        <Tooltip 
                           contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px'}}
                        />
                        <Area yAxisId="left" type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" activeDot={{r: 5}} name="质检得分" />
                        <Line yAxisId="right" type="monotone" dataKey="calls" stroke="#cbd5e1" strokeWidth={2} dot={false} name="通话量" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* Bottom Row */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             
             {/* Top Defects */}
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[340px]">
                <h3 className="font-bold text-slate-800 text-sm mb-4">高频违规点分布</h3>
                <div className="flex-1">
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical" margin={{left: 0, right: 20, bottom: 0, top: 0}} barCategoryGap={15}>
                         <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                         <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} hide />
                         <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={70} tick={{fill: '#475569', fontSize: 11, fontWeight: 500}} />
                         <Tooltip 
                            cursor={{fill: '#f8fafc'}} 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px'}}
                         />
                         <Bar dataKey="count" fill="#f43f5e" radius={[0, 4, 4, 0]} barSize={16} name="违规次数">
                         </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Agent Ranking - Tighter Layout */}
             <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[340px]">
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                   <h3 className="font-bold text-slate-800 text-sm">坐席质量红黑榜</h3>
                   <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">查看全部</button>
                </div>
                <div className="flex-1 overflow-auto custom-scrollbar">
                  <table className="w-full text-left text-xs">
                     <thead className="bg-white sticky top-0 z-10">
                        <tr className="text-slate-400 border-b border-slate-100">
                           <th className="pl-5 py-3 font-medium w-16">排名</th>
                           <th className="py-3 font-medium">坐席姓名</th>
                           <th className="py-3 font-medium">通话数</th>
                           <th className="py-3 font-medium">平均分</th>
                           <th className="pr-5 py-3 font-medium text-right">趋势</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {agentRanking.map((agent, idx) => (
                           <tr key={agent.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="pl-5 py-2.5">
                                 <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                                    idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    idx === 1 ? 'bg-slate-200 text-slate-700' :
                                    idx === 2 ? 'bg-orange-100 text-orange-700' : 'text-slate-400 font-normal'
                                 }`}>
                                    {idx + 1}
                                 </span>
                              </td>
                              <td className="py-2.5 font-medium text-slate-700">{agent.name}</td>
                              <td className="py-2.5 text-slate-500 font-mono">{agent.calls}</td>
                              <td className="py-2.5 font-bold text-slate-800">{agent.score}</td>
                              <td className="pr-5 py-2.5 text-right">
                                 {agent.trend === 'up' ? (
                                    <div className="inline-flex items-center text-green-500 bg-green-50 px-1.5 py-0.5 rounded">
                                       <Icons.TrendingUp className="w-3 h-3 mr-1" /> <span className="text-[10px]">升</span>
                                    </div>
                                 ) : (
                                    <div className="inline-flex items-center text-red-400 bg-red-50 px-1.5 py-0.5 rounded">
                                       <Icons.TrendingUp className="w-3 h-3 mr-1 rotate-180" /> <span className="text-[10px]">降</span>
                                    </div>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};