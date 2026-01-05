import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';
import { Button } from './Button';
import { CallStatus, Customer, TabView } from '../types';

interface CallWorkstationProps {
  status: CallStatus;
  customer: Customer;
  onUpgradeToVideo: () => void;
  onHangup: () => void;
}

export const CallWorkstation: React.FC<CallWorkstationProps> = ({ 
  status, 
  customer, 
  onUpgradeToVideo, 
  onHangup 
}) => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.AI_TOOLS);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [remark, setRemark] = useState('');
  
  // Verification States
  const [idScanned, setIdScanned] = useState(false);
  const [faceMatched, setFaceMatched] = useState(false);
  const [fraudCheck, setFraudCheck] = useState({
    q1: false, // "Are you applying for car loan?"
    q2: false, // "Is this voluntary?"
  });

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setCallDuration(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleIdScan = () => {
    setTimeout(() => setIdScanned(true), 1500); // Simulate scan
  };

  const handleFaceMatch = () => {
    setTimeout(() => setFaceMatched(true), 2000); // Simulate AI check
  };

  const isVerified = idScanned && faceMatched && fraudCheck.q1 && fraudCheck.q2;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col md:flex-row h-screen w-screen overflow-hidden font-sans">
      
      {/* --- Main Stage (Video/Audio Area) --- */}
      <div className="flex-1 relative flex flex-col bg-slate-900 overflow-hidden">
        
        {/* Header Overlay (Status Bar) */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
          <div className="flex items-center text-white space-x-4">
             <div className="flex items-center space-x-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                <span className="text-sm font-medium tracking-wide">REC {formatTime(callDuration)}</span>
             </div>
             <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold bg-brand-600/90 text-white px-2 py-1 rounded shadow-sm">
                <span className="text-[10px]">5G</span>
                <span>HD</span>
             </div>
          </div>
          <div className="flex space-x-2">
            <div className="bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md text-white/90 text-sm flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              网络良好
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center relative bg-slate-950">
            
            {status === CallStatus.AUDIO_CONNECTED ? (
              // AUDIO MODE UI
              <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10 p-6">
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border-4 border-slate-700 shadow-2xl relative z-10">
                    <Icons.User className="w-16 h-16 text-slate-400" />
                  </div>
                  {/* Ripple Effect */}
                  <span className="absolute top-0 left-0 w-full h-full rounded-full bg-brand-500/30 animate-ping"></span>
                  <span className="absolute -top-4 -left-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] rounded-full border border-brand-500/20 animate-pulse"></span>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{customer.name}</h2>
                <p className="text-brand-200/80 text-lg mb-10 font-mono tracking-wider">{customer.phone}</p>
                
                <div className="flex flex-col gap-4 w-72 mx-auto">
                   <Button onClick={onUpgradeToVideo} className="bg-green-600 hover:bg-green-500 h-14 text-base shadow-[0_4px_20px_rgba(22,163,74,0.4)] transform transition hover:-translate-y-0.5 border-t border-white/20">
                      <Icons.Video className="mr-3 h-5 w-5" />
                      切换至视频通话
                   </Button>
                   <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 h-12">
                      <Icons.Mobile className="mr-3 h-4 w-4" />
                      发送视频短信链接
                   </Button>
                </div>
              </div>
            ) : (
              // VIDEO MODE UI
              <div className="w-full h-full relative bg-black">
                 {/* Main User Video (Remote - Customer) */}
                 <div className="absolute inset-0 z-0">
                    <img src={customer.avatar} alt="User" className="w-full h-full object-cover" />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
                    
                    {/* Customer Name Label */}
                    <div className="absolute bottom-24 left-6 z-10">
                       <div className="flex items-center space-x-2">
                          <h3 className="text-white text-2xl font-bold drop-shadow-md">{customer.name}</h3>
                          <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-0.5 rounded border border-white/10">客户端</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* ID Verification AR Overlay */}
                 {faceMatched && (
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-green-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center shadow-lg animate-in fade-in slide-in-from-top-4 border border-green-400/50 z-10">
                        <Icons.Check className="w-5 h-5 mr-2" />
                        <span className="font-semibold">身份核验通过</span>
                    </div>
                 )}

                 {/* Agent PiP (Local Camera) */}
                 <div className="absolute bottom-24 right-6 w-36 h-48 md:w-48 md:h-64 bg-slate-900 rounded-xl border-2 border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden group hover:scale-105 transition-all duration-300 z-20">
                    {/* Mock Agent Video Stream */}
                    <img src="https://picsum.photos/id/338/300/400" alt="Agent" className="w-full h-full object-cover" />
                    
                    {/* Local Status Indicators */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                       {isMuted && <div className="bg-red-500/90 p-1 rounded"><Icons.MicOff className="w-3 h-3 text-white" /></div>}
                    </div>

                    {/* Local Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-6">
                      <div className="flex items-center justify-between">
                         <span className="text-white text-xs font-medium pl-1">我 (坐席)</span>
                         {!isMuted && <div className="flex gap-0.5 h-2 items-end"><span className="w-0.5 h-1 bg-green-400 animate-pulse"></span><span className="w-0.5 h-2 bg-green-400 animate-pulse delay-75"></span><span className="w-0.5 h-1.5 bg-green-400 animate-pulse delay-150"></span></div>}
                      </div>
                    </div>
                    
                    {/* Hover Controls */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                       <Icons.Expand className="text-white w-8 h-8 drop-shadow-lg cursor-pointer hover:scale-110 transition-transform" />
                    </div>
                 </div>
              </div>
            )}
        </div>

        {/* Bottom Control Bar */}
        <div className="h-20 bg-slate-900/95 border-t border-white/5 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 flex items-center justify-center space-x-6 px-4 shrink-0 z-30 absolute bottom-0 w-full">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all duration-200 ${isMuted ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-800/80 text-white hover:bg-slate-700 border border-white/10'}`}
            title={isMuted ? "取消静音" : "静音"}
          >
            {isMuted ? <Icons.MicOff className="w-6 h-6" /> : <Icons.Mic className="w-6 h-6" />}
          </button>
          
          {status === CallStatus.VIDEO_CONNECTED && (
             <button 
               onClick={() => setIsCameraOff(!isCameraOff)}
               className={`p-3.5 rounded-full transition-all duration-200 ${isCameraOff ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-800/80 text-white hover:bg-slate-700 border border-white/10'}`}
               title={isCameraOff ? "开启摄像头" : "关闭摄像头"}
             >
               {isCameraOff ? <span className="relative"><Icons.Video className="w-6 h-6 opacity-50" /><div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-slate-900 rotate-45"></div></div></span> : <Icons.Video className="w-6 h-6" />}
             </button>
          )}

          <button 
            onClick={onHangup}
            className="p-4 rounded-full bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)] transform transition hover:scale-110 active:scale-95 mx-4 border border-red-400/30"
            title="挂断"
          >
            <Icons.Hangup className="w-8 h-8 fill-current" />
          </button>
          
          <button className="p-3.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 border border-white/10 hidden md:block" title="屏幕共享">
            <Icons.Share className="w-6 h-6" />
          </button>
          
          <button className="p-3.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 border border-white/10 hidden md:block" title="更多选项">
            <Icons.More className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- Right Sidebar (Tools) --- */}
      <div className="w-full md:w-96 bg-white border-l border-slate-200 flex flex-col shrink-0 shadow-xl z-20">
        
        {/* Customer Mini Profile */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
           <div className="flex items-center space-x-3 mb-2">
             <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg ring-2 ring-white shadow-sm">
               {customer.name.charAt(0)}
             </div>
             <div>
               <h3 className="font-bold text-slate-800 text-base">{customer.name}</h3>
               <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {customer.phone}</p>
             </div>
             <span className="ml-auto px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200 shadow-sm">
                信用分: 780
             </span>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white">
          {[
            { id: TabView.AI_TOOLS, label: '智能核验', icon: Icons.UserCheck },
            { id: TabView.TRANSCRIPT, label: '话术辅助', icon: Icons.FileText },
            { id: TabView.NOTES, label: '备注', icon: Icons.Edit },
            { id: TabView.LOCATION, label: '位置信息', icon: Icons.Location },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-brand-600 text-brand-600 bg-brand-50/30' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'stroke-[2.5px]' : ''}`} />
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50/30 custom-scrollbar relative">
           {activeTab === TabView.AI_TOOLS && (
             <div className="space-y-6 p-5">
                
                {/* Step 1: ID Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="font-semibold text-slate-800 flex items-center text-sm">
                       <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-2 text-xs font-bold">1</span>
                       身份证 OCR 识别
                     </h4>
                     {idScanned && <Icons.Check className="w-5 h-5 text-green-500" />}
                   </div>
                   
                   {!idScanned ? (
                     <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-brand-400 hover:bg-brand-50/10 transition-all cursor-pointer bg-slate-50 group" onClick={handleIdScan}>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                          <Icons.Camera className="w-6 h-6 text-brand-500" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">点击采集证件</span>
                        <span className="text-xs text-slate-400 block mt-1">支持正反面自动识别</span>
                     </div>
                   ) : (
                      <div className="space-y-3 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex justify-between py-1 border-b border-slate-200/50">
                          <span className="text-slate-500">姓名</span>
                          <span className="font-medium text-slate-900">{customer.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-200/50">
                           <span className="text-slate-500">身份证号</span>
                           <span className="font-medium text-slate-900 font-mono">{customer.idNumber}</span>
                        </div>
                        <div className="mt-2 p-2 bg-green-50 text-green-700 text-xs rounded border border-green-100 flex items-center justify-center font-medium">
                           <Icons.Check className="w-3 h-3 mr-1.5" /> OCR 比对一致
                        </div>
                      </div>
                   )}
                </div>

                {/* Step 2: Face Liveness */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                   <div className="flex justify-between items-center mb-4">
                     <h4 className="font-semibold text-slate-800 flex items-center text-sm">
                       <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-2 text-xs font-bold">2</span>
                       生物活体检测
                     </h4>
                     {faceMatched && <Icons.Check className="w-5 h-5 text-green-500" />}
                   </div>
                   
                   {!faceMatched ? (
                     <Button 
                        onClick={handleFaceMatch}
                        className="w-full bg-slate-900 hover:bg-slate-800"
                        disabled={!idScanned}
                      >
                       <Icons.UserCheck className="w-4 h-4 mr-2" />
                       开始人脸比对
                     </Button>
                   ) : (
                     <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="w-14 h-14 bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                           <img src={customer.avatar} className="w-full h-full object-cover" alt="db" />
                        </div>
                        <div className="text-slate-300">
                          <Icons.Share className="w-4 h-4 rotate-90" />
                        </div>
                        <div className="w-14 h-14 bg-white rounded-lg overflow-hidden border-2 border-green-500 shadow-sm relative">
                           <img src="https://picsum.photos/id/338/200/200" className="w-full h-full object-cover" alt="live" />
                           <div className="absolute bottom-0 inset-x-0 bg-green-500 h-1"></div>
                        </div>
                        <div className="flex-1 text-right">
                           <span className="text-xl font-bold text-green-600 block leading-none">98.5%</span>
                           <span className="text-xs text-slate-400">相似度</span>
                        </div>
                     </div>
                   )}
                </div>

                {/* Step 3: Anti-Fraud Questions */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                   <h4 className="font-semibold text-slate-800 flex items-center mb-4 text-sm">
                     <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-2 text-xs font-bold">3</span>
                     反欺诈问答
                   </h4>
                   <div className="space-y-3">
                      <label className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors border ${fraudCheck.q1 ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}>
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={fraudCheck.q1}
                            onChange={(e) => setFraudCheck({...fraudCheck, q1: e.target.checked})}
                            className="w-5 h-5 text-brand-600 border-slate-300 rounded focus:ring-brand-500" 
                          />
                        </div>
                        <span className={`text-sm ${fraudCheck.q1 ? 'text-brand-900 font-medium' : 'text-slate-600'}`}>问：确认申请车型为"德助AX"？</span>
                      </label>
                      
                      <label className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors border ${fraudCheck.q2 ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}>
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={fraudCheck.q2}
                            onChange={(e) => setFraudCheck({...fraudCheck, q2: e.target.checked})}
                            className="w-5 h-5 text-brand-600 border-slate-300 rounded focus:ring-brand-500" 
                          />
                        </div>
                        <span className={`text-sm ${fraudCheck.q2 ? 'text-brand-900 font-medium' : 'text-slate-600'}`}>问：确认还款方式为"等额本息"？</span>
                      </label>
                   </div>
                </div>

                {/* Final Status */}
                {isVerified && (
                  <div className="bg-green-600 text-white rounded-xl p-5 text-center animate-in zoom-in duration-300 shadow-lg shadow-green-200">
                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                       <Icons.Check className="w-6 h-6 text-white" />
                     </div>
                     <p className="font-bold text-lg">核验通过</p>
                     <p className="text-xs text-white/80 mt-1">全流程合规检测完成，已归档。</p>
                  </div>
                )}
             </div>
           )}

           {activeTab === TabView.TRANSCRIPT && (
             <div className="space-y-4 p-5">
                <div className="flex items-center justify-center my-4">
                  <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">通话开始于 15:06:22</span>
                </div>
                
                <div className="flex items-start space-x-2 flex-row-reverse">
                   <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1">我</div>
                   <div className="bg-brand-50 p-3 rounded-2xl rounded-tr-none shadow-sm border border-brand-100 text-right max-w-[85%]">
                      <p className="text-sm text-slate-800">杨先生您好，您的车贷申请需要面审，咱们核对一下信息，您现在方便视频吗？</p>
                   </div>
                </div>

                <div className="flex items-start space-x-2">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs shrink-0 mt-1">杨</div>
                   <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%]">
                      <p className="text-sm text-slate-800">方便。</p>
                   </div>
                </div>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-slate-50 px-2 text-xs text-slate-400 flex items-center">
                      <Icons.Video className="w-3 h-3 mr-1" /> 已切换至视频模式
                    </span>
                  </div>
                </div>

                {fraudCheck.q1 && (
                   <div className="flex items-start space-x-2 flex-row-reverse animate-in fade-in slide-in-from-bottom-2">
                      <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs shrink-0 mt-1">我</div>
                      <div className="bg-brand-50 p-3 rounded-2xl rounded-tr-none shadow-sm border border-brand-100 text-right max-w-[85%]">
                          <p className="text-sm text-slate-800">请确认您的申请车型是德助AX吗？</p>
                      </div>
                   </div>
                )}
             </div>
           )}
           
           {activeTab === TabView.NOTES && (
             <div className="flex flex-col h-full p-5 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                   <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-800 flex items-center text-sm">
                        <Icons.Edit className="w-4 h-4 mr-2 text-brand-600" />
                        业务备注记录
                      </h4>
                      <span className="text-xs text-slate-400">自动保存</span>
                   </div>
                   <textarea 
                     className="flex-1 w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none leading-relaxed"
                     placeholder="在此记录通话重点、客户诉求或后续跟进事项..."
                     value={remark}
                     onChange={(e) => setRemark(e.target.value)}
                   ></textarea>
                </div>

                <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100/50">
                   <h5 className="text-brand-800 font-semibold text-xs flex items-center mb-3">
                     <Icons.Info className="w-3.5 h-3.5 mr-1.5" /> 快捷标签 (点击添加)
                   </h5>
                   <div className="flex flex-wrap gap-2">
                      {['客户意向高', '需人工回访', '资料待补全', '异议处理', '投诉预警', '预约面签'].map((tag) => (
                        <button 
                          key={tag}
                          onClick={() => setRemark(prev => (prev ? prev + '，' : '') + tag)}
                          className="px-2.5 py-1.5 bg-white text-brand-700 text-xs border border-brand-200/60 rounded hover:bg-brand-50 transition-colors shadow-sm"
                        >
                          + {tag}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {activeTab === TabView.LOCATION && (
             <div className="space-y-4 p-5">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative group">
                  <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-400 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/118.7969,32.0603,12,0/600x400?access_token=PLACEHOLDER')] bg-cover bg-center">
                    <div className="bg-brand-600 text-white p-1.5 rounded-full shadow-lg ring-4 ring-white/50 animate-bounce">
                      <Icons.Location className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-4">
                     <div className="flex items-start justify-between">
                       <div>
                         <p className="text-sm font-bold text-slate-900">江苏省南京市</p>
                         <p className="text-xs text-slate-500 mt-1">玄武区 中山路 18号</p>
                       </div>
                       <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">低风险</span>
                     </div>
                     <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block">IP 地址</span>
                          <span className="text-slate-700 font-mono">192.168.1.1</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">网络类型</span>
                          <span className="text-slate-700">5G NSA</span>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <h5 className="text-orange-800 font-semibold text-xs flex items-center mb-2">
                    <Icons.ShieldAlert className="w-3 h-3 mr-1" /> 安全提示
                  </h5>
                  <p className="text-xs text-orange-700 leading-relaxed">
                    用户当前位置与常用登录地一致，设备指纹无异常。建议正常进行视频面审。
                  </p>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};