import MarsRover from './MarsRover.js'

function processManager({ plateau, rovers }) {
    const marsRoversData = []
    const marsRoverOutput = []
    const marsRoverLoc = []
    rovers.forEach(({name, Landing, Instructions}) => {
        marsRoversData.push(new MarsRover(name, Landing, Instructions, plateau));
    });
    marsRoversData.forEach(rover => {       
        try {
            if(!marsRoverLoc.includes(rover.marsRoverLoc)){
                rover.executeInstructions(); 
                marsRoverOutput.push(rover.location)
                marsRoverLoc.push(rover.marsRoverLoc)
            }                 
        } catch (error) {
            // If a rover is about to fall over cliff, operation is halted, but doesn't block other rovers from moving
            console.error(error)
        }
    })
    return marsRoverOutput
}

export default processManager