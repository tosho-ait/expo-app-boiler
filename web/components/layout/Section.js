'use client';

import React from 'react';
import {cn} from "../../util/cnUtil";


export default function Section({children, sectionClasses, containerClasses, noPadding}) {


    let sc = cn("w-full px-6 md:px-16 py-16", sectionClasses);
    let cc = cn("max-w-screen-lg mx-auto px-4", containerClasses);

    if (noPadding) {
        sc = cn("w-full", sectionClasses);
        cc = cn("max-w-screen-lg mx-auto", containerClasses);
    }

    return (
        <section className={sc}>
            <div className={cc}>
                {children}
            </div>
        </section>
    );
}
