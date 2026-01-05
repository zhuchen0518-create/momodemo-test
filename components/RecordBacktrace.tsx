import React, { useState } from 'react';
import { Icons } from './Icon';
import { Button } from './Button';

interface RecordBacktraceProps {
  onBack: () => void;
}

// Mock Data for the Timeline
const timelineEvents = [
  {
    id: 1,
    type: 'CALL_VIDEO',
    time: '2023-10-24 15:06:22',
    title: '5G 视频面审通话',
    user: '杨先生',
    desc: '完成身份核验，确认贷款意向，签署征信授权书。',
    status: 'success',
    duration: '12分 30秒'
  },
  {
    id: 2,
    type: 'SYSTEM_ALERT',
    time: '2023-10-24 15:05:10',
    title: '系统风控预警',
    user: '系统自动',
    desc: '检测到客户短时间内频繁发起申请，建议坐席加强核验。',
    status: 'warning'
  },
  {
    id: 3,
    type: 'DOC_SIGN',
    time: '2023-10-24 14:58:00',
    title: '电子合同签署',
    user: '杨先生',
    desc: '《个人征信查询授权书》已完成签署，CA证书校验通过。',
    status: 'success'
  },
  {
    id: 4,
    type: 'CALL_AUDIO',
    time: '2023-10-24 14:45:30',
    title: '语音咨询通话',
    user: '杨先生',
    desc: '客户咨询车贷利率及还款方式，引导其进行视频面审。',
    status: 'success',
    duration: '05分 12秒'
  },
  {
    id: 5,
    type: 'SMS_SENT',
    time: '2023-10-24 14:40:00',
    title: '5G 消息推送',
    user: '系统自动',
    desc: '向客户发送“车贷办理指南”卡片消息，包含视频接入链接。',
    status: 'info'
  },
  {
    id: 6,
    type: 'APP_LOGIN',
    time: '2023-10-24 14:38:12',
    title: '移动端登录',
    user: '杨先生',
    desc: '客户通过 Android 客户端登录，IP: 114.222.xx.xx (江苏南京)。',
    status: 'info'
  }
];

export const RecordBacktrace: React.FC<RecordBacktraceProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'CALL_VIDEO': return <Icons.Video className="w-5 h-5 text-white" />;
      case 'CALL_AUDIO': return <Icons.Phone className="w-5 h-5 text-white" />;
      case 'SYSTEM_ALERT': return <Icons.ShieldAlert className="w-5 h-5 text-white" />;
      case 'DOC_SIGN': return <Icons.FileSignature className="w-5 h-5 text-white" />;
      case 'SMS_SENT': return <Icons.MessageSquare className="w-5 h-5 text-white" />;
      default: return <Icons.User className="w-5 h-5 text-white" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'CALL_VIDEO': return 'bg-brand-500';
      case 'CALL_AUDIO': return 'bg-blue-400';
      case 'SYSTEM_ALERT': return 'bg-orange-500';
      case 'DOC_SIGN': return 'bg-green-500';
      case 'SMS_SENT': return 'bg-indigo-400';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icons.ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center">
              业务轨迹回溯
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              全链路复原客户服务旅程与系统交互记录
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center space-x-4 shrink-0">
         <div className="relative w-72">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="输入客户姓名 / 手机号 / ID" 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         
         <div className="h-8 w-px bg-slate-200 mx-2"></div>
         
         <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors">
            <Icons.Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-700">2023-10-24</span>
            <Icons.ArrowRight className="w-3 h-3 text-slate-400" />
            <span className="text-sm text-slate-700">2023-10-24</span>
         </div>

         <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-slate-100 transition-colors">
            <Icons.Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-700">全部类型</span>
         </div>
         
         <Button className="ml-auto">
            查询轨迹
         </Button>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-8 relative">
         <div className="max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 md:left-24 top-0 bottom-0 w-0.5 bg-slate-200 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-8">
               {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative flex flex-col md:flex-row items-start md:items-center group">
                     
                     {/* Time Stamp (Left Side) */}
                     <div className="md:w-24 md:text-right md:pr-8 mb-2 md:mb-0 shrink-0">
                        <div className="text-sm font-bold text-slate-800">{event.time.split(' ')[1]}</div>
                        <div className="text-xs text-slate-400 font-mono">{event.time.split(' ')[0]}</div>
                     </div>

                     {/* Icon Node */}
                     <div className={`absolute left-0 md:left-24 top-0 md:top-1/2 transform md:-translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center z-10 ${getBgColor(event.type)}`}>
                        {getIcon(event.type)}
                     </div>

                     {/* Card Content */}
                     <div className="ml-8 md:ml-12 flex-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative">
                        {/* Connecting Line for mobile */}
                        <div className="absolute left-[-30px] top-5 w-8 h-0.5 bg-slate-200 md:hidden"></div>

                        <div className="flex justify-between items-start mb-2">
                           <div>
                              <div className="flex items-center space-x-2">
                                 <h3 className="font-bold text-slate-800 text-base">{event.title}</h3>
                                 {event.type.includes('CALL') && (
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                                       {event.duration}
                                    </span>
                                 )}
                                 {event.status === 'warning' && (
                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded border border-orange-200 font-bold flex items-center">
                                       <Icons.AlertTriangle className="w-3 h-3 mr-1" /> 高风险
                                    </span>
                                 )}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                 操作人: <span className="font-medium text-slate-700">{event.user}</span>
                              </p>
                           </div>
                           <Button variant="ghost" size="sm" className="text-brand-600 hover:bg-brand-50">
                              查看详情
                           </Button>
                        </div>
                        
                        <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                           {event.desc}
                        </div>

                        {/* Attachments (Mock) */}
                        {event.type === 'DOC_SIGN' && (
                           <div className="mt-3 flex gap-2">
                              <div className="flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-xs rounded border border-green-100 cursor-pointer hover:bg-green-100">
                                 <Icons.FileText className="w-3 h-3 mr-1.5" /> 已签署_征信授权书.pdf
                              </div>
                           </div>
                        )}
                        {event.type === 'SYSTEM_ALERT' && (
                           <div className="mt-3 flex gap-2">
                              <div className="flex items-center px-3 py-1.5 bg-orange-50 text-orange-700 text-xs rounded border border-orange-100 cursor-pointer hover:bg-orange-100">
                                 <Icons.Monitor className="w-3 h-3 mr-1.5" /> 风险画像快照
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               ))}
               
               {/* End Node */}
               <div className="relative flex flex-col md:flex-row items-center">
                   <div className="md:w-24 md:pr-8 shrink-0"></div>
                   <div className="absolute left-0 md:left-24 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-slate-300 border-2 border-white"></div>
                   <div className="ml-12 text-xs text-slate-400 italic">
                      仅展示最近 3 天的轨迹记录
                   </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};