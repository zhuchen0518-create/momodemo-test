import { CallLog, Customer } from '../types';

export const mockCustomer: Customer = {
  id: 'C-8821',
  name: '杨智',
  phone: '134****6133',
  idNumber: '3201**********001X',
  avatar: 'https://picsum.photos/id/64/200/200',
  location: '江苏省南京市',
  riskLevel: 'Low'
};

export const recentCalls: CallLog[] = [
  { id: '1', customerName: '杨先生', phone: '134****6133', type: 'Video', startTime: '15:06:22', duration: '12分 30秒', status: 'Completed' },
  { id: '2', customerName: '刘女士', phone: '186****1234', type: 'Audio', startTime: '14:56:10', duration: '05分 12秒', status: 'Completed' },
  { id: '3', customerName: '陈先生', phone: '139****9876', type: 'Video', startTime: '14:47:00', duration: '00分 00秒', status: 'Missed' },
  { id: '4', customerName: '张先生', phone: '150****5555', type: 'Video', startTime: '14:45:30', duration: '08分 45秒', status: 'Completed' },
  { id: '5', customerName: '王女士', phone: '133****1111', type: 'Audio', startTime: '14:44:00', duration: '02分 20秒', status: 'Completed' },
];

export const dailyStats = [
  { label: '今日通话总量', value: '34', color: 'text-blue-600' },
  { label: '平均通话时长', value: '4分 12秒', color: 'text-green-600' },
  { label: '当前排队人数', value: '0', color: 'text-slate-600' },
  { label: '服务满意度', value: '98%', color: 'text-indigo-600' },
];