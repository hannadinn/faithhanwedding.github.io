window.onload = function() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const imageSrc = './Postcard Photo.jpg'; // Path to your image file

    // Puzzle grid dimensions
    const rows = 3;
    const cols = 3;
    const pieceWidth = 100;
    const pieceHeight = 100;

    const pieces = [];

    // Function to create puzzle pieces
    function createPuzzlePieces() {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url(${imageSrc})`;
                piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
                piece.dataset.row = row;
                piece.dataset.col = col;

                // Randomize position outside the puzzle area
                piece.style.left = Math.random() * (window.innerWidth - pieceWidth) + 'px';
                piece.style.top = Math.random() * (window.innerHeight - pieceHeight) + 'px';

                // Add drag functionality
                piece.draggable = true;
                piece.addEventListener('dragstart', dragStart);
                piece.addEventListener('dragend', dragEnd);

                pieces.push(piece);
                puzzleContainer.appendChild(piece);
            }
        }
    }

    // Drag and Drop Functions
    let draggedPiece = null;

    function dragStart(e) {
        draggedPiece = this;
    }

    function dragEnd(e) {
        const rect = puzzleContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridX = Math.floor(x / pieceWidth);
        const gridY = Math.floor(y / pieceHeight);

        // Snap the piece into the correct position if it's close to the grid
        if (
            gridX >= 0 && gridX < cols &&
            gridY >= 0 && gridY < rows
        ) {
            this.style.left = gridX * pieceWidth + 'px';
            this.style.top = gridY * pieceHeight + 'px';

            // Check if the piece is in the correct position
            if (gridX == this.dataset.col && gridY == this.dataset.row) {
                // The piece is in the correct position, disable dragging
                this.draggable = false;
            }
        }
    }

    createPuzzlePieces();
};
