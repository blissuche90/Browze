import validateFileType from './validators/validateFileType.js';
import inputFileToJson from './utils/input-file-processor.js';
import roverManager from './utils/processManager.js';

const main = async () => {
	if (process.argv.length < 2) {
		console.error('Usage: node index.js <text file path>');
	}
	const [node, script, fileLocation] = process.argv;
	validateFileType(fileLocation);
	const roverConfiguration = await inputFileToJson(fileLocation)
	console.log("RoverConfig==========>",roverConfiguration);
	const finalRoverLocationData = roverManager(roverConfiguration)
	finalRoverLocationData.forEach(locationData => console.log(locationData))
};

main();
