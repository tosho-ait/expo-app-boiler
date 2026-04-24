import React from 'react';
import {View} from 'react-native';

function FlexPage({children}) {

    return <View className="flex gap-4 pt-4 pb-40">
        {children}
    </View>;
}

export default FlexPage;
