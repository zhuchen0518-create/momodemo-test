import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CallWorkstation } from './components/CallWorkstation';
import { CallDetails } from './components/CallDetails';
import { RecordBacktrace } from './components/RecordBacktrace';
import { CallHistory } from './components/CallHistory';
import { QualityReport } from './components/QualityReport';
import { Icons } from './components/Icon';
import { Button } from './components/Button';
import { CallStatus } from './types';
import { mockCustomer } from './services/mockData';

// Sidebar Component
const SidebarComponent = ({ onViewChange, currentView }: { onViewChange: (view: ViewState) => void, currentView: ViewState }) => (
  <div className="w-16 lg:w-64 bg-slate-900 flex-shrink-0 flex flex-col items-center lg:items-stretch text-slate-300 transition-all duration-300 z-40">
     <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10 bg-slate-900">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">5G</div>
        <span className="ml-3 font-bold text-white hidden lg:block tracking-wide">5G 智联平台</span>
     </div>
     
     <nav className="flex-1 py-6 space-y-2 px-3">
        <div 
          onClick={() => onViewChange('DASHBOARD')}
          className={`px-3 lg:px-4 py-3 rounded-xl flex items-center cursor-pointer transition-colors group ${currentView === 'DASHBOARD' ? 'bg-brand-600 text-white shadow-md shadow-brand-900/20' : 'hover:bg-white/5 hover:text-white'}`}
        >
           <Icons.Dashboard className="w-5 h-5 lg:mr-3" />
           <span className="hidden lg:block font-medium">工作台</span>
        </div>
        <div 
          onClick={() => onViewChange('HISTORY')}
          className={`px-3 lg:px-4 py-3 rounded-xl flex items-center cursor-pointer transition-colors group ${currentView === 'HISTORY' ? 'bg-brand-600 text-white shadow-md shadow-brand-900/20' : 'hover:bg-white/5 hover:text-white'}`}
        >
           <Icons.History className="w-5 h-5 lg:mr-3 group-hover:text-brand-400 transition-colors" />
           <span className="hidden lg:block font-medium">历史记录</span>
        </div>
        <div className="px-3 lg:px-4 py-3 hover:bg-white/5 hover:text-white rounded-xl flex items-center cursor-pointer transition-colors group">
           <Icons.User className="w-5 h-5 lg:mr-3 group-hover:text-brand-400 transition-colors" />
           <span className="hidden lg:block font-medium">客户管理</span>
        </div>
        <div 
          onClick={() => onViewChange('REPORT')}
          className={`px-3 lg:px-4 py-3 rounded-xl flex items-center cursor-pointer transition-colors group ${currentView === 'REPORT' ? 'bg-brand-600 text-white shadow-md shadow-brand-900/20' : 'hover:bg-white/5 hover:text-white'}`}
        >
           <Icons.FileText className="w-5 h-5 lg:mr-3 group-hover:text-brand-400 transition-colors" />
           <span className="hidden lg:block font-medium">质检报表</span>
        </div>
     </nav>

     <div className="p-4 border-t border-white/10 bg-slate-800/50">
        <div className="flex items-center justify-center lg:justify-start">
           <div className="relative">
             <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-white/10">
               <img src="https://picsum.photos/id/338/200/200" alt="Profile" className="object-cover w-full h-full" />
             </div>
             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></div>
           </div>
           <div className="hidden lg:block ml-3">
              <p className="text-sm font-medium text-white">工号 88219</p>
              <p className="text-xs text-slate-400">高级坐席专员</p>
           </div>
           <button className="ml-auto hidden lg:block text-slate-400 hover:text-white transition-colors" title="退出">
             <Icons.LogOut className="w-5 h-5" />
           </button>
        </div>
     </div>
  </div>
);

// Start Call Modal
const StartCallModal = ({ onCancel, onConnect }: { onCancel: () => void, onConnect: (info: any) => void }) => {
  const [phone, setPhone] = useState('134****6133'); 
  const [outboundNumber, setOutboundNumber] = useState('025-88219999');
  const [type, setType] = useState<'video' | 'audio'>('video');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
       <div className="bg-white rounded-2xl shadow-2xl w-[480px] overflow-hidden border border-white/20 transform transition-all scale-100">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <h3 className="text-lg font-bold text-slate-900">发起外呼</h3>
             <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100">
               <Icons.Close className="w-5 h-5" />
             </button>
          </div>
          
          <div className="p-8 space-y-6">
             {/* Phone Input */}
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">客户号码</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icons.User className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                   </div>
                   <input 
                     type="text" 
                     className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all font-mono" 
                     placeholder="输入手机号"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                   />
                </div>
             </div>

             {/* Outbound Number */}
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">外呼号码</label>
                <div className="relative">
                    <select 
                      className="block w-full py-3 pl-3 pr-10 border border-slate-200 bg-slate-50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white sm:text-sm appearance-none transition-all cursor-pointer font-mono"
                      value={outboundNumber}
                      onChange={(e) => setOutboundNumber(e.target.value)}
                    >
                       <option value="025-88219999">025-88219999 (本机)</option>
                       <option value="025-88880000">025-88880000 (总机)</option>
                    </select>
                </div>
             </div>

             {/* Call Type */}
             <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">呼叫方式</label>
                <div className="grid grid-cols-2 gap-4">
                   <button
                     className={`relative border-2 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${type === 'video' ? 'border-brand-500 bg-brand-50/50 text-brand-700' : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50 text-slate-600'}`}
                     onClick={() => setType('video')}
                   >
                      <div className={`p-2 rounded-full ${type === 'video' ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                         <Icons.Video className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-sm">5G 视频通话</span>
                      {type === 'video' && <div className="absolute top-2 right-2 text-brand-500"><Icons.Check className="w-5 h-5 fill-brand-100" /></div>}
                   </button>
                   
                   <button 
                     className={`relative border-2 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${type === 'audio' ? 'border-brand-500 bg-brand-50/50 text-brand-700' : 'border-slate-100 hover:border-brand-200 hover:bg-slate-50 text-slate-600'}`}
                     onClick={() => setType('audio')}
                   >
                      <div className={`p-2 rounded-full ${type === 'audio' ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                         <Icons.Phone className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-sm">普通语音</span>
                      {type === 'audio' && <div className="absolute top-2 right-2 text-brand-500"><Icons.Check className="w-5 h-5 fill-brand-100" /></div>}
                   </button>
                </div>
             </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end space-x-4">
             <Button variant="ghost" onClick={onCancel} className="px-6">取消</Button>
             <Button className="px-8 shadow-lg shadow-brand-500/30" onClick={() => onConnect({ phone, outboundNumber, type })}>
               立即呼叫
             </Button>
          </div>
       </div>
    </div>
  );
}

// Dialing Modal
const DialingModal = ({ onCancel, onConnect }: { onCancel: () => void, onConnect: () => void }) => (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 text-center transform transition-all scale-100 border border-white/20">
         <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 overflow-hidden relative shadow-inner ring-4 ring-slate-50">
            <img src={mockCustomer.avatar} className="w-full h-full object-cover opacity-80" alt="user" />
            <div className="absolute inset-0 flex items-center justify-center">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-20"></span>
               <div className="bg-white p-2 rounded-full shadow-lg z-10">
                 <Icons.Phone className="w-6 h-6 text-brand-600" />
               </div>
            </div>
         </div>
         <h3 className="text-xl font-bold text-slate-900 mb-1">{mockCustomer.name}</h3>
         <p className="text-slate-500 mb-8 font-mono">{mockCustomer.phone}</p>
         
         <div className="relative mb-8">
            <p className="text-xs text-brand-600 font-bold uppercase tracking-widest animate-pulse">正在呼叫...</p>
         </div>
         
         <div className="flex space-x-6 justify-center">
            <Button variant="danger" className="rounded-full w-14 h-14 p-0 shadow-lg shadow-red-200 hover:shadow-red-300 transition-all hover:scale-110" onClick={onCancel}>
               <Icons.Hangup className="w-6 h-6" />
            </Button>
            {/* Hidden simulator button for demo purposes */}
            <Button variant="success" className="rounded-full w-14 h-14 p-0 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all hover:scale-110 animate-bounce" onClick={onConnect}>
               <Icons.Phone className="w-6 h-6" />
            </Button>
         </div>
         <p className="text-[10px] text-slate-400 mt-6">(点击绿色按钮模拟接听)</p>
      </div>
   </div>
);

type ViewState = 'DASHBOARD' | 'DETAILS' | 'BACKTRACE' | 'HISTORY' | 'REPORT';

export default function App() {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.IDLE);
  const [showStartCallModal, setShowStartCallModal] = useState(false);
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);

  // Flow Handlers
  const handleStartCallRequest = () => {
    setShowStartCallModal(true);
  };

  const handleStartCallConnect = (data: any) => {
    // In a real app, we would use data to set up the call
    setShowStartCallModal(false);
    setCallStatus(CallStatus.DIALING);
  };

  const connectAudio = () => {
    setCallStatus(CallStatus.AUDIO_CONNECTED);
  };

  const upgradeToVideo = () => {
    // Simulate connection delay
    setCallStatus(CallStatus.VIDEO_CONNECTED);
  };

  const endCall = () => {
    setCallStatus(CallStatus.IDLE);
  };

  // Details View Handlers
  const handleViewDetails = (id: string) => {
    setSelectedCallId(id);
    setView('DETAILS');
  };

  const handleOpenBacktrace = () => {
    setView('BACKTRACE');
  }

  const handleBackToDashboard = () => {
    setView('DASHBOARD');
    setSelectedCallId(null);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar is hidden when in full video mode to maximize space */}
      {callStatus !== CallStatus.VIDEO_CONNECTED && view !== 'DETAILS' && view !== 'BACKTRACE' && (
        <SidebarComponent onViewChange={setView} currentView={view} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Top Header (only visible on dashboard and NOT details/backtrace/history/report view) */}
        {callStatus !== CallStatus.VIDEO_CONNECTED && view === 'DASHBOARD' && (
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
            <div className="w-96">
               <div className="relative group">
                 <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-hover:text-brand-500 transition-colors" />
                 <input type="text" placeholder="搜索客户、电话或身份证号..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white" />
               </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition-colors">
                 <Icons.ShieldAlert className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                 <Icons.Settings className="w-5 h-5" />
              </button>
            </div>
          </header>
        )}

        {/* View Switcher */}
        {view === 'DASHBOARD' && (
          <Dashboard 
            onStartCall={handleStartCallRequest} 
            onViewDetails={handleViewDetails} 
            onOpenBacktrace={handleOpenBacktrace}
          />
        )}

        {view === 'DETAILS' && selectedCallId && (
          <CallDetails callId={selectedCallId} onBack={handleBackToDashboard} />
        )}

        {view === 'BACKTRACE' && (
          <RecordBacktrace onBack={handleBackToDashboard} />
        )}
        
        {view === 'HISTORY' && (
          <CallHistory onBack={handleBackToDashboard} onViewDetails={handleViewDetails} />
        )}
        
        {view === 'REPORT' && (
          <QualityReport onBack={handleBackToDashboard} />
        )}

        {/* Call Modals & Overlays - Global Level */}
        
        {/* 1. Pre-call Configuration Modal */}
        {showStartCallModal && (
          <StartCallModal onCancel={() => setShowStartCallModal(false)} onConnect={handleStartCallConnect} />
        )}

        {/* 2. Dialing Overlay */}
        {callStatus === CallStatus.DIALING && (
          <DialingModal onCancel={endCall} onConnect={connectAudio} />
        )}

        {/* 3. Audio/Video Active Workstation */}
        {(callStatus === CallStatus.AUDIO_CONNECTED || callStatus === CallStatus.VIDEO_CONNECTED) && (
          <CallWorkstation 
            status={callStatus}
            customer={mockCustomer}
            onUpgradeToVideo={upgradeToVideo}
            onHangup={endCall}
          />
        )}

      </div>
    </div>
  );
}