function generateRandomArray(size) {
    const randomArray = [];
    const minValue = 1; // Minimum value for random numbers
    const maxValue = 50; // Maximum value for random numbers
    for (let i = 0; i < size; i++) {
        // Generate a random number within the specified range
        const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        randomArray.push(randomNumber);
    }
    return randomArray;
}

export default generateRandomArray
