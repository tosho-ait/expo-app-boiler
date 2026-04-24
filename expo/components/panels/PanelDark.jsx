import React from 'react';
import {View} from 'react-native';

const PanelDark = ({children}) => {

    return <View className="bg-zinc-200 p-3 rounded-md">
        <View className="flex gap-3 py-1">
            {children}
        </View>
    </View>;

};

export default PanelDark;
