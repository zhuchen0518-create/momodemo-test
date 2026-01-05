import React, { useState } from 'react';
import { Icons } from './Icon';
import { Button } from './Button';
import { mockCustomer } from '../services/mockData';

interface CallDetailsProps {
  callId: string;
  onBack: () => void;
}

type DetailTab = 'BASIC' | 'TRANSCRIPT' | 'QA' | 'SUMMARY' | 'LOCATION';

export const CallDetails: React.FC<CallDetailsProps> = ({ callId, onBack }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('BASIC');
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock QA Data
  const qaItems = [
    { id: 1, time: '00:05', label: '标准开场白', status: 'pass', desc: '坐席使用了标准问候语 "您好，我是..."', emotion: '平静' },
    { id: 2, time: '00:45', label: '身份核验', status: 'pass', desc: '完成客户人脸比对与身份证OCR', emotion: '平静' },
    { id: 3, time: '02:10', label: '风险提示', status: 'pass', desc: '清晰宣读了贷款风险告知书', emotion: '疑惑' },
    { id: 4, time: '03:30', label: '礼貌用语', status: 'warning', desc: '客户打断时未及时安抚', emotion: '焦虑' },
    { id: 5, time: '05:00', label: '标准结束语', status: 'pass', desc: '结束语规范', emotion: '满意' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 h-16 shadow-sm z-20">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icons.ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-800 flex items-center">
              通话详情
              <span className="ml-3 px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200 font-mono font-normal">ID: {callId}</span>
            </h1>
            <p className="text-xs text-slate-500 flex items-center mt-0.5">
              <Icons.Clock className="w-3 h-3 mr-1" /> 2023-10-24 15:06:22
              <span className="mx-2 text-slate-300">|</span>
              <Icons.Video className="w-3 h-3 mr-1" /> 5G 视频通话
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
           <Button variant="secondary" size="sm">
             <Icons.Share className="w-4 h-4 mr-2" /> 分享记录
           </Button>
           <Button size="sm">
             <Icons.FileText className="w-4 h-4 mr-2" /> 导出报告
           </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Column: Video Player - Width reduced naturally by increasing right column width */}
        <div className="flex-1 bg-slate-900 flex flex-col relative overflow-hidden group">
           
           {/* Main Video Area */}
           <div className="flex-1 relative flex items-center justify-center bg-black">
              {/* Fake Video Content */}
              <img 
                src={mockCustomer.avatar} 
                alt="Video Recording" 
                className="h-full w-full object-contain opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

              {/* Play Button Overlay */}
              {!isPlaying && (
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="absolute z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/30 group-hover:block"
                >
                  <Icons.Play className="w-10 h-10 text-white fill-current ml-1" />
                </button>
              )}

              {/* Watermark */}
              <div className="absolute top-4 right-4 text-white/30 font-bold text-xl select-none pointer-events-none">
                5G Smart Record
              </div>
           </div>

           {/* Video Controls / Timeline */}
           <div className="h-24 bg-slate-900 border-t border-slate-700 px-6 py-4 shrink-0 z-10">
              {/* Progress Bar */}
              <div className="relative h-1.5 bg-slate-700 rounded-full mb-4 cursor-pointer group/timeline">
                <div className="absolute top-0 left-0 h-full w-[35%] bg-brand-500 rounded-full relative">
                  <div className="absolute right-0 -top-1.5 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/timeline:scale-100 transition-transform"></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-400 transition-colors">
                    {isPlaying ? <Icons.Pause className="w-6 h-6 fill-current" /> : <Icons.Play className="w-6 h-6 fill-current" />}
                  </button>
                  <span className="text-sm font-mono text-slate-400">04:22 / 12:30</span>
                </div>
                <div className="flex items-center space-x-4">
                   <button className="text-xs font-medium text-slate-400 hover:text-white border border-slate-600 rounded px-2 py-0.5">1.0x</button>
                   <Icons.Expand className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
           </div>
        </div>

        {/* Right Column: Analysis Tabs - Width increased to 600px */}
        <div className="w-[600px] bg-white border-l border-slate-200 flex flex-col shadow-xl z-10 transition-all duration-300">
           
           {/* Tabs */}
           <div className="flex border-b border-slate-200">
             {[
               { id: 'BASIC', label: '基础信息', icon: Icons.FileBadge },
               { id: 'TRANSCRIPT', label: '语音转写', icon: Icons.MessageSquare },
               { id: 'QA', label: 'AI 质检', icon: Icons.FileCheck },
               { id: 'SUMMARY', label: '通话小结', icon: Icons.FileText },
               { id: 'LOCATION', label: '定位轨迹', icon: Icons.Location },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as DetailTab)}
                 className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 border-b-2 transition-colors ${
                   activeTab === tab.id 
                     ? 'border-brand-600 text-brand-600 bg-brand-50/50' 
                     : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                 }`}
               >
                 <tab.icon className="w-4 h-4" />
                 <span>{tab.label}</span>
               </button>
             ))}
           </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto bg-slate-50/50 custom-scrollbar">
             
             {/* BASIC INFO TAB */}
             {activeTab === 'BASIC' && (
                <div className="p-6 space-y-6">
                   {/* 1. Customer Info */}
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                        <Icons.User className="w-4 h-4 mr-2 text-brand-500" />
                        客户基础信息
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">客户姓名</p>
                          <p className="text-sm font-semibold text-slate-800 flex items-center">
                            {mockCustomer.name}
                            <span className="ml-2 px-1.5 py-0.5 bg-brand-50 text-brand-700 text-[10px] rounded border border-brand-100">已实名</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">手机号码 (脱敏)</p>
                          <p className="text-sm font-mono text-slate-800">{mockCustomer.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">身份证号 (脱敏)</p>
                          <p className="text-sm font-mono text-slate-800">{mockCustomer.idNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">客户类型</p>
                          <p className="text-sm text-slate-800">高价值存量客户</p>
                        </div>
                      </div>
                   </div>

                   {/* 2. Call Metadata */}
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                        <Icons.Phone className="w-4 h-4 mr-2 text-brand-500" />
                        通话基础数据
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">视频会话 ID</p>
                          <p className="text-sm font-mono text-slate-800">{callId}</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 mb-1">接听坐席</p>
                           <p className="text-sm text-slate-800">杨怀 (88219)</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 mb-1">开始时间</p>
                           <p className="text-sm font-mono text-slate-800">2023-10-24 15:06:22</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 mb-1">通话时长</p>
                           <p className="text-sm font-mono text-slate-800">12分 30秒</p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 mb-1">呼叫类型</p>
                           <p className="text-sm text-slate-800 flex items-center">
                             <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                             视频呼出
                           </p>
                        </div>
                        <div>
                           <p className="text-xs text-slate-400 mb-1">挂断原因</p>
                           <p className="text-sm text-slate-800">客户正常挂机</p>
                        </div>
                      </div>
                   </div>

                   {/* 3. Captured Images / Evidence */}
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                        <Icons.Image className="w-4 h-4 mr-2 text-brand-500" />
                        采集影像资料
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                        {/* ID Front */}
                        <div className="group cursor-pointer">
                           <div className="aspect-[3/2] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative mb-2">
                             <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                <Icons.Card className="w-8 h-8" />
                             </div>
                             {/* Overlay */}
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Icons.Expand className="text-white w-6 h-6" />
                             </div>
                           </div>
                           <p className="text-xs text-center text-slate-600 font-medium">身份证人像面</p>
                           <p className="text-[10px] text-center text-slate-400">15:07:12 采集</p>
                        </div>

                        {/* ID Back */}
                        <div className="group cursor-pointer">
                           <div className="aspect-[3/2] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative mb-2">
                             <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                <Icons.Card className="w-8 h-8" />
                             </div>
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Icons.Expand className="text-white w-6 h-6" />
                             </div>
                           </div>
                           <p className="text-xs text-center text-slate-600 font-medium">身份证国徽面</p>
                           <p className="text-[10px] text-center text-slate-400">15:07:18 采集</p>
                        </div>

                        {/* Face Match */}
                        <div className="group cursor-pointer">
                           <div className="aspect-[3/2] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 relative mb-2">
                             <img src={mockCustomer.avatar} className="w-full h-full object-cover" alt="face" />
                             <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow-sm">
                               98.5%
                             </div>
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Icons.Expand className="text-white w-6 h-6" />
                             </div>
                           </div>
                           <p className="text-xs text-center text-slate-600 font-medium">人脸比对截图</p>
                           <p className="text-[10px] text-center text-slate-400">15:08:45 采集</p>
                        </div>
                      </div>
                   </div>

                   {/* 4. Remarks (New) */}
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                        <Icons.Edit className="w-4 h-4 mr-2 text-brand-500" />
                        通话备注
                      </h3>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-sm text-slate-700 leading-relaxed">
                         客户对德助AX车型非常感兴趣，已确认贷款细节。但在首付比例上稍微有些犹豫，建议后续跟进时重点介绍我们的低首付优惠政策。已预约下周二进行线下签约。
                      </div>
                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-slate-400">最后编辑：杨怀 (2023-10-24 15:18:05)</span>
                      </div>
                   </div>
                </div>
             )}
             
             {/* Transcript Tab */}
             {activeTab === 'TRANSCRIPT' && (
                <div className="flex flex-col h-full">
                    {/* Search / Filter header for transcript */}
                    <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
                        <div className="relative">
                            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input type="text" placeholder="搜索通话内容..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                        </div>
                    </div>
                    <div className="flex-1 p-6 space-y-6">
                       
                       <div className="flex justify-center mb-4">
                           <span className="text-xs text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">2023-10-24 15:06:22 通话开始</span>
                       </div>

                       {/* Agent */}
                       <div className="flex flex-row-reverse items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow-sm border-2 border-white">我</div>
                           <div className="flex flex-col items-end max-w-[85%]">
                               <div className="bg-brand-50 p-3.5 rounded-2xl rounded-tr-none border border-brand-100 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-brand-100/50 transition-colors">
                                   杨先生您好，我是5G智联平台的坐席专员工号88219。很高兴为您服务，请问您现在方便进行视频面审吗？
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 mr-1">00:05</span>
                           </div>
                       </div>

                       {/* Customer */}
                       <div className="flex items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs shrink-0 mt-1 font-bold shadow-sm border-2 border-white">杨</div>
                           <div className="flex flex-col items-start max-w-[85%]">
                               <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-white transition-colors">
                                   方便的，我现在就在车里，信号应该没问题。
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 ml-1">00:12</span>
                           </div>
                       </div>

                       {/* Agent */}
                       <div className="flex flex-row-reverse items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow-sm border-2 border-white">我</div>
                           <div className="flex flex-col items-end max-w-[85%]">
                               <div className="bg-brand-50 p-3.5 rounded-2xl rounded-tr-none border border-brand-100 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-brand-100/50 transition-colors">
                                   好的，那我们现在开始。首先需要核对您的身份信息，请您注视屏幕，根据提示完成眨眼动作。
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 mr-1">00:18</span>
                           </div>
                       </div>

                       {/* System Note */}
                       <div className="flex justify-center my-2">
                           <span className="text-[10px] text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-100 flex items-center">
                               <Icons.Check className="w-3 h-3 mr-1" /> 系统：人脸识别通过 (00:25)
                           </span>
                       </div>

                       {/* Customer */}
                       <div className="flex items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs shrink-0 mt-1 font-bold shadow-sm border-2 border-white">杨</div>
                           <div className="flex flex-col items-start max-w-[85%]">
                               <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-white transition-colors">
                                   好的，我已经照做了。
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 ml-1">00:28</span>
                           </div>
                       </div>

                       {/* Agent */}
                       <div className="flex flex-row-reverse items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow-sm border-2 border-white">我</div>
                           <div className="flex flex-col items-end max-w-[85%]">
                               <div className="bg-brand-50 p-3.5 rounded-2xl rounded-tr-none border border-brand-100 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-brand-100/50 transition-colors">
                                   感谢配合。接下来向您确认贷款详情。您申请的是德助AX车型消费贷，金额15万元，分24期偿还，年化利率4.5%，还款方式为等额本息。请问您确认无误吗？
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 mr-1">00:35</span>
                           </div>
                       </div>

                        {/* Customer */}
                        <div className="flex items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs shrink-0 mt-1 font-bold shadow-sm border-2 border-white">杨</div>
                           <div className="flex flex-col items-start max-w-[85%]">
                               <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-white transition-colors">
                                   确认，没有问题。
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 ml-1">00:48</span>
                           </div>
                       </div>

                       {/* Agent */}
                       <div className="flex flex-row-reverse items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow-sm border-2 border-white">我</div>
                           <div className="flex flex-col items-end max-w-[85%]">
                               <div className="bg-brand-50 p-3.5 rounded-2xl rounded-tr-none border border-brand-100 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-brand-100/50 transition-colors">
                                   好的。最后需要您在线签署《个人征信授权书》及《贷款合同》。文件已发送至您的屏幕，请仔细阅读后点击确认签署。
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 mr-1">00:52</span>
                           </div>
                       </div>

                       {/* System Note */}
                       <div className="flex justify-center my-2">
                           <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center">
                               <Icons.FileSignature className="w-3 h-3 mr-1" /> 系统：客户已完成电子签署 (01:15)
                           </span>
                       </div>

                        {/* Agent */}
                        <div className="flex flex-row-reverse items-start gap-3 group">
                           <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1 shadow-sm border-2 border-white">我</div>
                           <div className="flex flex-col items-end max-w-[85%]">
                               <div className="bg-brand-50 p-3.5 rounded-2xl rounded-tr-none border border-brand-100 text-sm text-slate-800 shadow-sm leading-relaxed group-hover:bg-brand-100/50 transition-colors">
                                   手续已办理完毕。审核结果将在24小时内短信通知您。感谢您的使用，再见。
                               </div>
                               <span className="text-[10px] text-slate-400 mt-1 mr-1">01:22</span>
                           </div>
                       </div>
                    </div>
                </div>
             )}
             
             {/* QA Tab */}
             {activeTab === 'QA' && (
               <div className="space-y-6 p-6">
                 {/* Score Card - Expanded Layout */}
                 <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                       <div>
                          <h3 className="text-slate-500 text-sm font-medium">综合质检得分</h3>
                          <div className="flex items-baseline mt-1">
                             <span className="text-4xl font-bold text-slate-900">98</span>
                             <span className="text-sm text-slate-400 ml-1">/ 100</span>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold border border-green-200">A级 优秀</span>
                          <p className="text-xs text-slate-400 mt-1">超过 92% 的通话</p>
                       </div>
                    </div>
                    
                    {/* Detailed Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="flex justify-between text-xs mb-2">
                             <span className="text-slate-500">业务合规性</span>
                             <span className="font-bold text-slate-800">100%</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-brand-500 w-full rounded-full"></div>
                          </div>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="flex justify-between text-xs mb-2">
                             <span className="text-slate-500">服务态度</span>
                             <span className="font-bold text-slate-800">95%</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500 w-[95%] rounded-full"></div>
                          </div>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="flex justify-between text-xs mb-2">
                             <span className="text-slate-500">话术标准度</span>
                             <span className="font-bold text-slate-800">92%</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 w-[92%] rounded-full"></div>
                          </div>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-lg">
                          <div className="flex justify-between text-xs mb-2">
                             <span className="text-slate-500">情绪正向度</span>
                             <span className="font-bold text-slate-800">88%</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full bg-purple-500 w-[88%] rounded-full"></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Timeline List */}
                 <div>
                   <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                     <Icons.History className="w-4 h-4 mr-2 text-slate-400" />
                     质检详情轨迹
                   </h4>
                   <div className="relative pl-4 space-y-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                      {qaItems.map((item) => (
                        <div key={item.id} className="relative pl-6">
                          {/* Dot */}
                          <div className={`absolute left-[-5px] top-4 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${item.status === 'pass' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                          
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex gap-4">
                             <div className="flex-1">
                               <div className="flex justify-between items-center mb-1">
                                 <h4 className="font-bold text-slate-800 text-sm">{item.label}</h4>
                                 <span className="text-xs font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{item.time}</span>
                               </div>
                               <p className="text-xs text-slate-600 leading-relaxed mb-2">{item.desc}</p>
                               <div className="flex items-center gap-3">
                                  <div className={`inline-flex items-center text-xs font-medium ${item.status === 'pass' ? 'text-green-600' : 'text-orange-600'}`}>
                                    {item.status === 'pass' ? <Icons.Check className="w-3 h-3 mr-1" /> : <Icons.AlertCircle className="w-3 h-3 mr-1" />}
                                    {item.status === 'pass' ? '检测通过' : '疑似违规'}
                                  </div>
                                  <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">
                                     客户情绪: {item.emotion}
                                  </span>
                               </div>
                             </div>
                          </div>
                        </div>
                      ))}
                   </div>
                 </div>
               </div>
             )}

             {/* Summary Tab */}
             {activeTab === 'SUMMARY' && (
               <div className="space-y-6 p-6">
                 {/* Key Entities */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4 text-sm flex items-center">
                       <Icons.UserCheck className="w-4 h-4 mr-2 text-brand-500" />
                       关键信息提取
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-xs text-slate-400 block mb-1">客户意向</span>
                          <span className="text-sm font-semibold text-slate-800">极高</span>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-xs text-slate-400 block mb-1">申请金额</span>
                          <span className="text-sm font-semibold text-slate-800">150,000 元</span>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-xs text-slate-400 block mb-1">产品型号</span>
                          <span className="text-sm font-semibold text-slate-800">德助 AX 豪华版</span>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-xs text-slate-400 block mb-1">还款方式</span>
                          <span className="text-sm font-semibold text-slate-800">等额本息</span>
                       </div>
                    </div>
                 </div>

                 {/* Summary Text */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center">
                     <Icons.FileText className="w-4 h-4 mr-2 text-brand-500" />
                     智能摘要
                   </h3>
                   <div className="prose prose-sm text-slate-600">
                     <p className="leading-relaxed">
                       <span className="font-semibold text-slate-800">业务背景：</span>客户杨先生申请汽车消费贷款。
                     </p>
                     <p className="leading-relaxed mt-2">
                       <span className="font-semibold text-slate-800">办理过程：</span>通话中坐席引导客户完成了人脸识别与身份证OCR核验，系统判定一致。坐席详细解释了15万元贷款的利率及"等额本息"还款计划，并宣读了《个人征信授权书》及风险提示。
                     </p>
                     <p className="leading-relaxed mt-2">
                       <span className="font-semibold text-slate-800">客户反馈：</span>客户全程配合，对利率及条款无异议，明确表示同意提交申请。
                     </p>
                   </div>
                 </div>
                 
                 {/* Tags */}
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center">
                     <Icons.Check className="w-4 h-4 mr-2 text-brand-500" />
                     业务标签
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">车贷申请</span>
                     <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100">身份核验通过</span>
                     <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100">高意向客户</span>
                     <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">信用良好</span>
                     <span className="px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full border border-orange-100">首次贷款</span>
                   </div>
                 </div>

                 {/* Todo */}
                 <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 shadow-sm">
                   <h3 className="font-bold text-orange-800 mb-3 text-sm flex items-center">
                     <Icons.AlertTriangle className="w-4 h-4 mr-2" />
                     后续跟进建议
                   </h3>
                   <ul className="space-y-2">
                     <li className="flex items-start text-xs text-orange-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-2"></div>
                        <span>需人工复核收入证明材料（系统提示图片清晰度略低）</span>
                     </li>
                     <li className="flex items-start text-xs text-orange-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 mr-2"></div>
                        <span>跟进放款流程（预计T+1日），建议明天上午发送进度短信。</span>
                     </li>
                   </ul>
                 </div>
               </div>
             )}

             {/* Location Tab */}
             {activeTab === 'LOCATION' && (
               <div className="h-full flex flex-col p-6">
                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-80 relative mb-6 group">
                    {/* Mock Map */}
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/118.7969,32.0603,13,0/600x600?access_token=PLACEHOLDER')] bg-cover bg-center">
                       <div className="relative group-hover:scale-110 transition-transform duration-500">
                         <span className="flex h-6 w-6 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-brand-600 border-4 border-white shadow-xl"></span>
                         </span>
                         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg text-slate-800 border border-slate-100">
                           通话位置
                           <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-t border-l border-slate-100"></div>
                         </div>
                       </div>
                    </div>
                    {/* Map Controls Mock */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                       <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-slate-600 hover:text-brand-600"><Icons.Expand className="w-4 h-4" /></button>
                       <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-slate-600 hover:text-brand-600"><Icons.Location className="w-4 h-4" /></button>
                    </div>
                 </div>

                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                       <div>
                         <p className="text-xs text-slate-500 mb-1">地理位置</p>
                         <p className="text-lg font-bold text-slate-800">江苏省南京市玄武区</p>
                         <p className="text-sm text-slate-500 mt-1">中山路 18号 德基广场二期</p>
                       </div>
                       <div className="flex flex-col items-end">
                          <Icons.Check className="w-6 h-6 text-green-500 mb-1" />
                          <span className="text-xs text-green-600 font-medium">位置校验一致</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                       <div className="flex justify-between items-center">
                         <span className="text-slate-500">网络环境</span>
                         <span className="font-mono font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded">China Mobile 5G</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-slate-500">IP 地址</span>
                         <span className="font-mono font-medium text-slate-700">114.222.xx.xx</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-slate-500">基站 ID</span>
                         <span className="font-mono font-medium text-slate-700">460-00-58392-2</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-slate-500">经纬度</span>
                         <span className="font-mono font-medium text-slate-700">118.79, 32.06</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
                    注：位置信息基于运营商基站数据与 GPS 混合定位，精度约 50 米。
                 </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};