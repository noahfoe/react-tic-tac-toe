const getWinCons = (playingBoard) => { 
    let WinCons = [];
    if(playingBoard.length == 9) {
        WinCons = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // Diagonals
            [0, 4, 8],
            [2, 4, 6],
        ];
    } else if(playingBoard.length == 16) {
        WinCons = [
            // Rows
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
            // Columns
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            // Diagonals
            [0, 5, 10, 15],
            [3, 6, 9, 12],
        ];
    } else if(playingBoard.length == 25) {
        /*
        [0][1][2][3][4]
        [5][6][7][8][9]
        [10][11][12][13][14]
        [15][16][17][18][19]
        [20][21][22][23][24]
        */
        WinCons = [
            // Rows
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            // Columns
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            // Diagonals
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20],
        ];
    } else {
        /*
        [0][1][2][3][4][5]
        [6][7][8][9][10][11]
        [12][13][14][15][16][17]
        [18][19][20][21][22][23]
        [24][25][26][27][28][29]
        [30][31][32][33][34][35]
        */
        WinCons = [
            // Rows
            [0, 1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29],
            [30, 31, 32, 33, 34, 35],
            // Columns
            [0, 6, 12, 18, 24, 30],
            [1, 7, 13, 19, 25, 31],
            [2, 8, 14, 20, 26, 32],
            [3, 9, 15, 21, 27, 33],
            [4, 10, 16, 22, 28, 34],
            [5, 11, 17, 23, 29, 35],
            // Diagonals
            [0, 7, 14, 21, 28, 35],
            [5, 10, 15, 20, 25, 30],
        ]
    }
    return WinCons;
}

export default getWinCons;