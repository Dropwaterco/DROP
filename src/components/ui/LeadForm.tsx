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
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      <div className="text-center py-16 px-8 border border-[#C9A46A]/30 rounded-xl bg-[#C9A46A]/[0.04] backdrop-blur-md" aria-live="polite">
        <div className="w-16 h-16 bg-[#C9A46A]/10 border border-[#E8C888]/40 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(201,164,106,0.2)]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8C888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-[#E8C888] text-2xl font-serif tracking-wide mb-3 uppercase font-normal">{config.successTitle}</h3>
        <p className="text-[#F2EFEA]/70 font-light text-sm tracking-wider uppercase">{message}</p>
      </div>
    );
  }

  const formClassName = config.layout === 'grid'
    ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10'
    : 'space-y-10';

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
        const isFocused = focusedField === field.name;
        const hasValue = !!formData[field.name];
        const isFloating = isFocused || hasValue;

        if (field.type === 'select') {
          return (
            <div key={field.name} className={`${wrapperClass} flex flex-col gap-4 mt-4`}>
              <label className="text-[#C9A46A]/80 text-[11px] font-medium tracking-[0.2em] uppercase">
                {field.label} {field.required && '*'}
              </label>
              <div className="flex flex-wrap gap-2.5">
                {field.options?.map((opt) => {
                  const isSelected = formData[field.name] === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleChange(field.name, opt)}
                      className={`px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 border focus:outline-none focus:ring-1 focus:ring-[#E8C888] cursor-pointer ${
                        isSelected 
                          ? 'bg-gradient-to-r from-[#C9A46A] via-[#E8C888] to-[#C9A46A] text-[#0A0A0B] border-[#E8C888] shadow-[0_0_20px_rgba(201,164,106,0.35)] scale-[1.02]' 
                          : 'bg-transparent text-[#F2EFEA]/70 border-[#C9A46A]/25 hover:border-[#E8C888]/60 hover:text-[#F2EFEA] hover:bg-[#C9A46A]/[0.05]'
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
          <div key={field.name} className={`${wrapperClass} relative mt-4`}>
            <label 
              htmlFor={fieldId} 
              className={`absolute left-0 transition-all duration-300 pointer-events-none text-[11px] font-medium tracking-[0.2em] uppercase ${
                isFloating 
                  ? '-top-6 text-[#E8C888]' 
                  : 'top-4 text-[#C9A46A]/60'
              }`}
            >
              {field.label} {field.required && '*'}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={fieldId}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                required={field.required}
                rows={4}
                className="w-full py-4 bg-transparent border-b border-[#C9A46A]/20 text-[#F2EFEA] caret-[#F2EFEA] text-sm font-light tracking-wide focus:outline-none focus:border-[#E8C888] transition-all rounded-none resize-none shadow-[0_4px_16px_rgba(0,0,0,0)] focus:shadow-[0_4px_16px_rgba(201,164,106,0.15)]"
                disabled={status === 'loading'}
              />
            ) : (
              <input
                id={fieldId}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
                required={field.required}
                className="w-full py-4 bg-transparent border-b border-[#C9A46A]/20 text-[#F2EFEA] caret-[#F2EFEA] text-sm font-light tracking-wide focus:outline-none focus:border-[#E8C888] transition-all rounded-none shadow-[0_4px_16px_rgba(0,0,0,0)] focus:shadow-[0_4px_16px_rgba(201,164,106,0.15)]"
                disabled={status === 'loading'}
              />
            )}
          </div>
        );
      })}

      {status === 'error' && (
        <p className={`${config.layout === 'grid' ? 'md:col-span-2 ' : ''}text-[#E8C888] text-xs font-medium text-center tracking-wider`} role="alert">
          {message}
        </p>
      )}

      <div className={config.layout === 'grid' ? 'md:col-span-2 pt-6' : 'pt-6'}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group relative w-full py-5 bg-gradient-to-r from-[#C9A46A] via-[#E8C888] to-[#C9A46A] bg-[length:200%_auto] hover:bg-[position:right_center] disabled:opacity-50 disabled:cursor-not-allowed text-[#0A0A0B] font-bold tracking-[0.25em] text-xs rounded-full shadow-[0_0_25px_rgba(201,164,106,0.25)] hover:shadow-[0_0_35px_rgba(232,200,136,0.4)] hover:-translate-y-0.5 transition-all duration-500 uppercase cursor-pointer overflow-hidden flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#E8C888]"
        >
          <span className="relative z-10">
            {status === 'loading' ? config.submitLoadingText : config.submitText}
          </span>
          <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-[#0A0A0B]">
            <span className="w-2 h-2 bg-[#0A0A0B] rounded-full animate-pulse" />
            <span className="w-2 h-2 bg-[#0A0A0B] rounded-full animate-pulse delay-75" />
          </span>
        </button>
      </div>
    </form>
  );
}
