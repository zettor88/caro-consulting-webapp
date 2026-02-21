const fs = require('fs');
let content = fs.readFileSync('app/formularios/diagnostico/page.tsx', 'utf8');

// Theming replacements
content = content.replace(/bg-\[\#101022\]/g, 'bg-slate-50');
content = content.replace(/bg-\[\#1a1a32\]/g, 'bg-white');
content = content.replace(/bg-\[\#252542\]/g, 'bg-blue-50');
content = content.replace(/bg-\[\#15152a\]/g, 'bg-white');
content = content.replace(/text-white/g, 'text-slate-900');
content = content.replace(/text-slate-400/g, 'text-slate-600');
content = content.replace(/border-white\/[0-9]+/g, 'border-slate-200');
content = content.replace(/bg-white\/5/g, 'bg-white');
content = content.replace(/hover:bg-white\/5/g, 'hover:bg-slate-100');
content = content.replace(/hover:text-white/g, 'hover:text-slate-900');
content = content.replace(/glass-nav/g, 'bg-white/80 backdrop-blur-md');
content = content.replace(/bg-hero-glow/g, '');
content = content.replace(/text-slate-300/g, 'text-slate-700');
content = content.replace(/border-slate-700/g, 'border-slate-200');
content = content.replace(/bg-slate-800/g, 'bg-white');

// Likert specific
content = content.replace(/bg-white text-slate-600 hover:bg-blue-50 hover:text-slate-900 border border-slate-200/g, 'bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-700 border border-slate-200');
content = content.replace(/text-slate-900 scale-110 shadow-xl shadow-primary\/30 border-2 border-slate-200/g, 'text-white scale-110 shadow-xl shadow-primary/30 border-2 border-primary');

// Exit links
content = content.replace(/router\.push\('\/dashboard'\)/g, "router.push('/')");
content = content.replace(/router\.push\('\/login'\)/g, "router.push('/')");

// Quick fix for primary button text color that got replaced to text-slate-900
content = content.replace(/className="bg-primary hover:bg-primary\/90 text-slate-900/g, 'className="bg-primary hover:bg-primary/90 text-white');
content = content.replace(/text-slate-900 px-8 py-3\.5/g, 'text-white px-8 py-3.5');

content = content.replace(/<span className="text-primary font-black mr-2">/g, '<span className="text-primary font-black mr-2">');

fs.writeFileSync('app/formularios/diagnostico/page.tsx', content);
console.log("File updated");
