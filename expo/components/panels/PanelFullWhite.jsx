import React from 'react';
import {View} from 'react-native';


const PanelFullWhite = ({children}) => {

    return <View className="bg-white p-3">
        {children}
    </View>;

};

export default PanelFullWhite;
