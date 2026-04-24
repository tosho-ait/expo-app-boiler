"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageSquarePlus, Send } from "lucide-react";

export default function FeedbackModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, email }),
            });

            if (res.ok) {
                setIsSuccess(true);
                setText("");
                setEmail("");
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSuccess(false);
                }, 2000);
            } else {
                console.error("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white text-slate-800 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 font-semibold group"
            >
                <MessageSquarePlus className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
                <span>Feedback</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden border border-slate-100"
                        >
                            {isSuccess ? (
                                <div className="p-8 text-center bg-sky-50">
                                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-sky-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Thank You!</h3>
                                    <p className="text-slate-600">Your feedback helps us improve AppBoiler.</p>
                                </div>
                            ) : (
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-bold text-slate-800">Send Feedback</h3>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="feedback-text" className="block text-sm font-medium text-slate-700 mb-1">
                                                What's on your mind? <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="feedback-text"
                                                required
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                placeholder="I have a suggestion..."
                                                rows={4}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none text-slate-800 placeholder:text-slate-400"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="feedback-email" className="block text-sm font-medium text-slate-700 mb-1">
                                                Email <span className="text-slate-400 font-normal">(optional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="feedback-email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-800 placeholder:text-slate-400"
                                            />
                                        </div>

                                        <div className="pt-2 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                className="flex-1 px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !text.trim()}
                                                className="flex-1 px-4 py-2 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? "Sending..." : "Send Feedback"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
