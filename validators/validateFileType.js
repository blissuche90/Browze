
export default function (fileName) {
    //accepted file extensions, you can add more arrays
    var extensions = ['txt']
    // A simple file extension checker. Doesn't validate the actual file is a text file
    const ext = extensions.includes(fileName.split('.').pop())

    if (!ext) {
        throw new Error('Not a valid file type')
    }
}
