import React, { useState, useRef, useEffect } from 'react';
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
const SidebarComponent = ({ 
  onViewChange, 
  currentView,
  onLogout 
}: { 
  onViewChange: (view: ViewState) => void, 
  currentView: ViewState,
  onLogout: () => void 
}) => (
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
           <button 
             onClick={onLogout}
             className="ml-auto hidden lg:block text-slate-400 hover:text-white transition-colors p-2 rounded hover:bg-white/10" 
             title="退出系统"
           >
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

// Logout Confirmation Modal
const LogoutModal = ({ onCancel, onConfirm }: { onCancel: () => void, onConfirm: () => void }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
     <div className="bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden transform transition-all scale-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
           <Icons.LogOut className="w-8 h-8 text-red-500 translate-x-1" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">确认退出登录？</h3>
        <p className="text-slate-500 mb-8 text-sm px-4 leading-relaxed">
           退出后您将无法接听新的用户来电。请确保当前没有正在进行中的业务。
        </p>
        
        <div className="flex space-x-3">
           <Button variant="secondary" onClick={onCancel} className="flex-1 h-11">
              取消
           </Button>
           <Button variant="danger" onClick={onConfirm} className="flex-1 h-11 shadow-lg shadow-red-500/20">
              确认退出
           </Button>
        </div>
     </div>
  </div>
);

type ViewState = 'DASHBOARD' | 'DETAILS' | 'BACKTRACE' | 'HISTORY' | 'REPORT';
type ActivePopover = 'NONE' | 'ALERTS' | 'SETTINGS';

export default function App() {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.IDLE);
  const [showStartCallModal, setShowStartCallModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [view, setView] = useState<ViewState>('DASHBOARD');
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [activePopover, setActivePopover] = useState<ActivePopover>('NONE');

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
  
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setActivePopover('NONE'); // Close popovers if open
  };

  const performLogout = () => {
    // In a real app, clear tokens, auth state, etc.
    // Here we just refresh the page to simulate a reset
    window.location.reload();
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

  const togglePopover = (popover: ActivePopover) => {
    if (activePopover === popover) {
      setActivePopover('NONE');
    } else {
      setActivePopover(popover);
    }
  };

  // Click outside handler
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActivePopover('NONE');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      
      {/* Sidebar is hidden when in full video mode to maximize space */}
      {callStatus !== CallStatus.VIDEO_CONNECTED && view !== 'DETAILS' && view !== 'BACKTRACE' && (
        <SidebarComponent onViewChange={setView} currentView={view} onLogout={handleLogoutClick} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Top Header (only visible on dashboard and NOT details/backtrace/history/report view) */}
        {callStatus !== CallStatus.VIDEO_CONNECTED && view === 'DASHBOARD' && (
          <header ref={headerRef} className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-30 shrink-0 relative">
            <div className="w-96">
               <div className="relative group">
                 <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-hover:text-brand-500 transition-colors" />
                 <input type="text" placeholder="搜索客户、电话或身份证号..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white" />
               </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-2 relative">
              
              {/* Alert Bell / Shield */}
              <div className="relative">
                <button 
                  onClick={() => togglePopover('ALERTS')}
                  className={`p-2 rounded-lg relative transition-all ${activePopover === 'ALERTS' ? 'bg-brand-50 text-brand-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                   <Icons.ShieldAlert className="w-5 h-5" />
                   <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                
                {/* Alerts Dropdown */}
                {activePopover === 'ALERTS' && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                     <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 text-sm">风险控制中心</h3>
                        <span className="text-xs text-brand-600 cursor-pointer hover:underline">全部已读</span>
                     </div>
                     <div className="max-h-80 overflow-y-auto">
                        <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors relative">
                           <div className="flex items-start">
                              <div className="p-1.5 bg-red-100 text-red-600 rounded mt-0.5 shrink-0">
                                 <Icons.ShieldAlert className="w-4 h-4" />
                              </div>
                              <div className="ml-3">
                                 <p className="text-sm font-bold text-slate-800 mb-0.5">检测到高风险呼入</p>
                                 <p className="text-xs text-slate-500 leading-tight">号码 185****1234 被标记为"疑似欺诈"，请谨慎接待。</p>
                                 <span className="text-[10px] text-slate-400 mt-1.5 block">10 分钟前</span>
                              </div>
                           </div>
                           <div className="absolute right-4 top-4 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                           <div className="flex items-start">
                              <div className="p-1.5 bg-orange-100 text-orange-600 rounded mt-0.5 shrink-0">
                                 <Icons.Wifi className="w-4 h-4" />
                              </div>
                              <div className="ml-3">
                                 <p className="text-sm font-bold text-slate-800 mb-0.5">网络抖动预警</p>
                                 <p className="text-xs text-slate-500 leading-tight">当前 5G 信号强度波动较大，建议切换备用线路。</p>
                                 <span className="text-[10px] text-slate-400 mt-1.5 block">32 分钟前</span>
                              </div>
                           </div>
                        </div>
                        <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                           <div className="flex items-start">
                              <div className="p-1.5 bg-blue-100 text-blue-600 rounded mt-0.5 shrink-0">
                                 <Icons.Bell className="w-4 h-4" />
                              </div>
                              <div className="ml-3">
                                 <p className="text-sm font-bold text-slate-800 mb-0.5">系统维护通知</p>
                                 <p className="text-xs text-slate-500 leading-tight">今晚 02:00 进行例行维护，预计耗时 30 分钟。</p>
                                 <span className="text-[10px] text-slate-400 mt-1.5 block">2 小时前</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-center">
                        <button className="text-xs font-medium text-slate-600 hover:text-brand-600 flex items-center justify-center w-full">
                           查看所有通知 <Icons.ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                     </div>
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              
              {/* Settings Gear */}
              <div className="relative">
                <button 
                  onClick={() => togglePopover('SETTINGS')}
                  className={`p-2 rounded-lg transition-all ${activePopover === 'SETTINGS' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
                >
                   <Icons.Settings className="w-5 h-5" />
                </button>

                {/* Settings Dropdown */}
                {activePopover === 'SETTINGS' && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                     <div className="p-4 bg-slate-900 text-white">
                        <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-white/20">
                              <img src="https://picsum.photos/id/338/200/200" alt="Profile" className="object-cover w-full h-full" />
                           </div>
                           <div>
                              <p className="text-sm font-bold">工号 88219</p>
                              <p className="text-xs text-slate-400">高级坐席专员</p>
                           </div>
                        </div>
                     </div>
                     
                     {/* Device Check */}
                     <div className="p-4 border-b border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">设备状态</p>
                        <div className="grid grid-cols-3 gap-2">
                           <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded border border-green-100 text-green-700">
                              <Icons.Mic className="w-4 h-4 mb-1" />
                              <span className="text-[10px] font-medium">正常</span>
                           </div>
                           <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded border border-green-100 text-green-700">
                              <Icons.Video className="w-4 h-4 mb-1" />
                              <span className="text-[10px] font-medium">正常</span>
                           </div>
                           <div className="flex flex-col items-center justify-center p-2 bg-green-50 rounded border border-green-100 text-green-700">
                              <Icons.Activity className="w-4 h-4 mb-1" />
                              <span className="text-[10px] font-medium">5G</span>
                           </div>
                        </div>
                     </div>

                     {/* Options */}
                     <div className="p-2">
                        <button className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                           <Icons.Volume2 className="w-4 h-4 mr-3 text-slate-400" />
                           音量设置
                           <div className="ml-auto w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                              <div className="w-[70%] h-full bg-brand-500"></div>
                           </div>
                        </button>
                        <button className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                           <Icons.Globe className="w-4 h-4 mr-3 text-slate-400" />
                           语言 (中文)
                        </button>
                        <button className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                           <Icons.HelpCircle className="w-4 h-4 mr-3 text-slate-400" />
                           帮助与反馈
                        </button>
                     </div>

                     <div className="p-2 border-t border-slate-100 bg-slate-50">
                        <button 
                           onClick={handleLogoutClick}
                           className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                           <Icons.LogOut className="w-4 h-4 mr-3" />
                           退出登录
                        </button>
                     </div>
                  </div>
                )}
              </div>
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

        {/* 4. Logout Confirmation Modal */}
        {showLogoutConfirm && (
           <LogoutModal onCancel={() => setShowLogoutConfirm(false)} onConfirm={performLogout} />
        )}

      </div>
    </div>
  );
}