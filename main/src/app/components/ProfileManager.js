'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useTimezone } from '@/app/context/TimezoneContext';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, CheckCircle, Globe } from 'lucide-react';

export default function ProfileManager() {
  const { user, getProfile, updateProfile } = useAuth();
  const { userTimezone, timezoneOptions, getTimezonesByRegion, updateTimezone, getDetectedCountry } = useTimezone();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    company: '',
    job_title: '',
    bio: '',
    timezone: 'UTC',
    notification_preferences: {
      email_bookings: true,
      email_reminders: true,
      sms_reminders: false
    }
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    setLoading(true);
    const { data, error } = await getProfile();
    if (!error && data) {
      setProfile(data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone: data.phone || '',
        company: data.company || '',
        job_title: data.job_title || '',
        bio: data.bio || '',
        timezone: data.timezone || userTimezone || 'UTC',
        notification_preferences: data.notification_preferences || {
          email_bookings: true,
          email_reminders: true,
          sms_reminders: false
        }
      });
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notification_preferences: {
          ...prev.notification_preferences,
          [prefKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    const { data, error } = await updateProfile(formData);
    
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setProfile(data);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Update global timezone if it changed
      if (formData.timezone !== userTimezone) {
        updateTimezone(formData.timezone);
      }
      
      setTimeout(() => setMessage(''), 3000);
    }
    
    setSaving(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfile(); // Reset form data
    setMessage('');
  };

  if (loading) {
    return (
      <div className="bg-[#0f1729] rounded-lg shadow p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1729] rounded-lg shadow border border-white/20">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <User className="mr-2" size={20} />
          Profile Settings
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 size={16} className="mr-1" />
            Edit
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Save size={16} className="mr-1" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-3 py-1.5 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`mx-6 mt-4 p-3 rounded-lg ${
          message.includes('Error') 
            ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' 
            : 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
        }`}>
          <div className="flex items-center">
            <CheckCircle size={16} className="mr-2" />
            {message}
          </div>
        </div>
      )}

      {/* Profile Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white/80">
                  Email Address
                </label>
                <div className="flex items-center px-3 py-2 border border-white/20 rounded-lg bg-white/10">
                  <Mail size={16} className="text-white/60 mr-2" />
                  <span className="text-white">{user?.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white/80">
                    First Name
                  </label>
                  {!isEditing ? (
                    <div className="px-3 py-2 border border-white/20 rounded-lg bg-[#0f1729]">
                      <span className="text-white">{formData.first_name || 'Not provided'}</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white/80">
                    Last Name
                  </label>
                  {!isEditing ? (
                    <div className="px-3 py-2 border border-white/20 rounded-lg bg-[#0f1729]">
                      <span className="text-white">{formData.last_name || 'Not provided'}</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white/80">
                  Phone Number
                </label>
                {!isEditing ? (
                  <div className="flex items-center px-3 py-2 border border-white/20 rounded-lg bg-white/10">
                    <Phone size={16} className="text-white/60 mr-2" />
                    <span className="text-white">{formData.phone || 'Not provided'}</span>
                  </div>
                ) : (
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Professional Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white/80">
                  Company
                </label>
                {!isEditing ? (
                  <div className="px-3 py-2 border border-white/20 rounded-lg bg-[#0f1729]">
                    <span className="text-white">{formData.company || 'Not provided'}</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white/80">
                  Job Title
                </label>
                {!isEditing ? (
                  <div className="px-3 py-2 border border-white/20 rounded-lg bg-[#0f1729]">
                    <span className="text-white">{formData.job_title || 'Not provided'}</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white/80">
                  <Globe className="inline mr-1" size={16} />
                  Timezone
                </label>
                {!isEditing ? (
                  <div className="flex items-center px-3 py-2 border border-white/20 rounded-lg bg-white/10">
                    <MapPin size={16} className="text-white/60 mr-2" />
                    <span className="text-white">{formData.timezone || 'Not set'}</span>
                  </div>
                ) : (
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
                    >
                      {Object.entries(getTimezonesByRegion()).map(([region, timezones]) => (
                        <optgroup key={region} label={region} className="text-white bg-[#0f1729]">
                          {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value} className="text-white bg-[#0f1729]">
                              {tz.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                )}
                {(() => {
                  const detectedCountry = getDetectedCountry();
                  return detectedCountry && detectedCountry.detected ? (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      🌍 Auto-detected: {detectedCountry.name} ({detectedCountry.code}) - {formData.timezone}
                    </p>
                  ) : (
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Current time: {(() => {
                        try {
                          // Only show time if timezone is valid and not empty
                          if (formData.timezone && formData.timezone.trim()) {
                            return new Date().toLocaleString('en-US', { 
                              timeZone: formData.timezone,
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            });
                          } else {
                            return new Date().toLocaleString('en-US', { 
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            });
                          }
                        } catch (error) {
                          console.error('Error formatting time:', error);
                          return new Date().toLocaleString('en-US', { 
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          });
                        }
                      })()}
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1 text-white/80">
            Bio
          </label>
          {!isEditing ? (
            <div className="px-3 py-2 border border-white/20 rounded-lg bg-white/10 min-h-[80px]">
              <span className="text-white">{formData.bio || 'No bio provided'}</span>
            </div>
          ) : (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              placeholder="Tell us a bit about yourself..."
              className="w-full px-3 py-2 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/10 text-white placeholder-white/60"
            />
          )}
        </div>

        {/* Notification Preferences */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications.email_bookings"
                checked={formData.notification_preferences.email_bookings}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 dark:text-green-600 focus:ring-blue-500 dark:focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <span className="ml-2 text-sm text-white">
                Email notifications for new bookings
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications.email_reminders"
                checked={formData.notification_preferences.email_reminders}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 dark:text-green-600 focus:ring-blue-500 dark:focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <span className="ml-2 text-sm text-white">
                Email reminders for upcoming sessions
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications.sms_reminders"
                checked={formData.notification_preferences.sms_reminders}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 dark:text-green-600 focus:ring-blue-500 dark:focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <span className="ml-2 text-sm text-white">
                SMS reminders for upcoming sessions
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
