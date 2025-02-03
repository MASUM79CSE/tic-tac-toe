class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells = document.querySelectorAll('[data-cell]');
        this.status = document.getElementById('status');
        this.restartButton = document.getElementById('restartButton');
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e), { once: true });
        });
        
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.updateStatus();
    }
    
    handleCellClick(e) {
        const cell = e.target;
        const index = Array.from(this.cells).indexOf(cell);
        
        if (this.board[index] !== '' || !this.gameActive) return;
        
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.gameActive = false;
            this.updateStatus(`${this.currentPlayer} Wins!`);
            return;
        }
        
        if (this.checkDraw()) {
            this.gameActive = false;
            this.updateStatus("It's a Draw!");
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    checkWin() {
        return this.winningCombinations.some(combination => {
            if (combination.every(index => this.board[index] === this.currentPlayer)) {
                combination.forEach(index => {
                    this.cells[index].classList.add('winning-cell');
                });
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    updateStatus(message) {
        this.status.textContent = message || `${this.currentPlayer}'s Turn`;
    }
    
    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
        
        this.cells.forEach(cell => {
            cell.removeEventListener('click', this.handleCellClick);
            cell.addEventListener('click', (e) => this.handleCellClick(e), { once: true });
        });
        
        this.updateStatus();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
