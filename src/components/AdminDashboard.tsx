import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { X, AlertCircle } from 'lucide-react';
import { checkStorageQuota } from '@/utils/imageCompression';
import { AdminImageInput } from './AdminImageInput';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard = ({ onClose }: AdminDashboardProps) => {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [localData, setLocalData] = useState(() => {
    // Ensure all sections have data
    return {
      hero: content?.hero || {},
      about: content?.about || {},
      services: content?.services || {},
      work: content?.work || {},
      contact: content?.contact || {},
      navbar: content?.navbar || {},
      marquee: content?.marquee || {},
      textReveal: content?.textReveal || {},
      testimonials: content?.testimonials || {},
      global: content?.global || {},
      ...content,
    };
  });

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About Section' },
    { id: 'services', label: 'Services' },
    { id: 'work', label: 'Work/Portfolio' },
    { id: 'contact', label: 'Contact' },
    { id: 'navbar', label: 'Navbar' },
    { id: 'marquee', label: 'Marquee Text' },
    { id: 'textReveal', label: 'Text Reveal' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'global', label: 'Global Settings' },
  ];

  const colorSchemes = {
    'pink-purple': { label: 'Pink & Purple', primary: '320 85% 55%', secondary: '270 60% 50%' },
    'blue-cyan': { label: 'Blue & Cyan', primary: '200 95% 50%', secondary: '180 85% 45%' },
    'orange-red': { label: 'Orange & Red', primary: '30 95% 55%', secondary: '0 90% 55%' },
    'green-teal': { label: 'Green & Teal', primary: '150 70% 45%', secondary: '170 80% 50%' },
    'purple-indigo': { label: 'Purple & Indigo', primary: '270 80% 55%', secondary: '260 95% 50%' },
  };

  const handleSave = () => {
    updateContent(activeTab, localData[activeTab as keyof typeof localData]);
    
    // Check storage size
    const storageCheck = checkStorageQuota(JSON.stringify(localData));
    if (!storageCheck.safe) {
      alert(`⚠️ Warning: Storage is ${storageCheck.size}. Consider using smaller images.`);
    } else {
      alert('Changes saved successfully!');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      resetContent();
      setLocalData(content);
    }
  };

  const handleInputChange = (path: string, value: any) => {
    setLocalData((prev) => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const renderHeroEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Greeting</label>
        <input
          type="text"
          value={localData.hero.greeting}
          onChange={(e) => handleInputChange('hero.greeting', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">First Name</label>
        <input
          type="text"
          value={localData.hero.name}
          onChange={(e) => handleInputChange('hero.name', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Last Name</label>
        <input
          type="text"
          value={localData.hero.lastName}
          onChange={(e) => handleInputChange('hero.lastName', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Hero Label</label>
        <input
          type="text"
          value={localData.hero.label}
          onChange={(e) => handleInputChange('hero.label', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={localData.hero.description}
          onChange={(e) => handleInputChange('hero.description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Hero Image</label>
        <AdminImageInput
          category="hero"
          value={localData.hero.image}
          onChange={(img) => handleInputChange('hero.image', img)}
          label="Hero Image"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Button 1 Text</label>
        <input
          type="text"
          value={localData.hero.buttons[0].text}
          onChange={(e) => handleInputChange('hero.buttons.0.text', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Button 2 Text</label>
        <input
          type="text"
          value={localData.hero.buttons[1].text}
          onChange={(e) => handleInputChange('hero.buttons.1.text', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Section Label</label>
        <input
          type="text"
          value={localData.about.sectionLabel}
          onChange={(e) => handleInputChange('about.sectionLabel', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Heading Line 1</label>
        <input
          type="text"
          value={localData.about.heading1}
          onChange={(e) => handleInputChange('about.heading1', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Heading Line 2</label>
        <input
          type="text"
          value={localData.about.heading2}
          onChange={(e) => handleInputChange('about.heading2', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">About Image</label>
        <AdminImageInput
          category="about"
          value={localData.about.image}
          onChange={(img) => handleInputChange('about.image', img)}
          label="About Image"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Paragraph 1</label>
        <textarea
          value={localData.about.paragraphs[0]}
          onChange={(e) => handleInputChange('about.paragraphs.0', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Paragraph 2</label>
        <textarea
          value={localData.about.paragraphs[1]}
          onChange={(e) => handleInputChange('about.paragraphs.1', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
    </div>
  );

  const renderServicesEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Section Label</label>
        <input
          type="text"
          value={localData.services.sectionLabel}
          onChange={(e) => handleInputChange('services.sectionLabel', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Heading</label>
        <input
          type="text"
          value={localData.services.heading}
          onChange={(e) => handleInputChange('services.heading', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-4">Services</h4>
        {localData.services.items.map((item, idx) => (
          <div key={idx} className="mb-6 p-4 border border-border rounded-md">
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleInputChange(`services.items.${idx}.title`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Description</label>
              <textarea
                value={item.desc}
                onChange={(e) => handleInputChange(`services.items.${idx}.desc`, e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Price</label>
              <input
                type="text"
                value={item.price}
                onChange={(e) => handleInputChange(`services.items.${idx}.price`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Section Label</label>
        <input
          type="text"
          value={localData.work.sectionLabel}
          onChange={(e) => handleInputChange('work.sectionLabel', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Heading</label>
        <input
          type="text"
          value={localData.work.heading}
          onChange={(e) => handleInputChange('work.heading', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={localData.work.description}
          onChange={(e) => handleInputChange('work.description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">CTA Text</label>
        <input
          type="text"
          value={localData.work.cta}
          onChange={(e) => handleInputChange('work.cta', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">CTA Button Text</label>
        <input
          type="text"
          value={localData.work.ctaButton}
          onChange={(e) => handleInputChange('work.ctaButton', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-4">Portfolio Items</h4>
        {localData.work.items.map((item, idx) => (
          <div key={idx} className="mb-6 p-4 border border-border rounded-md">
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleInputChange(`work.items.${idx}.title`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Category</label>
              <input
                type="text"
                value={item.category}
                onChange={(e) => handleInputChange(`work.items.${idx}.category`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Views</label>
              <input
                type="text"
                value={item.views}
                onChange={(e) => handleInputChange(`work.items.${idx}.views`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Image</label>
              <AdminImageInput
                category="work"
                fieldIndex={idx}
                value={item.image}
                onChange={(img) => handleInputChange(`work.items.${idx}.image`, img)}
                label="Portfolio Image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Section Label</label>
        <input
          type="text"
          value={localData.contact.sectionLabel}
          onChange={(e) => handleInputChange('contact.sectionLabel', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Heading</label>
        <input
          type="text"
          value={localData.contact.heading}
          onChange={(e) => handleInputChange('contact.heading', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Subheading</label>
        <input
          type="text"
          value={localData.contact.subheading}
          onChange={(e) => handleInputChange('contact.subheading', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={localData.contact.description}
          onChange={(e) => handleInputChange('contact.description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          type="email"
          value={localData.contact.email}
          onChange={(e) => handleInputChange('contact.email', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Email Button Text</label>
        <input
          type="text"
          value={localData.contact.emailButtonText}
          onChange={(e) => handleInputChange('contact.emailButtonText', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-4">Social Links</h4>
        {localData.contact.socialLinks.map((social, idx) => (
          <div key={idx} className="mb-4 p-4 border border-border rounded-md">
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Platform</label>
              <input
                type="text"
                value={social.platform}
                onChange={(e) => handleInputChange(`contact.socialLinks.${idx}.platform`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">URL</label>
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleInputChange(`contact.socialLinks.${idx}.url`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-4">Footer</h4>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Copyright Text</label>
          <input
            type="text"
            value={localData.contact.footerCopyright}
            onChange={(e) => handleInputChange('contact.footerCopyright', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Branding Text</label>
          <input
            type="text"
            value={localData.contact.footerBranding}
            onChange={(e) => handleInputChange('contact.footerBranding', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md"
          />
        </div>
      </div>
    </div>
  );

  const renderNavbarEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Logo Text</label>
        <input
          type="text"
          value={localData.navbar.logo}
          onChange={(e) => handleInputChange('navbar.logo', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">CTA Button Text</label>
        <input
          type="text"
          value={localData.navbar.ctaText}
          onChange={(e) => handleInputChange('navbar.ctaText', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-4">Navigation Links</h4>
        {localData.navbar.buttons.map((btn, idx) => (
          <div key={idx} className="mb-3 flex gap-2">
            <input
              type="text"
              value={btn}
              onChange={(e) => handleInputChange(`navbar.buttons.${idx}`, e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderGlobalEditor = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Site Name</label>
        <input
          type="text"
          value={localData.global.siteName}
          onChange={(e) => handleInputChange('global.siteName', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      
      <div className="border-t pt-6">
        <h4 className="font-semibold mb-4">🎨 Color Scheme (Easy Selection)</h4>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(colorSchemes).map(([key, scheme]: any) => (
            <button
              key={key}
              onClick={() => {
                handleInputChange('global.colors.primary', scheme.primary);
                handleInputChange('global.colors.secondary', scheme.secondary);
              }}
              className={`p-3 rounded-md border-2 transition-all ${
                localData.global.colors.primary === scheme.primary
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{scheme.label}</span>
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: `hsl(${scheme.primary})` }}
                  />
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: `hsl(${scheme.secondary})` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-semibold mb-2">Advanced Color Options</summary>
          <div className="space-y-3 pt-2 border-t">
            <div>
              <label className="block text-xs font-semibold mb-2">Primary Color (HSL)</label>
              <input
                type="text"
                value={localData.global.colors.primary}
                onChange={(e) => handleInputChange('global.colors.primary', e.target.value)}
                placeholder="e.g., 320 85% 55%"
                className="w-full px-3 py-2 border border-border rounded-md font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">Secondary Color (HSL)</label>
              <input
                type="text"
                value={localData.global.colors.secondary}
                onChange={(e) => handleInputChange('global.colors.secondary', e.target.value)}
                placeholder="e.g., 270 60% 50%"
                className="w-full px-3 py-2 border border-border rounded-md font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">Background Color (HSL)</label>
              <input
                type="text"
                value={localData.global.colors.background}
                onChange={(e) => handleInputChange('global.colors.background', e.target.value)}
                placeholder="e.g., 0 0% 98%"
                className="w-full px-3 py-2 border border-border rounded-md font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2">Foreground Color (HSL)</label>
              <input
                type="text"
                value={localData.global.colors.foreground}
                onChange={(e) => handleInputChange('global.colors.foreground', e.target.value)}
                placeholder="e.g., 0 0% 15%"
                className="w-full px-3 py-2 border border-border rounded-md font-mono text-xs"
              />
            </div>
          </div>
        </details>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-semibold mb-4">Fonts</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Display Font</label>
            <select
              value={localData.global.fonts.display}
              onChange={(e) => handleInputChange('global.fonts.display', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            >
              <option>Cantora One</option>
              <option>Playfair Display</option>
              <option>Montserrat</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Body Font</label>
            <select
              value={localData.global.fonts.body}
              onChange={(e) => handleInputChange('global.fonts.body', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            >
              <option>Kreon</option>
              <option>Lora</option>
              <option>Inter</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Accent Font</label>
            <select
              value={localData.global.fonts.accent}
              onChange={(e) => handleInputChange('global.fonts.accent', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md"
            >
              <option>Meie Script</option>
              <option>Galindo</option>
              <option>Changa One</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-semibold mb-4">Animation Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Scroll Speed ({localData.global.animations.scrollSpeed}x)</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={localData.global.animations.scrollSpeed}
              onChange={(e) => handleInputChange('global.animations.scrollSpeed', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Fade In Duration ({localData.global.animations.fadeInDuration}s)</label>
            <input
              type="range"
              min="0.3"
              max="2"
              step="0.1"
              value={localData.global.animations.fadeInDuration}
              onChange={(e) => handleInputChange('global.animations.fadeInDuration', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Hover Scale ({localData.global.animations.hoverScale}x)</label>
            <input
              type="range"
              min="1"
              max="1.2"
              step="0.01"
              value={localData.global.animations.hoverScale}
              onChange={(e) => handleInputChange('global.animations.hoverScale', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarqueeEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Marquee Text Line 1</label>
        <textarea
          value={localData.marquee.text1}
          onChange={(e) => handleInputChange('marquee.text1', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Marquee Text Line 2</label>
        <textarea
          value={localData.marquee.text2}
          onChange={(e) => handleInputChange('marquee.text2', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
    </div>
  );

  const renderTextRevealEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Reveal Text</label>
        <textarea
          value={localData.textReveal.text}
          onChange={(e) => handleInputChange('textReveal.text', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
    </div>
  );

  const renderTestimonialsEditor = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Section Label</label>
        <input
          type="text"
          value={localData.testimonials.sectionLabel}
          onChange={(e) => handleInputChange('testimonials.sectionLabel', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-2">Heading</label>
        <input
          type="text"
          value={localData.testimonials.heading}
          onChange={(e) => handleInputChange('testimonials.heading', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md"
        />
      </div>
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-4">Testimonials</h4>
        {localData.testimonials.items.map((item, idx) => (
          <div key={idx} className="mb-6 p-4 border border-border rounded-md">
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Quote</label>
              <textarea
                value={item.quote}
                onChange={(e) => handleInputChange(`testimonials.items.${idx}.quote`, e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleInputChange(`testimonials.items.${idx}.name`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Role</label>
              <input
                type="text"
                value={item.role}
                onChange={(e) => handleInputChange(`testimonials.items.${idx}.role`, e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => {
    switch (activeTab) {
      case 'hero':
        return renderHeroEditor();
      case 'about':
        return renderAboutEditor();
      case 'services':
        return renderServicesEditor();
      case 'work':
        return renderWorkEditor();
      case 'contact':
        return renderContactEditor();
      case 'navbar':
        return renderNavbarEditor();
      case 'marquee':
        return renderMarqueeEditor();
      case 'textReveal':
        return renderTextRevealEditor();
      case 'testimonials':
        return renderTestimonialsEditor();
      case 'global':
        return renderGlobalEditor();
      default:
        return <div className="text-center py-8 text-muted-foreground">Select a section to edit</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white">
          <h1 className="text-2xl font-bold font-accent-changa">Admin Dashboard</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 border-r border-border p-4 bg-gray-50">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-h-[60vh] overflow-y-auto mb-6">
              {renderEditor()}
            </div>

            {/* Actions */}
            <div className="flex gap-4 border-t pt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-border rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-border rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
