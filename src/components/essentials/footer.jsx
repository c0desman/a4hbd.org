import Link from "next/link";
import Image from "next/image";

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
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Water and Sentiation Project</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Mosque Project</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Orphan Sponsorig</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Winter Care</a></li>
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

        <div className="mt-16">
          <p className="text-gray-400 text-sm">© 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;