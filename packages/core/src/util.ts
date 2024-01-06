import fs from "fs";
import path from "path";

export function modifyPathIfExists(outputPath: string, extension?: string): string {

    let actualOutputPath = outputPath;

    if (!extension)
        extension = "";

    const outputPathExists = fs.existsSync(outputPath);
    if (outputPathExists) {

        const directoryPath = path.dirname(outputPath);

        // "fileName.encypted", "fileName-copy-1.encrypted"
        // => "fileName", "fileName-copy-1"
        const fileName = path.basename(outputPath, extension)

        // "fileName", "fileName-copy-1"
        // => ["fileName"], ["fileName", "copy", "1"]
        const hyphenSplitArray = fileName.split("-");

        const hasIndex = hyphenSplitArray.length >= 3 && hyphenSplitArray[hyphenSplitArray.length - 2] === "copy" && !Number.isNaN(parseInt(hyphenSplitArray[hyphenSplitArray.length - 1] as string));

        // ["fileName", "copy","1"]
        if (hasIndex) {
            // ["fileName", "copy"] => popped "1"
            const index = parseInt(hyphenSplitArray.pop() as string);
            const newIndex = index + 1;

            // ["fileName", "copy", "2]
            hyphenSplitArray.push(newIndex.toString());
        }

        // ["fileName"]
        else {

            let targetIndex = 1;

            while (true) {

                // Temporarily modify the array
                hyphenSplitArray.push("copy")
                hyphenSplitArray.push(targetIndex.toString());

                const targetFileName = hyphenSplitArray.join("-") + extension;
                const targetOutputPath = path.join(directoryPath, targetFileName);

                // Return array to original state
                hyphenSplitArray.pop();
                hyphenSplitArray.pop();

                if (!fs.existsSync(targetOutputPath))
                    break;

                targetIndex++;
            }

            // ["fileName", "1"] or ["fileName", "2"] ...
            hyphenSplitArray.push("copy")
            hyphenSplitArray.push(targetIndex.toString());
        }

        const newFileName = hyphenSplitArray.join("-") + extension;
        actualOutputPath = path.join(directoryPath, newFileName);
    }

    return actualOutputPath;
}