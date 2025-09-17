import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, Music2, Ghost } from "lucide-react"; 

const socialLinks = [
  { href: "https://facebook.com/a4hbangladesh", icon: Facebook },
  { href: "https://instagram.com/a4hbangladesh", icon: Instagram },
  { href: "https://x.com/a4hbangladesh", icon: Twitter },
  { href: "https://tiktok.com/@a4hbangladesh", icon: Music2 },
  { href: "https://snapchat.com/@a4hbangladesh", icon: Ghost },
  { href: "https://youtube.com/@a4hbangladesh", icon: Youtube },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 px-4 py-8 tracking-wide">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 max-w-sm">
            {/* Logo */}
            <Link href="/" className="block text-teal-600 pb-4">
              <Image
                src="/logo/dark-logo.png"
                alt="Logo"
                width={100}
                height={30}
                className="w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Aid For Humanity is a non-political, non-profit charitable organization which started its journey from Coxs Bazar, Bangladesh registered with the NGO Bureau and the Department of Social Services of the People's Republic of Bangladesh. 
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-6 text-white">Our Projects</h4>
            <ul className="space-y-4">
              <li><Link href="/initiative/6" className="text-gray-400 hover:text-white text-sm">Water and Sanitation Project</Link></li>
              <li><Link href="/projects/1" className="text-gray-400 hover:text-white text-sm">Mosque Project</Link></li>
              <li><Link href="/initiative/5" className="text-gray-400 hover:text-white text-sm">Orphan Sponsoring</Link></li>
              <li><Link href="/projects/19" className="text-gray-400 hover:text-white text-sm">Winter Care</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium mb-6 text-white">Contact Us</h4>
            <p className="text-gray-400 text-sm">Road 2/B, Sector #4, Uttara</p>
            <p className="text-gray-400 text-sm">Dhaka, Bangladesh</p>
            <p className="text-gray-400 text-sm">chairman@a4hbd.org</p>
            <p className="text-gray-400 text-sm">+8801711709870</p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side copyright */}
          <p className="text-gray-400 text-sm">
            © 2025. All rights reserved.
          </p>

          {/* Right side social icons */}
          <div className="flex gap-3">
            {socialLinks.map(({ href, icon: Icon }, idx) => (
              <Link
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow hover:scale-110 transition"
              >
                <Icon size={18} className="text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
