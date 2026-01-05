export enum CallStatus {
  IDLE = 'IDLE',
  DIALING = 'DIALING',
  AUDIO_CONNECTED = 'AUDIO_CONNECTED',
  VIDEO_CONNECTED = 'VIDEO_CONNECTED',
  ENDED = 'ENDED'
}

export enum TabView {
  AI_TOOLS = 'AI_TOOLS',
  LOCATION = 'LOCATION',
  TRANSCRIPT = 'TRANSCRIPT',
  HISTORY = 'HISTORY',
  NOTES = 'NOTES'
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  idNumber: string;
  avatar: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface CallLog {
  id: string;
  customerName: string;
  phone: string;
  type: 'Video' | 'Audio';
  startTime: string;
  duration: string;
  status: 'Completed' | 'Missed' | 'Rejected';
}