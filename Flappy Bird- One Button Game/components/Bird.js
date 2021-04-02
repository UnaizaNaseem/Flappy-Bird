import React from 'react';
import { View, ImageBackground } from 'react-native';

const Bird = ({birdBottom, birdLeft}) => {

    // Set height + width for your bird
    const birdWidth = 50*1.75
    const birdHeight = 50
    const birdColor = '#CD5588'

    // Make a square for your "bird"
    return (
        <ImageBackground source={require('../assets/ryan_riding_blahaj.png')} style={{
            // backgroundColor: birdColor,
            width: birdWidth,
            height: birdHeight,
            position: 'absolute',
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }}></ImageBackground>
    )
}

export default Bird