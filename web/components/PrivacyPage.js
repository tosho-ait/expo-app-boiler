'use client';

import React from 'react';
import Link from "next/link";
import Footer from "./Footer";


export default function PrivacyPage() {
    return (
        <div className="font-sans text-gray-800">

            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg">
                <div className="container mx-auto px-10 xl:px-20 flex items-center justify-between py-4">
                    <Link href="/#hero" className="text-3xl font-bold tracking-tight">
                        App<span className="text-sky-600">Boiler</span>
                    </Link>
                </div>
            </header>

            <section id="terms" className="flex items-center pt-44 bg-gray-100 ">
                <div className="container mx-auto px-10 xl:px-20">

                    <article className="prose lg:prose-xl">

                        <h1>Privacy Policy</h1>

                        <h5>Last updated on 29.04.2025</h5>

                        <p>Todor Ivanov ("we", "us", "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                            your information when you use our mobile application <em>AppBoiler</em> (the “App”) or visit our website <a
                                href="https://example.com">example.com</a> (collectively, the “Site”).</p>

                        <p>By using the App or Site, you agree to the practices described in this Privacy Policy. If you do not agree with the terms, please do
                            not use the App or Site.</p>

                        <h4>1. Information We Collect</h4>
                        <p>We collect personal and usage information necessary to provide core functionalities:</p>
                        <ul>
                            <li><strong>Name and Email Address:</strong> Collected when you register an account to enable online backup, login, and support
                                communication.
                            </li>
                            <li><strong>User-Added Data:</strong> All financial data you enter in the App (e.g., expenses, categories, budgets) is stored to
                                provide synchronization and online backup.
                            </li>
                            <li><strong>Device Information:</strong> We may collect anonymized device information such as model, OS version, and crash logs to
                                improve app performance and stability.
                            </li>
                        </ul>

                        <h4>2. How We Use Your Information</h4>
                        <p>We use your information for the following purposes:</p>
                        <ul>
                            <li>To provide and maintain your account and online backups.</li>
                            <li>To deliver core features of the App and improve user experience.</li>
                            <li>To respond to support requests and fix bugs or technical issues.</li>
                            <li>To comply with legal obligations, if required.</li>
                        </ul>

                        <h4>3. Data Retention</h4>
                        <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. If
                            you delete your account, all associated data will be permanently deleted from our servers.</p>

                        <h4>4. Data Security</h4>
                        <p>We take the protection of your data seriously. Your information is stored on secure servers with encryption and access control. While
                            we follow industry-standard practices, no method of transmission or storage is 100% secure, and we cannot guarantee absolute
                            security.</p>

                        <h4>5. Data Sharing and Disclosure</h4>
                        <p>We do <strong>not</strong> sell, rent, trade, or share your personal information with third parties. Your data is stored only for the
                            purpose of providing backup and synchronization features. We do not use it for analytics, advertising, or any other secondary
                            purposes.</p>

                        <h4>6. User Rights</h4>
                        <p>You have the following rights regarding your data:</p>
                        <ul>
                            <li><strong>Access:</strong> Request a copy of your stored data.</li>
                            <li><strong>Correction:</strong> Request changes to incorrect or incomplete data.</li>
                            <li><strong>Deletion:</strong> Delete your account and all associated data at any time.</li>
                            <li><strong>Withdraw Consent:</strong> Opt-out of data collection by discontinuing use of the online backup feature.</li>
                        </ul>
                        <p>To exercise these rights, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>

                        <h4>7. International Data Transfers</h4>
                        <p>Our servers may be located outside of your country. By using the App, you consent to your information being transferred to and stored
                            in jurisdictions that may not offer the same level of data protection as your own.</p>

                        <h4>8. Third-Party Links</h4>
                        <p>Our Site may contain links to third-party websites or services. These have their own privacy policies, and we are not responsible for
                            their content or practices.</p>

                        <h4>9. California Online Privacy Protection Act (CalOPPA)</h4>
                        <ul>
                            <li>Users can visit our Site anonymously.</li>
                            <li>This Privacy Policy is clearly linked on our homepage and contains the word "Privacy."</li>
                            <li>Any changes to this policy will be posted on this page with an updated date.</li>
                        </ul>

                        <h4>10. Do Not Track Signals</h4>
                        <p>We honor Do Not Track (DNT) browser signals. We do not use cookies or trackers for behavioral advertising or analytics.</p>

                        <h4>11. Children’s Privacy (COPPA)</h4>
                        <p>Our App is not intended for use by children under 13. We do not knowingly collect or store personal data from children under this
                            age. If we learn that such data has been collected, we will delete it immediately.</p>

                        <h4>12. Changes to This Privacy Policy</h4>
                        <p>We reserve the right to amend this Privacy Policy at any time. Any changes will be posted here, and we may notify you via the App or
                            email if appropriate.</p>

                        <h4>13. Contact Us</h4>
                        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                        <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
                        <p>Website: <a href="https://example.com">https://example.com</a></p>

                    </article>

                    <div className="pb-20"/>

                </div>
            </section>

            {/* Footer */}
            <Footer/>

        </div>
    );
}
