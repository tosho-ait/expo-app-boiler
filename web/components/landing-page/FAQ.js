import {FAQAccordion} from "./FAQAccordion";

export default function FAQ() {
    return (
        <section id="faq" className="relative py-28 bg-white text-black overflow-hidden">
            <div className="container mx-auto px-10 xl:px-20">

                <div className="mb-20 text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">FAQ</p>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold">Got more questions? We got you!</h2>
                </div>

                <FAQAccordion/>

            </div>
        </section>
    );
}
