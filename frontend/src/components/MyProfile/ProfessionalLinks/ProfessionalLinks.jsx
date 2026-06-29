import React from 'react';
import * as Icons from 'lucide-react';
import './ProfessionalLinks.css';

const GithubIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 18}
    height={props.size || 18}
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 18}
    height={props.size || 18}
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ProfessionalLinks({ links, isEditing, onChange }) {
  const GlobeIcon = Icons.Globe;
  const CodeIcon = Icons.Code;
  const TerminalIcon = Icons.Terminal;
  const ExternalLinkIcon = Icons.ExternalLink;

  // Configuration for platforms
  const PLATFORMS = [
    {
      key: 'portfolio',
      name: 'Portfolio',
      icon: GlobeIcon,
      placeholder: 'https://yourportfolio.com',
      colorClass: 'portfolio-color'
    },
    {
      key: 'github',
      name: 'GitHub',
      icon: GithubIcon,
      placeholder: 'https://github.com/username',
      colorClass: 'github-color'
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      icon: LinkedinIcon,
      placeholder: 'https://linkedin.com/in/username',
      colorClass: 'linkedin-color'
    },
    {
      key: 'leetcode',
      name: 'LeetCode',
      icon: CodeIcon,
      placeholder: 'https://leetcode.com/username',
      colorClass: 'leetcode-color'
    },
    {
      key: 'codechef',
      name: 'CodeChef',
      icon: TerminalIcon,
      placeholder: 'https://codechef.com/users/username',
      colorClass: 'codechef-color'
    }
  ];

  // Helper to extract username/display text from URL
  const getDisplayLink = (url, platformKey) => {
    if (!url) return 'Not Provided';
    try {
      const parsed = new URL(url);
      if (platformKey === 'portfolio') {
        return parsed.hostname + parsed.pathname;
      }
      const path = parsed.pathname;
      if (path && path !== '/') {
        const parts = path.split('/').filter(Boolean);
        if (platformKey === 'codechef' && parts.includes('users')) {
          return parts[parts.length - 1];
        }
        return parts[0] || url;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  return (
    <div className={`professional-links-card ${isEditing ? 'card-editing-mode' : ''}`}>
      <div className="links-header">
        <h3 className="section-card-title">Professional Links</h3>
        {isEditing && <span className="action-hint transition-fade">Link edits enabled</span>}
      </div>

      <div className="links-list-container">
        {PLATFORMS.map((platform) => {
          const IconComponent = platform.icon;
          const urlValue = links[platform.key] || '';
          
          return (
            <div key={platform.key} className="link-item-row">
              {/* Left side brand icon */}
              <div className={`platform-icon-container ${platform.colorClass}`}>
                <IconComponent size={18} />
              </div>
              
              <div className="platform-details">
                <span className="platform-name">{platform.name}</span>
                
                {/* Link input vs anchor element */}
                {isEditing ? (
                  <input
                    type="url"
                    value={urlValue}
                    onChange={(e) => onChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="link-input-field transition-fade"
                  />
                ) : (
                  <div className="link-display-wrapper">
                    {urlValue ? (
                      <a
                        href={urlValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-anchor-link"
                      >
                        <span className="anchor-text">{getDisplayLink(urlValue, platform.key)}</span>
                        <ExternalLinkIcon size={14} className="external-link-icon" />
                      </a>
                    ) : (
                      <span className="link-empty-text">Not Linked</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
