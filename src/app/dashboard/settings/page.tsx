"use client";

import { useState } from "react";
import {
  PageHeader,
  Tabs,
  Card,
  Button,
  Input,
  Select,
  Switch,
  Textarea,
  Avatar,
  Badge,
  Icon,
} from "@/components";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const timezoneOptions = [
  { value: "utc-8", label: "(UTC-8) Pacific Time" },
  { value: "utc-5", label: "(UTC-5) Eastern Time" },
  { value: "utc+0", label: "(UTC+0) Greenwich Mean Time" },
  { value: "utc+1", label: "(UTC+1) Central European Time" },
  { value: "utc+5:30", label: "(UTC+5:30) India Standard Time" },
  { value: "utc+9", label: "(UTC+9) Japan Standard Time" },
];

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

const sidebarPositionOptions = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
];

const mockSessions = [
  { id: "1", device: "MacBook Pro — Chrome", location: "New York, US", time: "Active now" },
  { id: "2", device: "iPhone 15 — Safari", location: "London, UK", time: "2 hours ago" },
  { id: "3", device: "Windows PC — Firefox", location: "Berlin, DE", time: "3 days ago" },
];

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Senior Product Designer",
    bio: "Design leader passionate about creating intuitive user experiences. 8+ years in SaaS product design.",
    timezone: "utc-5",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  const updateField = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Avatar section */}
      <div className="flex items-center gap-4">
        <Avatar name="Alex Johnson" size="xl" />
        <div>
          <Button variant="secondary" size="sm">
            Change Photo
          </Button>
          <p className="mt-1 text-xs text-zinc-500 dark:text-[#9FAEC1]">
            JPG, PNG or GIF. Max 2MB.
          </p>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Your full name"
          value={profile.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={profile.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <Input
          label="Phone"
          placeholder="+1 (555) 000-0000"
          value={profile.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        <Input
          label="Job Title"
          placeholder="Your role"
          value={profile.jobTitle}
          onChange={(e) => updateField("jobTitle", e.target.value)}
        />
      </div>

      <Textarea
        label="Bio"
        placeholder="Tell us a bit about yourself..."
        rows={4}
        value={profile.bio}
        onChange={(e) => updateField("bio", e.target.value)}
      />

      <Select
        label="Timezone"
        options={timezoneOptions}
        value={profile.timezone}
        onChange={(e) => updateField("timezone", e.target.value)}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button variant="primary" isLoading={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState(mockSessions);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleUpdatePassword = () => {
    setUpdatingPassword(true);
    setTimeout(() => {
      setUpdatingPassword(false);
      setPasswords({ current: "", newPassword: "", confirm: "" });
    }, 1500);
  };

  const handleRevoke = (id: string) => {
    setRevokingId(id);
    setTimeout(() => {
      setSessions((prev) => prev.filter((s) => s.id !== id));
      setRevokingId(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            Change Password
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              value={passwords.current}
              onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              value={passwords.confirm}
              onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
            />
            <Button variant="primary" isLoading={updatingPassword} onClick={handleUpdatePassword}>
              {updatingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            Two-Factor Authentication
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-700 dark:text-[#E2E8F0]">
                Add an extra layer of security to your account
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-[#9FAEC1]">
                You&apos;ll be asked for a verification code when signing in on a new device.
              </p>
            </div>
            <Switch
              label=""
              checked={twoFactor}
              onChange={() => setTwoFactor(!twoFactor)}
            />
          </div>
          {twoFactor && (
            <div className="mt-3">
              <Badge variant="success">Enabled</Badge>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Active Sessions */}
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            Active Sessions
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-[#2D3640]"
              >
                <div className="flex items-center gap-3">
                  <Icon name="shield" size="md" className="text-zinc-500 dark:text-[#9FAEC1]" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">
                      {session.device}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">
                      {session.location} · {session.time}
                    </p>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  isLoading={revokingId === session.id}
                  onClick={() => handleRevoke(session.id)}
                >
                  Revoke
                </Button>
              </div>
            ))}
            {sessions.length === 0 && (
              <p className="text-sm text-zinc-500 dark:text-[#9FAEC1]">
                No active sessions.
              </p>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
    marketing: false,
    security: true,
    mentions: true,
  });
  const [saving, setSaving] = useState(false);

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            Notification Preferences
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Email notifications</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Receive updates via email</p>
              </div>
              <Switch checked={prefs.email} onChange={() => toggle("email")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Push notifications</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Browser push notifications</p>
              </div>
              <Switch checked={prefs.push} onChange={() => toggle("push")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Weekly digest</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Summary of activity every Monday</p>
              </div>
              <Switch checked={prefs.weeklyDigest} onChange={() => toggle("weeklyDigest")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Marketing emails</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Product updates and offers</p>
              </div>
              <Switch checked={prefs.marketing} onChange={() => toggle("marketing")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Security alerts</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Login attempts and suspicious activity</p>
              </div>
              <Switch checked={prefs.security} onChange={() => toggle("security")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Mention notifications</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">When someone mentions you</p>
              </div>
              <Switch checked={prefs.mentions} onChange={() => toggle("mentions")} />
            </div>
          </div>
        </Card.Body>
      </Card>

      <Button variant="primary" isLoading={saving} onClick={handleSave}>
        {saving ? "Saving..." : "Save Preferences"}
      </Button>
    </div>
  );
}

// ─── Appearance Tab ───────────────────────────────────────────────────────────

function AppearanceTab() {
  const [appearance, setAppearance] = useState({
    theme: "system",
    language: "en",
    sidebarPosition: "left",
    compactMode: false,
    animations: true,
  });
  const [applying, setApplying] = useState(false);

  const updateField = (field: string, value: string | boolean) => {
    setAppearance((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => setApplying(false), 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#E8EDF2]">
            Display Settings
          </h3>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <Select
              label="Theme"
              options={themeOptions}
              value={appearance.theme}
              onChange={(e) => updateField("theme", e.target.value)}
            />
            <Select
              label="Language"
              options={languageOptions}
              value={appearance.language}
              onChange={(e) => updateField("language", e.target.value)}
            />
            <Select
              label="Sidebar Position"
              options={sidebarPositionOptions}
              value={appearance.sidebarPosition}
              onChange={(e) => updateField("sidebarPosition", e.target.value)}
            />

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Compact Mode</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Reduce spacing and padding</p>
              </div>
              <Switch
                checked={appearance.compactMode}
                onChange={() => updateField("compactMode", !appearance.compactMode)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-[#E8EDF2]">Animations</p>
                <p className="text-xs text-zinc-500 dark:text-[#9FAEC1]">Enable interface animations</p>
              </div>
              <Switch
                checked={appearance.animations}
                onChange={() => updateField("animations", !appearance.animations)}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      <Button variant="primary" isLoading={applying} onClick={handleApply}>
        {applying ? "Applying..." : "Apply"}
      </Button>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const tabItems = [
    { id: "profile", label: "Profile", content: <ProfileTab /> },
    { id: "security", label: "Security", content: <SecurityTab /> },
    { id: "notifications", label: "Notifications", content: <NotificationsTab /> },
    { id: "appearance", label: "Appearance", content: <AppearanceTab /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and workspace"
      />
      <Tabs items={tabItems} defaultTab="profile" />
    </div>
  );
}
