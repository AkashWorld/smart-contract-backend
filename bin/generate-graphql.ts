import fs from 'fs';
const INPUT_DIR = './src/graphql/schema/';
const OUTPUT_FILE = './src/graphql/schema/index.ts';

function concatFiles(err: NodeJS.ErrnoException | null, files: String[]) {
	if (err != null) {
		console.error(err.message);
		return;
	}
	let finalSchema = 'export const typeDefs = `\n';
	files
		.filter(function(file) {
			return file.toString().endsWith('.graphql');
		})
		.forEach(function(file) {
			const fileContent = fs.readFileSync(INPUT_DIR + file.toString());
			finalSchema += fileContent + '\n';
		});
	finalSchema += '`\n';
	fs.writeFile(OUTPUT_FILE, finalSchema, { flag: 'w' }, function() {});
}

fs.readdir(INPUT_DIR, concatFiles);
