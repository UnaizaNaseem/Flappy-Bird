import React from 'react';
import { View } from 'react-native';

const Obstacle = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    gapLocation, 
    gap, 
    obstacleLeft}) => {

    // Create two Views that work as the obstacle's top and bottom

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstacleLeft,
                bottom: gapLocation + obstacleHeight + gap,
            }}></View>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstacleLeft,
                bottom: gapLocation,
            }}></View>
        </>
    )
}

export default Obstacle