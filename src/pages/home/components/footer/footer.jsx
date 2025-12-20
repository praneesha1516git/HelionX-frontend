import { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  MapPin, 
  Phone, 
  Mail,
  Zap,
  Lightbulb
} from 'lucide-react';

export default function footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  const solutions = [
    'Digital Twin Platform',
    'Predictive Analytics',
    'Remote Monitoring',
    'Performance Optimization',
    'Real-time Alerts',
    'Maintenance Planning'
  ];

  const resources = [
    'Documentation',
    'API Reference',
    'Case Studies',
    'White Papers',
    'Blog',
    'Support Center'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                
              
              <h2 className="text-2xl font-bold text-gray-900">HelionX Energy</h2>
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              Revolutionizing wind farm management through advanced digital twin technology and predictive insights.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all"
                >
                  <social.icon className="w-5 h-5 text-gray-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              Solutions
            </h3>
            <ul className="space-y-3">
              {solutions.map((solution) => (
                <li key={solution}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    {solution}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Get in Touch</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="text-gray-600">
                  <p className="font-medium">123 Innovation Drive</p>
                  <p>Energy Tech Park</p>
                  <p>Copenhagen, Denmark</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a
                  href="tel:+4533221100"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +45 33 22 11 00
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a
                  href="mailto:contact@smartenergy.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  contact@smartenergy.com
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-gray-900 mb-4">Stay Updated</h4>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 Smart Energy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}