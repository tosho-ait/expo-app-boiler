import React from 'react';
import {View} from 'react-native';

function FlexPanelBig({children}) {

    return <View className="flex gap-5 px-3">
        {children}
    </View>;
}

export default FlexPanelBig;
