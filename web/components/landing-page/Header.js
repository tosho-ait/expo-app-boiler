import Link from "next/link";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg">
            <div className="container mx-auto px-10 xl:px-20 flex items-center justify-between py-4">

                <Link href="#hero" className="text-3xl font-bold tracking-tight">
                    App<span className="text-sky-600">Boiler</span>
                </Link>

                <nav className="hidden md:flex gap-8 text-md font-medium absolute left-1/2 -translate-x-1/2">
                    <Link href="#features" className="hover:text-sky-600 transition">Features</Link>
                    <Link href="#pricing" className="hover:text-sky-600 transition">Pricing</Link>
                    <Link href="#faq" className="hover:text-sky-600 transition">FAQ</Link>
                </nav>

            </div>
        </header>
    );
}
