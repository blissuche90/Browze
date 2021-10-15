import MarsRover from './MarsRover.js'

function processManager({ plateau, rovers }) {
    const marsRoversData = []
    const marsRoverOutput = []
    rovers.forEach(({name, Landing, Instructions}) => {
        marsRoversData.push(new MarsRover(name, Landing, Instructions, plateau));
    });
    marsRoversData.forEach(rover => {       
        try {
            rover.executeInstructions();
        } catch (error) {
            // If a rover is about to fall over cliff, operation is halted, but doesn't block other rovers from moving
            console.error(error)
        }
        marsRoverOutput.push(rover.location)
    })
    return marsRoverOutput
}

export default processManager