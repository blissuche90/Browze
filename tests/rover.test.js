import MarsRover  from '../utils/MarsRover'

describe('Mars Rover', () => {
  describe('errors when', () => {
    test('currentPosition is off the grid', () => {
      expect(() => {
        new MarsRover("Rover1", [ '6', '4', 'N' ], ['L', 'M', 'L'] , ['5', '5']).executeInstructions();
      }).toThrow('currentPosition x: 6 is off the grid!')
    })

    test('no instructions provided', () => {
      const marsRover = new MarsRover("Rover1", [ '2', '2', 'N' ], [] , ['5', '5']);
      expect(() => marsRover.executeInstructions()).toThrow('No instructions provided')
    })

    test('given an invalid instruction', () => {
      const marsRover = new MarsRover("Rover1", [ '2', '2', 'N' ], ['N'] , ['5', '5']);
      marsRover.executeInstructions();
      //doesnt move
      expect(marsRover.location).toEqual("Rover1: 2 2 N")
    })
    /*
    test('given an instruction that moves the rover off the grid', () => {
      const marsRover = new MarsRover("Rover1", [ '5', '5', 'N' ], [] , ['5', '5']);
      expect(() => marsRover.moveForward()).toThrow('Abort Max point reached! Rover1 will fall off the Plateau')
    })*/
    test('given an instruction that moves the rover off the grid', () => {
      const marsRover = new MarsRover("Rover1", [ '5', '5', 'N' ], ['M'] , ['5', '5']);
      marsRover.executeInstructions();
      expect(marsRover.location).toEqual("Rover1: 5 5 N")
    })
    test('given an instruction that moves the rover off the grid and another added instruction', () => {
      const marsRover = new MarsRover("Rover1", [ '5', '5', 'N' ], ['M','L'] , ['5', '5']);
      marsRover.executeInstructions();
      expect(marsRover.location).toEqual("Rover1: 5 5 W")
    })
  })

  describe('when instructions are provided', () => {
    test('outputs the correct position from test data 1', () => {
      const marsRover = new MarsRover("Rover1", [ '1', '2', 'N' ], ['L', 'M', 'L','M', 'L', 'M','L', 'M', 'M'] , ['5', '5']);
      marsRover.executeInstructions();
      expect(marsRover.location).toEqual("Rover1: 1 3 N")
    })

    test('outputs the correct position from test data 2', () => {
      const marsRover = new MarsRover("Rover2", [ '3', '3', 'E' ], ['M','M','R','M','M','R','M','R','R','M'] , ['5', '5']);
      marsRover.executeInstructions();
      expect(marsRover.location).toEqual("Rover2: 5 1 E")
    })
  })
})
