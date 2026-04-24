'use client';

import React from 'react';
import Link from "next/link";
import Footer from "./Footer";


export default function TermsPage() {
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

                        <h1>Terms of Service</h1>
                        <h5>Last updated on 29.05.2025</h5>

                        <p>PLEASE READ THE FOLLOWING TERMS OF SERVICE BEFORE USING OUR MOBILE APPLICATION <em>AppBoiler</em> (THE ‘APP’) OR THE
                            WEBSITE <a href="https://example.com">example.com</a> (THE ‘SITE’). BY UTILIZING OUR APP, OR ACCESSING ANY PAGE ON OUR SITE, YOU
                            AGREE TO BE BOUND BY THE CURRENT VERSION OF THESE <a href="/terms-of-service">TERMS OF SERVICE</a> AND <a href="/privacy-policy">PRIVACY
                                POLICY</a>.</p>

                        <h4>1. General</h4>
                        <p>Welcome to the AppBoiler website and App, provided by Todor Ivanov (‘Todor Ivanov’, ‘AppBoiler’, ‘we’, ‘us’, ‘our’). AppBoiler provides a
                            personal finance application that makes money management easy for users who download and install our App (hereinafter the Site and
                            App may be collectively referred to as the ‘Service’).</p>

                        <h4>2. Acceptance of the Terms of Use</h4>
                        <p>We ask that you review and abide by these Terms of Service, our <a href="/privacy-policy">Privacy Policy</a>, and any other terms and
                            conditions that may appear on the Site from time to time. Your use of the Service constitutes your agreement to these Terms of
                            Service, and we reserve the right to revise these Terms of Service at any time without notice. When we make revisions, we will post
                            them on the Site and they will be effective immediately upon posting. You agree to check this section periodically to be aware of
                            any changes. YOUR CONTINUED USE OF THE SERVICE AFTER THE POSTING OF ANY REVISIONS SHALL BE CONSIDERED YOUR AGREEMENT TO THE MODIFIED
                            TERMS. If you do not agree, please do not use the Service.</p>
                        <p>The Service is offered and available to users who are 13 years of age or older. By using the Service, you represent and warrant that
                            you are of legal age to form a binding contract with Todor Ivanov and meet all eligibility requirements. If you do not meet these
                            requirements, you must not access or use the Service.</p>
                        <p>The Service and its Content are intended solely for personal and non-commercial use. Any other use is strictly prohibited.</p>

                        <h4>3. What We Own</h4>
                        <p>Unless otherwise noted, all material and services available on the Site or through the App, and all materials provided by or through
                            the Service—its licensors, contributors, employees, or agents—including but not limited to software; informational text;
                            documentation; ‘look and feel’; layout; photographs; graphics; audio; video; interactive and instant messaging; files; documents;
                            images; and all derivative works thereof (collectively, the ‘Content’) are the intellectual property of Todor Ivanov, AppBoiler, our
                            licensors, and contributors. The Content is protected by copyright, trademark, trade-dress, and other applicable intellectual
                            property laws.</p>

                        <h4>4. Our License to You</h4>
                        <p>Subject to this Agreement, AppBoiler grants you a limited, revocable, non-transferable, non-exclusive license to use the Service via a
                            user ID, only to the extent necessary to access and use our Service in accordance with this Agreement. This license does not permit
                            any commercial use, modification, or reverse engineering of the Service. All rights not expressly granted are reserved by
                            AppBoiler.</p>

                        <h4>5. Use of the Service</h4>
                        <p>We reserve the right to modify, suspend, or discontinue any part of the Service without notice. Access to parts of the Service may be
                            restricted to users, including registered users.</p>
                        <p>To access the Service, you may be required to provide registration information including your name, email, cellphone number, or Apple
                            Pay account. You agree that all information provided is accurate and governed by our <a href="/privacy-policy">Privacy Policy</a>.
                        </p>
                        <p>Premium plan users must pay a subscription or one-time fee. All payments are final and non-refundable.</p>
                        <p>You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us of any unauthorized
                            access.</p>

                        <h4>6. Reliance on Information</h4>
                        <p>All information provided through the Service is for general information purposes only. We disclaim all liability and responsibility
                            arising from any reliance placed on such materials.</p>

                        <h4>7. Content You Provide</h4>
                        <p>You retain ownership of all data and content you submit through the Service. By submitting content, you grant AppBoiler a non-exclusive,
                            royalty-free license to use it solely to operate and improve the Service. You are responsible for having necessary rights and
                            permissions for your submitted content.</p>
                        <p>All data is subject to our <a href="/privacy-policy">Privacy Policy</a>.</p>

                        <h4>8. Geographic Restrictions</h4>
                        <p>AppBoiler is operated from Bulgaria and is not intended for use where prohibited by local law. You are responsible for compliance with
                            your local laws.</p>

                        <h4>9. User-Generated Material</h4>
                        <p>Any content submitted, including feedback, may be used by AppBoiler for any purpose without compensation, provided it does not violate
                            our <a href="/privacy-policy">Privacy Policy</a>.</p>

                        <h4>10. Copyright Notices</h4>
                        <p>If you believe any content infringes your copyright, contact <a href="mailto:support@example.com">support@example.com</a>. We may
                            remove content without notice if we find it infringes intellectual property rights.</p>

                        <h4>11. Accuracy of Information</h4>
                        <p>We do not guarantee that all content is complete, reliable, or up to date. Use the Service at your own risk.</p>

                        <h4>12. Email and Communication</h4>
                        <p>All correspondence with us, including emails sent to @example.com addresses, are our property. For more, see our <a
                            href="/privacy-policy">Privacy Policy</a>.</p>

                        <h4>13. External Links</h4>
                        <p>Links to third-party sites are provided for convenience. We are not responsible for their content or data practices.</p>

                        <h4>14. Security</h4>
                        <p>We implement reasonable security measures, but we cannot guarantee 100% protection against data breaches. By using the Service, you
                            accept these risks.</p>

                        <h4>15. Disclaimer and Limitation of Liability</h4>
                        <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY. WE DISCLAIM ALL WARRANTIES INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
                            FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
                        <p>WE ARE NOT LIABLE FOR DAMAGES OF ANY KIND INCLUDING INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF YOUR USE
                            OR INABILITY TO USE THE SERVICE.</p>
                        <p>OUR LIABILITY WILL NOT EXCEED $100.00.</p>

                        <h4>16. Arbitration</h4>
                        <p>You agree to try to resolve disputes informally by contacting us. If unresolved, disputes will be resolved by binding arbitration
                            through the Bulgarian Chamber of Commerce and Industry in Sofia, Bulgaria.</p>

                        <h4>17. Termination</h4>
                        <p>These Terms remain in effect until terminated by either party. AppBoiler may terminate or suspend access without notice for any reason.
                            Sections on IP, limitations, and governing law survive termination.</p>

                        <h4>18. Entire Agreement</h4>
                        <p>These Terms, including our <a href="/privacy-policy">Privacy Policy</a>, constitute the entire agreement between you and AppBoiler.</p>

                        <h4>19. Severability</h4>
                        <p>If any part of these Terms is held invalid, the remainder shall remain in effect.</p>

                        <h4>20. Changes</h4>
                        <p>We may update these Terms at any time. Continued use after changes means you accept them. Updates to arbitration provisions will not
                            apply retroactively.</p>

                        <h4>21. Contact</h4>
                        <p>For questions or legal concerns, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>

                    </article>

                    <div className="pb-20"/>

                </div>
            </section>

            {/* Footer */}
            <Footer/>

        </div>
    );
}
