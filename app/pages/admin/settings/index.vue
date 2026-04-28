<template>
  <div class="p-4 sm:p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">System Settings</h1>
      <p class="text-sm text-slate-500">Configure system parameters, OTP settings, and integrations</p>
    </div>

    <!-- Tabs -->
    <div class="inline-flex bg-[#161b27] border border-[#1e2535] rounded-[10px] p-1 gap-1 mb-6 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 border-none rounded-[7px] text-[12px] sm:text-[13px] font-medium cursor-pointer transition-all whitespace-nowrap shrink-0 font-sans"
        :class="{
          'bg-[#1e2535] text-slate-100 font-semibold': activeTab === tab.id,
          'bg-transparent text-slate-500 hover:text-slate-400': activeTab !== tab.id
        }"
      >
        <component :is="tab.icon" :size="14" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ── GENERAL TAB ── -->
    <template v-if="activeTab === 'general'">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

        <!-- OTP Configuration -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[14px] font-semibold text-slate-100 m-0">OTP Configuration</h3>
            <KeyRound :size="16" class="text-slate-500" />
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="item in otpSettings" :key="item.label" class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5 hover:border-slate-600/50 transition-colors">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] text-slate-500 font-medium">{{ item.label }}</span>
                <span v-if="!item.tag" class="text-[14px] font-bold text-slate-100">{{ item.value }}</span>
                <span v-else class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-950/70 text-blue-400 border border-blue-700/50 mt-0.5">{{ item.value }}</span>
              </div>
              <button class="p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] cursor-pointer transition-all">
                <PenSquare :size="14" />
              </button>
            </div>
          </div>
        </div>

        <!-- System Information -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[14px] font-semibold text-slate-100 m-0">System Information</h3>
            <Database :size="16" class="text-slate-500" />
          </div>
          <div class="flex flex-col gap-2">
            <!-- System Version -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-1">System Version</span>
              <span class="text-[14px] font-bold text-slate-100">v1.0.0</span>
            </div>
            <!-- Environment -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-1.5">Environment</span>
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-700/50">Production</span>
            </div>
            <!-- Last Database Backup -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-1">Last Database Backup</span>
              <span class="text-[14px] font-bold text-slate-100 block mb-1">3/7/2026, 12:04:30 PM</span>
              <button class="bg-transparent border-none text-blue-400 text-[13px] font-semibold cursor-pointer p-0 hover:text-blue-300 transition-colors">Backup Now</button>
            </div>
            <!-- Total Active Users -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-1">Total Active Users</span>
              <span class="text-[14px] font-bold text-slate-100">13 users</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Session -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-[14px] font-semibold text-slate-100 m-0">Current Session</h3>
          <Users :size="16" class="text-slate-500" />
        </div>
        <div class="grid grid-cols-3 gap-2">
          <div v-for="field in sessionFields" :key="field.label" class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
            <span class="text-[11px] text-slate-500 font-medium block mb-1.5">{{ field.label }}</span>
            <span v-if="!field.tag" class="text-[14px] font-bold text-slate-100">{{ field.value }}</span>
            <span v-else class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#1e2535] text-slate-300 border border-slate-600/60">{{ field.value }}</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── SECURITY TAB ── -->
    <template v-if="activeTab === 'security'">
      <div class="grid grid-cols-2 gap-4">

        <!-- Authentication & Access -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[14px] font-semibold text-slate-100 m-0">Authentication & Access</h3>
            <TriangleAlert :size="16" class="text-slate-500" />
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="item in authSettings" :key="item.label" class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5 hover:border-slate-600/50 transition-colors">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] text-slate-500 font-medium">{{ item.label }}</span>
                <span v-if="!item.tag" class="text-[14px] font-bold text-slate-100">{{ item.value }}</span>
                <span v-else class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-700/50 mt-0.5">{{ item.value }}</span>
              </div>
              <button class="p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] cursor-pointer transition-all">
                <PenSquare :size="14" />
              </button>
            </div>
          </div>
        </div>

        <!-- Audit & Compliance -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[14px] font-semibold text-slate-100 m-0">Audit & Compliance</h3>
            <CircleCheck :size="16" class="text-slate-500" />
          </div>
          <div class="flex flex-col gap-2">
            <!-- Audit Logging -->
            <div class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5 hover:border-slate-600/50 transition-colors">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] text-slate-500 font-medium">Audit Logging</span>
                <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-700/50 mt-0.5">Enabled</span>
              </div>
              <button class="bg-transparent border-none text-blue-400 text-[13px] font-semibold cursor-pointer hover:text-blue-300 transition-colors">View Logs</button>
            </div>
            <div v-for="item in auditSettings" :key="item.label" class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5 hover:border-slate-600/50 transition-colors">
              <div class="flex flex-col gap-1">
                <span class="text-[11px] text-slate-500 font-medium">{{ item.label }}</span>
                <span class="text-[14px] font-bold text-slate-100">{{ item.value }}</span>
              </div>
              <button class="p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] cursor-pointer transition-all">
                <PenSquare :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── NOTIFICATIONS TAB ── -->
    <template v-if="activeTab === 'notifications'">
      <div class="grid grid-cols-2 gap-4 mb-4">

        <!-- Notification Channels -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <h3 class="text-[14px] font-semibold text-slate-100 mb-4 m-0">Notification Channels</h3>
          <div class="flex flex-col gap-2">
            <div v-for="ch in notifChannels" :key="ch.label" class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5 hover:border-slate-600/50 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="ch.iconBg">
                  <component :is="ch.icon" :size="15" :class="ch.iconColor" />
                </div>
                <div class="flex flex-col gap-0.5">
                  <span class="text-[13.5px] font-semibold text-slate-100">{{ ch.label }}</span>
                  <span class="text-[11.5px] text-slate-500">{{ ch.desc }}</span>
                </div>
              </div>
              <!-- Toggle -->
              <button
                @click="ch.enabled = !ch.enabled"
                class="flex-shrink-0 border-none cursor-pointer"
                :style="{ position: 'relative', display: 'inline-block', background: ch.enabled ? '#2563eb' : '#334155', width: '44px', height: '24px', borderRadius: '12px', transition: 'background 0.2s' }"
              >
                <span :style="{ display: 'block', position: 'absolute', borderRadius: '50%', background: 'white', width: '20px', height: '20px', top: '2px', left: ch.enabled ? '22px' : '2px', transition: 'left 0.2s' }" />
              </button>
            </div>
          </div>
        </div>

        <!-- Alert Types Configuration -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <h3 class="text-[14px] font-semibold text-slate-100 mb-4 m-0">Alert Types Configuration</h3>
          <div class="flex flex-col gap-2">
            <!-- Active Alert Types -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-2.5">Active Alert Types</span>
              <div class="flex flex-wrap gap-2 mb-3">
                <span v-for="alert in alertTypes" :key="alert.label" class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border" :class="alert.cls">{{ alert.label }}</span>
              </div>
              <button class="bg-transparent border-none text-blue-400 text-[13px] font-semibold cursor-pointer p-0 hover:text-blue-300 transition-colors">Manage Alert Types</button>
            </div>
            <!-- Alert Frequency -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-1">Alert Frequency</span>
              <span class="text-[14px] font-bold text-slate-100">Real-time</span>
            </div>
            <!-- Digest Summary -->
            <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-2">Digest Summary</span>
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-700/50 mb-2">Daily at 6:00 AM</span>
              <br/>
              <button class="bg-transparent border-none text-blue-400 text-[13px] font-semibold cursor-pointer p-0 hover:text-blue-300 transition-colors mt-1">Configure Schedule</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Firearm Maintenance Notifications -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-[14px] font-semibold text-slate-100 m-0">Firearm Maintenance Notifications</h3>
          <TriangleAlert :size="16" class="text-slate-500" />
        </div>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <!-- Advance Notification Days -->
          <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-4">
            <span class="text-[13px] font-semibold text-slate-200 block mb-1">Advance Notification Days</span>
            <span class="text-[12px] text-slate-500 block mb-3">Notify BISO when firearm maintenance is due in X days</span>
            <div class="flex items-center gap-3 mb-2">
              <input type="number" value="14" class="w-20 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-blue-500 transition-colors" />
              <span class="text-[13px] text-slate-400">days before</span>
            </div>
            <span class="text-[11.5px] text-slate-600">Current: Notify 14 days before maintenance due date</span>
          </div>
          <!-- Reminder Interval Days -->
          <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-4">
            <span class="text-[13px] font-semibold text-slate-200 block mb-1">Reminder Interval Days</span>
            <span class="text-[12px] text-slate-500 block mb-3">Send reminder notifications every X days after initial notification</span>
            <div class="flex items-center gap-3 mb-2">
              <input type="number" value="3" class="w-20 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-200 outline-none focus:border-blue-500 transition-colors" />
              <span class="text-[13px] text-slate-400">days</span>
            </div>
            <span class="text-[11.5px] text-slate-600">Current: Send reminder every 3 days</span>
          </div>
        </div>
        <!-- Notification Recipients info -->
        <div class="bg-blue-950/20 border border-blue-700/30 rounded-xl px-4 py-3.5 flex items-start gap-3">
          <Bell :size="15" class="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <span class="text-[13px] font-semibold text-slate-200 block mb-0.5">Notification Recipients</span>
            <span class="text-[12.5px] text-slate-500">Maintenance notifications are automatically sent to all designated BISO officers responsible for the branch where the firearm is registered.</span>
          </div>
        </div>
      </div>
    </template>

    <!-- ── INTEGRATIONS TAB ── -->
    <template v-if="activeTab === 'integrations'">
      <div class="grid grid-cols-2 gap-4 mb-4">

        <!-- External Services -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <h3 class="text-[14px] font-semibold text-slate-100 mb-4 m-0">External Services</h3>
          <div class="flex flex-col gap-2">
            <div v-for="svc in externalServices" :key="svc.label" class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5 hover:border-slate-600/50 transition-colors">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                  <span class="text-[13.5px] font-semibold text-slate-100">{{ svc.label }}</span>
                </div>
                <button
                  @click="svc.enabled = !svc.enabled"
                  class="flex-shrink-0 border-none cursor-pointer"
                  :style="{ position: 'relative', display: 'inline-block', background: svc.enabled ? '#2563eb' : '#334155', width: '44px', height: '24px', borderRadius: '12px', transition: 'background 0.2s' }"
                >
                  <span :style="{ display: 'block', position: 'absolute', borderRadius: '50%', background: 'white', width: '20px', height: '20px', top: '2px', left: svc.enabled ? '22px' : '2px', transition: 'left 0.2s' }" />
                </button>
              </div>
              <span class="text-[11.5px] text-slate-500 block mb-3">{{ svc.desc }}</span>
              <button class="flex items-center gap-1.5 bg-transparent border-none text-slate-400 text-[12.5px] font-medium cursor-pointer hover:text-slate-200 transition-colors p-0">
                <PenSquare :size="13" />
                Configure
              </button>
            </div>
          </div>
        </div>

        <!-- API Keys & Webhooks -->
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
          <h3 class="text-[14px] font-semibold text-slate-100 mb-4 m-0">API Keys & Webhooks</h3>
          <div class="flex flex-col gap-2 mb-3">
            <div v-for="key in apiKeys" :key="key.label" class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-4 py-3.5">
              <span class="text-[11px] text-slate-500 font-medium block mb-2">{{ key.label }}</span>
              <div class="flex items-center gap-2">
                <code class="flex-1 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[12px] font-mono" :class="key.color">{{ key.value }}</code>
                <button
                  @click="copyToClipboard(key)"
                  class="text-[12px] font-medium rounded-lg px-3 py-2 cursor-pointer transition-all whitespace-nowrap border"
                  :style="{ background: 'transparent' }"
                  :class="{
                    'text-emerald-400 border-emerald-700/50': copiedKey === key.label,
                    'text-slate-400 border-[#1e2535] hover:text-slate-200 hover:border-slate-600': copiedKey !== key.label
                  }"
                >{{ copiedKey === key.label ? 'Copied!' : 'Copy' }}</button>
              </div>
            </div>
          </div>
          <button class="w-full flex items-center justify-center gap-2 bg-blue-600 text-white border-none rounded-lg py-2.5 text-[13px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
            <KeyRound :size="14" />
            Generate New API Key
          </button>
        </div>
      </div>

      <!-- System Health & Status -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5">
        <h3 class="text-[14px] font-semibold text-slate-100 mb-4 m-0">System Health & Status</h3>
        <div class="grid grid-cols-4 gap-3">
          <div v-for="health in healthItems" :key="health.label" class="bg-[#1a2030] border-l-4 border border-[#1e2535] rounded-xl px-4 py-4" :class="health.borderLeft">
            <div class="flex items-center gap-2 mb-2">
              <component :is="health.icon" :size="14" :class="health.iconColor" />
              <span class="text-[11.5px] text-slate-400 font-medium">{{ health.label }}</span>
            </div>
            <span class="text-[22px] font-bold text-slate-100 leading-none block mb-1">{{ health.value }}</span>
            <span class="text-[11.5px] text-slate-600">{{ health.sub }}</span>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref } from 'vue'
import {
  Settings, Shield, Bell, Globe, KeyRound, PenSquare, Database,
  Users, TriangleAlert, CircleCheck, Mail, MessageSquare, BellRing,
  Smartphone, Server, Clock,
} from 'lucide-vue-next'

const activeTab = ref('general')

const tabs = [
  { id: 'general',       label: 'General',       icon: Settings },
  { id: 'security',      label: 'Security',       icon: Shield },
  { id: 'notifications', label: 'Notifications',  icon: Bell },
  { id: 'integrations',  label: 'Integrations',   icon: Globe },
]

// ── GENERAL ──
const otpSettings = [
  { label: 'OTP Expiry Time',          value: '10 minutes', tag: false },
  { label: 'OTP Length',               value: '6 digits',   tag: false },
  { label: 'Delivery Method',          value: 'Email + SMS', tag: true },
  { label: 'Max Verification Attempts', value: '3 attempts', tag: false },
]

const sessionFields = [
  { label: 'Logged in as', value: 'J. K. Mwamba',      tag: false },
  { label: 'Role',         value: 'SYSTEM_ADMIN',       tag: true  },
  { label: 'File Number',  value: 'ADM001',             tag: false },
  { label: 'Branch',       value: 'br-dom',             tag: false },
  { label: 'Email',        value: 'admin@example.com',  tag: false },
  { label: 'Last Login',   value: '3/7/2026',           tag: false },
]

// ── SECURITY ──
const authSettings = [
  { label: 'Session Timeout',          value: '30 minutes',                     tag: false },
  { label: 'Password Policy',          value: 'Min 8 chars, alphanumeric + symbols', tag: false },
  { label: 'Two-Factor Authentication', value: 'Required for Admins',           tag: true  },
  { label: 'Password Expiry',          value: '90 days',                        tag: false },
]

const auditSettings = [
  { label: 'Log Retention Period',    value: '365 days' },
  { label: 'Failed Login Attempts',   value: '5 before lockout' },
  { label: 'Account Lockout Duration', value: '15 minutes' },
]

// ── NOTIFICATIONS ──
const notifChannels = ref([
  { label: 'Email Notifications',   desc: 'Send notifications via email',        enabled: true,  icon: Mail,          iconBg: 'bg-blue-950/60',   iconColor: 'text-blue-400' },
  { label: 'SMS Notifications',     desc: 'Send notifications via SMS',           enabled: true,  icon: MessageSquare, iconBg: 'bg-emerald-950/60', iconColor: 'text-emerald-400' },
  { label: 'In-App Notifications',  desc: 'Show notifications in the app',        enabled: true,  icon: BellRing,      iconBg: 'bg-purple-950/60',  iconColor: 'text-purple-400' },
  { label: 'Push Notifications',    desc: 'Send push notifications to mobile',    enabled: false, icon: Smartphone,    iconBg: 'bg-orange-950/60',  iconColor: 'text-orange-400' },
])

const alertTypes = [
  { label: 'Handover',    cls: 'bg-blue-950/70 text-blue-400 border-blue-700/50' },
  { label: 'Return',      cls: 'bg-emerald-950/70 text-emerald-400 border-emerald-700/50' },
  { label: 'Overdue',     cls: 'bg-red-950/70 text-red-400 border-red-700/50' },
  { label: 'Incident',    cls: 'bg-amber-950/70 text-amber-400 border-amber-700/50' },
  { label: 'Maintenance', cls: 'bg-purple-950/70 text-purple-400 border-purple-700/50' },
  { label: 'Low Ammo',    cls: 'bg-orange-950/70 text-orange-400 border-orange-700/50' },
]

// ── INTEGRATIONS ──
const externalServices = ref([
  { label: 'Email Service (SMTP)', desc: 'smtp.example.com',          enabled: true },
  { label: 'SMS Service (Twilio)', desc: 'API: **********',           enabled: true },
  { label: 'REST API Access',      desc: 'External integrations via API', enabled: true },
])

const apiKeys = [
  { label: 'Production API Key',  value: 'ak_prod_••••••••••••••••••••', color: 'text-emerald-400' },
  { label: 'Development API Key', value: 'ak_dev_•••••••••••••••••••••', color: 'text-blue-400' },
  { label: 'Webhook URL',         value: 'https://api.armoury.system/webhooks', color: 'text-purple-400' },
]

const copiedKey = ref<string | null>(null)

function copyToClipboard(key: { label: string; value: string }) {
  navigator.clipboard.writeText(key.value).then(() => {
    copiedKey.value = key.label
    setTimeout(() => { copiedKey.value = null }, 2000)
  })
}

const healthItems = [
  { label: 'Database',     value: 'Online',  sub: 'Response: 12ms',   icon: Database,      iconColor: 'text-emerald-400', borderLeft: 'border-l-emerald-500' },
  { label: 'Email Service', value: 'Healthy', sub: 'Queue: 0 pending', icon: Mail,          iconColor: 'text-emerald-400', borderLeft: 'border-l-emerald-500' },
  { label: 'SMS Service',  value: 'Healthy',  sub: 'Queue: 0 pending', icon: MessageSquare, iconColor: 'text-emerald-400', borderLeft: 'border-l-emerald-500' },
  { label: 'Uptime',       value: '99.9%',    sub: 'Last 30 days',     icon: Clock,         iconColor: 'text-blue-400',    borderLeft: 'border-l-blue-500' },
]
</script>