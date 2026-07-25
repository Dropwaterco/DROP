'use client';

import { useState } from 'react';

export type FieldType = 'text' | 'email' | 'select' | 'textarea';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: readonly string[];
  colSpan?: 1 | 2;
}

export interface LeadFormConfig {
  endpoint: string;
  fields: FieldConfig[];
  submitText: string;
  submitLoadingText: string;
  successTitle: string;
  buttonTheme?: 'primary' | 'outline';
  layout?: 'stack' | 'grid';
  selectBgColor?: string;
}

export default function LeadForm({ config }: { config: LeadFormConfig }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Submitting your information...');

    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully submitted.');
        setFormData({});
      } else {
        setStatus('error');
        if (data.error && data.error.fields) {
          const errors = Object.values(data.error.fields).join(', ');
          setMessage(`${data.error.message}: ${errors}`);
        } else {
          setMessage(data.error?.message || data.error || 'Something went wrong.');
        }
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-left py-12 px-6 border border-[#00E599]/40 bg-[#00E599]/5 rounded-sm" aria-live="polite">
        <div className="text-[#00E599] text-xs font-mono font-bold tracking-[0.2em] uppercase mb-2">
          ✓ CONFIRMED
        </div>
        <h3 className="text-white text-2xl font-bold tracking-tight mb-2 uppercase">{config.successTitle}</h3>
        <p className="text-white/70 font-normal text-sm">{message}</p>
      </div>
    );
  }

  const formClassName = config.layout === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8'
    : 'space-y-7';

  return (
    <form onSubmit={handleSubmit} className={formClassName} noValidate={false}>
      {/* Live region for accessibility announcements */}
      <div aria-live="polite" className="sr-only">
        {status === 'loading' ? 'Submitting...' : ''}
        {status === 'error' ? message : ''}
      </div>

      {/* Honeypot field for bot protection */}
      <input
        type="text"
        name="website"
        value={formData.website || ''}
        onChange={(e) => handleChange('website', e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {config.fields.map((field) => {
        const wrapperClass = field.colSpan === 2 ? 'md:col-span-2' : '';
        const fieldId = `field-${field.name}`;

        if (field.type === 'select') {
          return (
            <div key={field.name} className={`${wrapperClass} flex flex-col gap-3 pt-2`}>
              <label className="text-white/50 text-[11px] font-mono tracking-[0.2em] uppercase">
                {field.label} {field.required && '*'}
              </label>
              <div className="flex flex-wrap gap-2">
                {field.options?.map((opt) => {
                  const isSelected = formData[field.name] === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleChange(field.name, opt)}
                      className={`px-4 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-colors duration-150 border cursor-pointer ${
                        isSelected 
                          ? 'bg-[#00E599] text-black border-[#00E599]' 
                          : 'bg-transparent text-white/60 border-white/15 hover:border-white/40 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {/* Hidden input to store value for native required validation */}
              <input 
                type="hidden" 
                name={field.name} 
                value={formData[field.name] || ''} 
                required={field.required} 
              />
            </div>
          );
        }

        return (
          <div key={field.name} className={`${wrapperClass} flex flex-col gap-2`}>
            <label 
              htmlFor={fieldId} 
              className="text-white/50 text-[11px] font-mono tracking-[0.2em] uppercase"
            >
              {field.label} {field.required && '*'}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={fieldId}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
                className="w-full py-3 bg-transparent border-b border-white/15 text-white caret-[#00E599] text-sm font-medium focus:outline-none focus:border-[#00E599] transition-colors duration-150 rounded-none resize-none placeholder:text-white/20"
                disabled={status === 'loading'}
              />
            ) : (
              <input
                id={fieldId}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full py-3 bg-transparent border-b border-white/15 text-white caret-[#00E599] text-sm font-medium focus:outline-none focus:border-[#00E599] transition-colors duration-150 rounded-none placeholder:text-white/20"
                disabled={status === 'loading'}
              />
            )}
          </div>
        );
      })}

      {status === 'error' && (
        <p className={`${config.layout === 'grid' ? 'md:col-span-2 ' : ''}text-red-400 text-xs font-mono tracking-wider`} role="alert">
          {message}
        </p>
      )}

      <div className={config.layout === 'grid' ? 'md:col-span-2 pt-4' : 'pt-4'}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-[#00E599] hover:bg-transparent text-black hover:text-[#00E599] border border-[#00E599] font-bold tracking-[0.2em] text-xs rounded-sm transition-colors duration-150 uppercase cursor-pointer"
        >
          {status === 'loading' ? config.submitLoadingText : config.submitText}
        </button>
      </div>
    </form>
  );
}
