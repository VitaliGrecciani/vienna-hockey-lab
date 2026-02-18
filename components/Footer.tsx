import React from 'react';

interface FooterProps {
  onShowLegal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowLegal }) => {
  return (
    <footer className="w-full bg-white/5 backdrop-blur-xl border-t border-white/5 pt-16 pb-8 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

        {/* Лого и описание */}
        <div className="max-w-xs text-center md:text-left">
          <h2 className="text-2xl font-black italic text-white leading-none uppercase">
            VIENNA <span className="text-red-600 italic">HOCKEY</span> LAB
          </h2>
          <p className="text-gray-500 text-sm mt-4 leading-relaxed font-medium">
            Professional development for elite athletes. Building the future of hockey.
          </p>
        </div>

        {/* Соцсети с иконками */}
        <div className="flex flex-col items-center md:items-start gap-4 mx-auto md:mx-0">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Follow Us</span>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/vienna_hockey_lab?igsh=MW9sZWJwNDV2YWJuZg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-lab-red transition-all transform hover:scale-110">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="https://www.tiktok.com/@vienna.hockey.lab0?_r=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.23 1.03.13 2.23.97 2.85.81.62 1.93.79 2.92.54.75-.18 1.41-.67 1.75-1.35.17-.38.21-.8.21-1.21V.02z" /></svg>
            </a>
            <a href="https://wa.me/message/UB7IYW3IYHM3J1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-all transform hover:scale-110">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </div>
        </div>

        {/* Контакты */}
        <div className="flex flex-col gap-2 items-center md:items-end text-center md:text-right">
          <div className="flex items-center gap-2 text-red-600 font-bold uppercase text-sm">
            <a href="https://www.google.com/maps/search/?api=1&query=EisRing%20Süd%2C%20Windtenstraße%202%2C%201100%20Wien%2C%20Austria" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors relative z-50">
              EisRing Süd, Vienna
            </a>
          </div>
          <a href="mailto:office@viennahockeylab.com" className="text-gray-400 hover:text-white transition-colors font-medium">
            office@viennahockeylab.com
          </a>
          <p className="text-[10px] text-gray-500 max-w-[200px] leading-tight mt-4 italic">
            We are currently moving to a new office! For all inquiries, please reach us via email. Training continues at EisRing Süd.
          </p>
        </div>
      </div>

      {/* Нижняя плашка */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-950 flex flex-col items-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold text-center">
        <p>
          © 2026 Vienna Hockey Lab <span className="mx-2 text-gray-800">|</span> ZVR: 1999424312 <span className="mx-2 text-gray-800">|</span>
          <button onClick={onShowLegal} className="hover:text-white transition-colors ml-2">Legal Notice & Privacy</button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
