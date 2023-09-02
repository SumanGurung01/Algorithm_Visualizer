import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import generateRandomArray from './GenerateArray';
import doneAudio from './asset/done.mp3'
import gitLink from './asset/github.png'

function Algorithm() {

    const arraySizeOption = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    const algorithmOption = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', "Quick Sort", "Merge Sort"]

    const [arraySize, setArraySize] = useState(arraySizeOption[1]);
    const [algorithm, setAlgorithm] = useState(algorithmOption[0]);
    const [speed, setSpeed] = useState(100)

    const [array, setArray] = useState(generateRandomArray(arraySize))
    const [sorting, setSorting] = useState(false);

    const [sorted, setSorted] = useState(false);


    const [done] = useState(new Audio(doneAudio));


    const handleSizeChange = (event) => {
        setArraySize(event.target.value);
        setArray(generateRandomArray(event.target.value))
        setSorted(false);
    };

    const handleAlgorithmChange = (event) => {
        setAlgorithm(event.target.value);

        if (sorted) {
            setArray(generateRandomArray(arraySize))
            setSorted(false)
        }
    };


    // Algorithm : Bubble Sort
    const bubbleSort = async () => {
        setSorting(true)

        const temporaryArray = [...array];
        const arrayLength = temporaryArray.length;

        for (let i = 0; i < arrayLength - 1; i++) {
            for (let j = 0; j < arrayLength - 1 - i; j++) {
                if (temporaryArray[j] > temporaryArray[j + 1]) {

                    const temp = temporaryArray[j];
                    temporaryArray[j] = temporaryArray[j + 1];
                    temporaryArray[j + 1] = temp;

                    await new Promise((resolve) => setTimeout(resolve, speed));
                    setArray([...temporaryArray]);
                }
            }
        }
        done.play();
        setSorting(false);
        setSorted(true);

    };


    // Algorithm : Insertion Sort
    const insertionSort = async () => {
        setSorting(true);

        const temporaryArray = [...array];
        const arrayLength = temporaryArray.length;

        for (let i = 1; i < arrayLength; i++) {
            const key = temporaryArray[i];
            let j = i - 1;

            while (j >= 0 && temporaryArray[j] > key) {
                temporaryArray[j + 1] = temporaryArray[j];
                j--;

                await new Promise((resolve) => setTimeout(resolve, speed));
                setArray([...temporaryArray]);
            }

            temporaryArray[j + 1] = key;
        }

        done.play()
        setSorting(false);
        setSorted(true);
    };


    // Algorithm : Selection Sort
    const selectionSort = async () => {
        setSorting(true);

        const temporaryArray = [...array];
        const arrayLength = temporaryArray.length;

        for (let i = 0; i < arrayLength - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < arrayLength; j++) {
                if (temporaryArray[j] < temporaryArray[minIndex]) {
                    minIndex = j;
                }
            }

            const temp = temporaryArray[i];
            temporaryArray[i] = temporaryArray[minIndex];
            temporaryArray[minIndex] = temp;

            await new Promise((resolve) => setTimeout(resolve, speed));
            setArray([...temporaryArray]);
        }

        done.play();
        setSorting(false);
        setSorted(true);
    };


    // Algorithm : Quick Sort
    const quickSort = async () => {
        setSorting(true);

        const temporaryArray = [...array];

        const quick = async (temporaryArray, left, right) => {
            if (left >= right) return;

            const pivot = temporaryArray[right];
            let i = left - 1;

            for (let j = left; j <= right - 1; j++) {
                if (temporaryArray[j] < pivot) {
                    i++;
                    const temp = temporaryArray[i];
                    temporaryArray[i] = temporaryArray[j];
                    temporaryArray[j] = temp;

                    // Delay for visualization
                    await new Promise((resolve) => setTimeout(resolve, speed));
                    setArray([...temporaryArray]);
                }
            }

            const temp = temporaryArray[i + 1];
            temporaryArray[i + 1] = temporaryArray[right];
            temporaryArray[right] = temp;

            // Delay for visualization
            await new Promise((resolve) => setTimeout(resolve, speed));
            setArray([...temporaryArray]);

            const pivotIndex = i + 1;

            await quick(temporaryArray, left, pivotIndex - 1);
            await quick(temporaryArray, pivotIndex + 1, right);
        };

        await quick(temporaryArray, 0, temporaryArray.length - 1);

        done.play();
        setSorting(false);
        setSorted(true);
    };


    // Algorithm : Merge Sort
    const mergeSort = async () => {
        setSorting(true);

        const temporaryArray = [...array];

        const merge = async (temporaryArray, left, mid, right) => {
            const n1 = mid - left + 1;
            const n2 = right - mid;

            const leftArray = new Array(n1);
            const rightArray = new Array(n2);

            for (let i = 0; i < n1; i++) {
                leftArray[i] = temporaryArray[left + i];
            }
            for (let j = 0; j < n2; j++) {
                rightArray[j] = temporaryArray[mid + 1 + j];
            }

            let i = 0;
            let j = 0;
            let k = left;

            while (i < n1 && j < n2) {
                if (leftArray[i] <= rightArray[j]) {
                    temporaryArray[k] = leftArray[i];
                    i++;
                } else {
                    temporaryArray[k] = rightArray[j];
                    j++;
                }

                // Delay for visualization
                await new Promise((resolve) => setTimeout(resolve, speed));
                setArray([...temporaryArray]);

                k++;
            }

            while (i < n1) {
                temporaryArray[k] = leftArray[i];
                i++;
                k++;

                // Delay for visualization
                await new Promise((resolve) => setTimeout(resolve, speed));
                setArray([...temporaryArray]);
            }

            while (j < n2) {
                temporaryArray[k] = rightArray[j];
                j++;
                k++;

                // Delay for visualization
                await new Promise((resolve) => setTimeout(resolve, speed));
                setArray([...temporaryArray]);
            }
        };

        const mergeSortRecursive = async (temporaryArray, left, right) => {
            if (left < right) {
                const mid = Math.floor(left + (right - left) / 2);

                await mergeSortRecursive(temporaryArray, left, mid);
                await mergeSortRecursive(temporaryArray, mid + 1, right);

                await merge(temporaryArray, left, mid, right);
            }
        };

        await mergeSortRecursive(temporaryArray, 0, temporaryArray.length - 1);

        done.play();
        setSorting(false);
        setSorted(true);
    };

    return (
        <div>

            <div className="option" >

                <div>
                    <FormControl sx={{ m: 1, minWidth: 160 }} size="small" disabled={sorting}>
                        <InputLabel>Array Size</InputLabel>
                        <Select
                            value={arraySize}
                            label="Array Size"
                            onChange={handleSizeChange}
                        >
                            {
                                arraySizeOption.map(size => <MenuItem value={size}>{size}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </div>


                <div>
                    <FormControl sx={{ m: 1, minWidth: 160 }} size="small" disabled={sorting}>
                        <InputLabel>Algorithm</InputLabel>
                        <Select
                            value={algorithm}
                            label="Algorithm"
                            onChange={handleAlgorithmChange}
                        >
                            {
                                algorithmOption.map(algo => <MenuItem value={algo}>{algo}</MenuItem>)
                            }

                        </Select>
                    </FormControl>
                </div>


                <div>
                    <FormControl sx={{ m: 1, minWidth: 160 }} size="small" disabled={sorting}>
                        <InputLabel>Sorting Speed</InputLabel>
                        <Select
                            value={speed}
                            label="Sorting Speed"
                            onChange={(e) => {
                                setSpeed(e.target.value)
                            }}
                        >
                            <MenuItem value={200}>0.5 x</MenuItem>
                            <MenuItem value={100}>1.0 x</MenuItem>
                            <MenuItem value={75}>1.5 x</MenuItem>
                            <MenuItem value={50}>2.0 x</MenuItem>
                            <MenuItem value={25}>2.5 x</MenuItem>
                            <MenuItem value={10}>3.0 x</MenuItem>
                        </Select>
                    </FormControl>
                </div>



                <div>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (algorithm === 'Bubble Sort')
                                bubbleSort()
                            if (algorithm === 'Selection Sort')
                                selectionSort()
                            if (algorithm === 'Insertion Sort')
                                insertionSort()
                            if (algorithm === 'Quick Sort')
                                quickSort()
                            if (algorithm === 'Merge Sort')
                                mergeSort()
                        }}
                        disabled={sorted || sorting}
                        style={{ width: '160px', height: '40px', padding: '3px' }}
                    >
                        Sort it
                    </Button>
                </div>

            </div>


            <div className="array">
                {array.map((value, idx) => (
                    <div
                        className={sorted ? "green array-bar" : "array-bar"}
                        key={idx}
                        style={{ height: `${value * 10}px` }}
                    ></div>
                ))}
            </div>

            <div className="socials" style={{ padding: '0px 0px 10px 0px' }}>
                <a href="https://github.com/SumanGurung01/Algorithm_Visualizer.git">
                    <img src={gitLink} style={{ width: '30px', marginbottom: '-100px' }} ></img>
                </a>
            </div>
        </div>
    )

}


export default Algorithm
