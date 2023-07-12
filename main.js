const n = 100; 
const array = []; 

init(); 

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random(); 
    }
    showBars(); 
}

function playBubble() {
    document.getElementById("initButton").disabled = true; 
    document.getElementById("mergeButton").disabled = true; 
    document.getElementById("quickButton").disabled = true; 
    document.getElementById("bubbleButton").disabled = true; 
    const copy = [...array]; 
    const moves = bubbleSort(copy); 
    animate(moves); 
}

function playMerge() {
    document.getElementById("initButton").disabled = true; 
    document.getElementById("mergeButton").disabled = true; 
    document.getElementById("quickButton").disabled = true; 
    document.getElementById("bubbleButton").disabled = true; 
    const copy = [...array]; 
    const moves = mergeSort(copy); 
    animate(moves); 
}

function playQuick() {
    document.getElementById("initButton").disabled = true; 
    document.getElementById("mergeButton").disabled = true; 
    document.getElementById("quickButton").disabled = true; 
    document.getElementById("bubbleButton").disabled = true; 
    const copy = [...array]; 
    const moves = []; 
    quickSort(copy, 0, array.length - 1, moves); 
    animate(moves); 
}

function animate(moves) {
    if (moves.length == 0) {
        showBars(); 
        checkSort(0); 
        return;
    }
    const move = moves.shift(0); 
    const i = move.indices[0]; 
    const j = move.indices[1]; 
    if (move.type == "swap") {
        [array[i], array[j]] = [array[j], array[i]]; 
    }

    showBars(move); 
    setTimeout(function() {
        animate(moves); 
    }, 1); 
}

function partition(array, left, right, moves) {
    const pivot = array[left]; 
    let i = left - 1; 
    let j = right + 1; 
    while (true) {
        do {
            i++; 
            moves.push({indices: [i, i], type: "comp"}); 
        } while (array[i] < pivot); 

        do {
            j--; 
            moves.push({indices: [j, j], type: "comp"}); 
        } while (array[j] > pivot); 

        moves.push({indices: [i, j], type: "comp"}); 
        if (i >= j) return j; 

        moves.push({indices: [i, j], type: "swap"}); 
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

function quickSort(array, left, right, moves) {
    if (left < right) {
        const partitionIndex = partition(array, left, right, moves); 
        quickSort(array, left, partitionIndex, moves); 
        quickSort(array, partitionIndex + 1, right, moves); 
    }
}

function mergeSort(array) {
    const moves = []; 
    if (array.length <= 1) return array; 
    const auxiliaryArray = array.slice(); 
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, moves); 
    return moves; 
}

function mergeSortHelper(
    mainArray, 
    start, 
    end, 
    auxiliaryArray, 
    moves,
) {
    if (start == end) return; 
    const mid = Math.floor((start + end) / 2); 
    mergeSortHelper(auxiliaryArray, start, mid, mainArray, moves); 
    mergeSortHelper(auxiliaryArray, mid + 1, end, mainArray, moves); 
    doMerge(mainArray, start, mid, end, auxiliaryArray, moves); 
}

function doMerge(
    mainArray, 
    start, 
    mid, 
    end, 
    auxiliaryArray, 
    moves, 
) {
    let k = start; 
    let i = start; 
    let j = mid + 1; 
    while (i <= mid && j <= end) {
        moves.push({indices: [i, j], type:"comp"}); 
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            moves.push({indices: [k, auxiliaryArray[i]], type: "over"}); 
            mainArray[k++] = auxiliaryArray[i++]; 
        } else {
            moves.push({indices: [k, auxiliaryArray[j]], type: "over"}); 
            mainArray[k++] = auxiliaryArray[j++]; 
        }
    }
    while (i <= mid) {
        moves.push({indices: [i, i], type: "comp"}); 
        moves.push({indices: [k, auxiliaryArray[i]], type: "over"}); 
        mainArray[k++] = auxiliaryArray[i++]; 
    }
    while (j <= end) {
        moves.push({indices: [j, j], type: "comp"}); 
        moves.push({indices: [k, auxiliaryArray[j]], type: "over"}); 
        mainArray[k++] = auxiliaryArray[j++]; 
    }
}

function bubbleSort(array) {
    const moves = []; 
    do {
        var swapped = false;  
        for (let i = 1; i < array.length; i++) {
            moves.push({indices: [i-1, i], type:"comp"}); 
            if (array[i-1] > array[i]) {
                swapped = true; 
                moves.push({indices: [i-1, i], type:"swap"}); 
                [array[i-1], array[i]] = [array[i], array[i-1]]; 
            }
        }
    } while (swapped); 
    return moves; 
}

function showBars(move) {
    container.innerHTML=""; 
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div"); 
        bar.style.height = array[i] * 100+"%"; 
        bar.classList.add("bar"); 
        if (move && move.type == "over" && move.indices[0] == i) {
            bar.style.height = move.indices[1] * 100+"%"; 
            array[i] = move.indices[1]; 
            bar.style.backgroundColor = "red"; 
        } else if (move && move.indices.includes(i)) {
            bar.style.backgroundColor=
                move.type=="swap" ? "red" : "blue"; 
        } 
        container.appendChild(bar); 
    }
}

function checkSort(index) {
    if (index > array.length) {
        showBars(); 
        document.getElementById("initButton").disabled = false; 
        document.getElementById("mergeButton").disabled = false; 
        document.getElementById("quickButton").disabled = false; 
        document.getElementById("bubbleButton").disabled = false; 
        return; 
    }
    container.innerHTML =""; 
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div"); 
        bar.style.height = array[i] * 100+"%"; 
        bar.classList.add("bar"); 
        bar.style.backgroundColor = (i < index) ? "lime" : "white"; 
        container.appendChild(bar);
    }
    setTimeout(function() {
        checkSort(index + 1); 
    }, 1); 
}