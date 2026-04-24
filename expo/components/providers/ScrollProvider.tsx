// ScrollContext.tsx
import React, {createContext, RefObject, useContext} from 'react';
import {ScrollView} from 'react-native';

type ScrollContextType = {
    scrollRef: RefObject<ScrollView> | null;
};

const ScrollContext = createContext<ScrollContextType>({scrollRef: null});

export const useScrollRef = () => useContext(ScrollContext);

export const ScrollProvider = ({children, scrollRef,}: {
    children: React.ReactNode;
    scrollRef: RefObject<ScrollView>;
}) => (
    <ScrollContext.Provider value={{scrollRef}}>
        {children}
    </ScrollContext.Provider>
);
