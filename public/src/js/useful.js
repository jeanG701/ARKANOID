
export const $ = element => document.querySelector(`${element}`);

export const amountBricks = arr => {
    let activos = 0;
    for(let r = 0; r < arr.length; r++) {
        for(let c = 0; c < arr[r].length; c++) {
            if(arr[r][c].status === 1) activos++;
        }
    }

    return activos;
}