import validateFileType  from '../validators/validateFileType.js'

test('Should file when not given a .txt file', () => {
    expect(() => validateFileType('./data/file.png')).toThrow(Error('Not a valid file type'))
})

test('Should continue execution when given a text file', () => {
    validateFileType('./data/instructions.txt')
    expect(true).toBe(true)
})