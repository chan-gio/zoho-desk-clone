export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  subdomain?: string;
  logo?: string;
  settings: TenantSettings;
  isActive: boolean;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  maxUsers: number;
  maxTickets: number;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface TenantSettings {
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  language: string;
  currency: string;
  businessHours: BusinessHours;
  slaSettings: SLASettings;
  notificationSettings: NotificationSettings;
  theme: ThemeSettings;
}

export interface BusinessHours {
  timezone: string;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  holidays: Holiday[];
}

export interface DaySchedule {
  isWorkingDay: boolean;
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format
  breaks?: TimeBreak[];
}

export interface TimeBreak {
  startTime: string;
  endTime: string;
  name: string;
}

export interface Holiday {
  date: string; // YYYY-MM-DD format
  name: string;
  isWorkingDay: boolean;
}

export interface SLASettings {
  responseTime: number; // in hours
  resolutionTime: number; // in hours
  escalationRules: EscalationRule[];
}

export interface EscalationRule {
  level: number;
  timeThreshold: number; // in hours
  actions: string[];
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  notificationChannels: NotificationChannel[];
}

export interface NotificationChannel {
  type: 'email' | 'sms' | 'push' | 'in_app';
  enabled: boolean;
  settings?: Record<string, any>;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  logo?: string;
  favicon?: string;
  customCss?: string;
}

export interface CreateTenantInput {
  name: string;
  domain?: string;
  subdomain?: string;
  plan?: 'free' | 'basic' | 'premium' | 'enterprise';
  settings?: Partial<TenantSettings>;
}

export interface UpdateTenantInput {
  name?: string;
  domain?: string;
  subdomain?: string;
  logo?: string;
  settings?: Partial<TenantSettings>;
  isActive?: boolean;
  plan?: 'free' | 'basic' | 'premium' | 'enterprise';
  maxUsers?: number;
  maxTickets?: number;
  features?: string[];
}
