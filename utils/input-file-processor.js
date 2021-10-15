import { createReadStream } from 'fs';
import { createInterface } from 'readline';

import SchemaValidator from '../validators/schema-validator.js';

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const roversSchema = require("../validators/input-schema.json") // use the require method

export default async function inputFileToJson(fileLocation) {
	const configuration = {
		plateau: [],
		rovers: []
	};
	let roversData = {};
	const fileStream = createReadStream(fileLocation);
	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity
	});
	for await (const line of rl) {
		const data = line.split(':');
		if (data[0].toLowerCase() === 'plateau') {
			configuration.plateau = data[1].split(' ');
		} else {
			const [roverName, roverKey] = data[0].split(' ');
			if (!roverName || !roverKey) {
				throw Error('Must be correctly formatted <RoverName> <Landing | Instructions>:[data]');
			}
			let roverKeyData;

			if (roverKey.toLowerCase() === 'landing') {
                roverKeyData = data[1].split(' ');
                if (roverKeyData.length !== 3) {
                    throw new Error('Landing data must have 3 fields: X Y D[N/S/E/W]')
                }
			} else if (roverKey.toLowerCase() === 'instructions') {
                roverKeyData = data[1].split('');
			}

			roversData = {
				...roversData,
				[roverName]: {
					...roversData[roverName],
					[roverKey]: roverKeyData
				}
			};
		}
	}
    configuration.rovers = transformRoversDataToArray(roversData);
    
    const validateSchema = new SchemaValidator()
    validateSchema.validate(configuration, roversSchema)
	return configuration;
};

function transformRoversDataToArray(roversData) {
	let data = [];
	for (let obj of Object.entries(roversData)) {
		data.push({
			name: obj[0],
			...obj[1]
		});
	}

	return data;
}
