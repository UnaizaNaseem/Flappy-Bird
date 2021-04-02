import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird'
import Obstacle from './components/Obstacle'

export default function App() {

  // Get screen dimensions
  const screenWidth = Dimensions.get("window").width
  const screenHeight = Dimensions.get("window").height

  // Get bird location
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom]= useState(screenHeight / 2)

  // Get obstacle locations
  const [obstacleALeft, setObstacleALeft]= useState(screenWidth)
  const [obstacleBLeft, setObstacleBLeft]= useState(screenWidth + screenWidth/2 + 30)

  const [obstacleAGapStart, setObstacleAGapStart]= useState(0)
  const [obstacleBGapStart, setObstacleBGapStart]= useState(0)

  // Set states for game over + score
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)

  // Set gravity + game speed
  const gravity = 5
  let gameSpeed = 8

  // Set obstacle properties
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 300

  // Declare these variables
  let gameTimerId
  let obstacleATimerId
  let obstacleBTimerId
  
// Put gravity in effect
  useEffect(() => {
    if (birdBottom > 0) {
      // Every 30 milliseconds, the bird falls down by gravity pixels
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - 3)
      }, 30)
  
      return () => {
      // Clear the interval to make sure that you don't save 
        clearInterval(gameTimerId)
      }
    }
    
    // With birdBottom as a dependency, useEffect will only happen when birdBottom has changed
  }, [birdBottom])

  const jump = () => {
    // if the game isn't over
    // and the bird is still on the screen
    // make the bird "jump"
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom(birdBottom => birdBottom + 20)
      console.log('Jump triggered')
    }
  }

  // Set up first obstacle A
  useEffect(() => {
    if (!isGameOver) {
      // If the obstacle is off the screen
      if (obstacleALeft > -obstacleWidth) {
        // set Interval to refresh every 30 milliseconds to move obstacles left
        // How do you set this up? Look at the bird + gravity for reference
        obstacleATimerId = setInterval(() => {
          setObstacleALeft(obstacleALeft => obstacleALeft - gameSpeed)
        }, 30)
        return () => {
          clearInterval(obstacleATimerId)
        }
      } else {
        // otherwise, prepare for the next obstacle
        setScore(score => score + 1)
        setObstacleALeft(screenWidth)
        setObstacleAGapStart(-Math.random() * 150)
      }
    }
  }, [obstacleALeft])

  // Set up second obstacle B, similar to A, except use the B variables
  useEffect(() => {
    // If the obstacle is off the screen
    if (obstacleBLeft > -obstacleWidth) {
      obstacleBTimerId = setInterval(() => {
        setObstacleBLeft(obstacleBLeft => obstacleBLeft - gameSpeed)
      }, 30)
      return () => {
        clearInterval(obstacleBTimerId)
      }
    } else {
      // otherwise, prepare for the next obstacle
      setScore(score => score + 1)
      setObstacleBLeft(screenWidth)
      setObstacleBGapStart(-Math.random() * 150)
    }
  }, [obstacleBLeft])

  // Check for collisions
  useEffect(() => {

    // Think of colliding as checking to see if 1) the pipe is in the center and 2) the bird is in either the top or bottom of the screen

    // What does it mean for the Obstacle to be at the center? Account for the whole width of the pipe
    const obstacleAAtCenter = obstacleALeft > screenWidth/2 - obstacleWidth/2 && obstacleALeft < screenWidth/2 + obstacleWidth/2

    // What about whether or not the "bird" is on the top or bottom pipe?
    const birdRunIntoTopA = birdBottom < (obstacleAGapStart + obstacleHeight + obstacleWidth/2)
    
    const birdRunIntoBottomA = birdBottom > (obstacleAGapStart + obstacleHeight + gap - obstacleWidth/2)

    const collisionA = (birdRunIntoTopA || birdRunIntoBottomA) && obstacleAAtCenter

    const obstacleBAtCenter = obstacleBLeft > screenWidth/2 - obstacleWidth/2 && obstacleBLeft < screenWidth/2 + obstacleWidth/2

    // What about whether or not the "bird" is on the top or bottom pipe?
    const birdRunIntoTopB = birdBottom < (obstacleBGapStart + obstacleHeight + obstacleWidth/2)
    
    const birdRunIntoBottomB = birdBottom > (obstacleBGapStart + obstacleHeight + gap - obstacleWidth/2)

    const collisionB = (birdRunIntoTopB || birdRunIntoBottomB) && obstacleBAtCenter

    if (collisionA || collisionB) {
      console.log("Game Over - Score of " + score)
      gameOver();
    }
  })

  const gameOver = () => {
    // clear all the TimerIds and make it so IsGameOver is true
    clearInterval(gameTimerId)
    clearInterval(obstacleATimerId)
    clearInterval(obstacleBTimerId)
    setIsGameOver(true)
  }
  
  return (
    <TouchableWithoutFeedback onPress={jump}>
      {/* <ImageBackground style={styles.container} source={require('./assets/blahaj_background.png')}> */}
      <View style={styles.container}>
        <Bird 
          birdBottom = {birdBottom} 
          birdLeft = {birdLeft}
        />
        <Obstacle 
          color='white'
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          gapLocation = {obstacleAGapStart}
          gap = {gap}
          obstacleLeft = {obstacleALeft}
        />
        <Obstacle 
          color='red'
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          gapLocation = {obstacleBGapStart}
          gap = {gap}
          obstacleLeft = {obstacleBLeft}
        />
      </View>
      {/* </ImageBackground> */}
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  // overflow: hidden is for web version
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    overflow: 'hidden',
  },
})
