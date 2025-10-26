// FILE: src/app/components/home/Footer.js
'use client';

import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faYoutube, 
  faInstagram, 
  faTiktok, 
  faThreads, 
  faFacebook, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    youtube: 'https://youtube.com/@sellinginfinity?si=BOhyRQ-PfeRLEtUo',
    instagram: 'https://www.instagram.com/sellinginfinity',
    tiktok: 'https://www.tiktok.com/@sellinginfinity',
    threads: 'https://www.threads.net/@sellinginfinity',
    twitter: '',
    linkedin: '',
    facebook: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    try {
      const response = await fetch('/api/admin/social-links');
      const data = await response.json();

      if (data.success) {
        setSocialLinks(data.socials);
      }
    } catch (error) {
      console.error('Error loading social links:', error);
      // Keep default links if API fails
    }
    setLoading(false);
  };

  const socialPlatforms = [
    {
      key: 'youtube',
      name: 'YouTube',
      icon: <FontAwesomeIcon icon={faYoutube} className="text-xl" />,
      hoverColor: 'hover:text-red-600 dark:hover:text-red-500'
    },
    {
      key: 'instagram',
      name: 'Instagram',
      icon: <FontAwesomeIcon icon={faInstagram} className="text-xl" />,
      hoverColor: 'hover:text-pink-600 dark:hover:text-pink-500'
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      icon: <FontAwesomeIcon icon={faTiktok} className="text-xl" />,
      hoverColor: 'hover:text-cyan-500'
    },
    {
      key: 'threads',
      name: 'Threads',
      icon: <FontAwesomeIcon icon={faThreads} className="text-xl" />,
      hoverColor: 'hover:text-white'
    },
    {
      key: 'facebook',
      name: 'Facebook',
      icon: <FontAwesomeIcon icon={faFacebook} className="text-xl" />,
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-500'
    },
    {
      key: 'twitter',
      name: 'X (Twitter)',
      icon: <FontAwesomeIcon icon={faXTwitter} className="text-xl" />,
      hoverColor: 'hover:text-blue-700 dark:hover:text-blue-600'
    }
  ]; return (
    <footer id="contact" className="section-padding bg-[#0f1729] border-t border-white/20 text-white">
      <div className="content-container container-padding">
        <div className="text-center">
          {/* Social Media Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Selling Infinity</h3>
            <div className="flex justify-center space-x-6 flex-wrap gap-2">
              {loading ? (
                <div className="flex space-x-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-24 h-8 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : (
                socialPlatforms
                  .filter(platform => socialLinks[platform.key])
                  .map(platform => (
                    <a
                      key={platform.key}
                      href={socialLinks[platform.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 text-white/70 ${platform.hoverColor} transition-colors`}
                    >
                      {platform.icon}
                      <span>{platform.name}</span>
                    </a>
                  ))
              )}
            </div>
          </div>

          <p className="text-white/60">
            © 2025 Selling Infinity
          </p>
          <div className="mt-4">
            <Calendar size={24} className="text-yellow-400 mx-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
