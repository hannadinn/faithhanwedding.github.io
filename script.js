window.onload = function() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const imageSrc = './images/Postcard Photo.jpg'; // Updated image path

    const img = new Image();
    img.src = imageSrc;

    img.onload = function() {
        createPuzzlePieces(img);
    };

    const rows = 3;
    const cols = 3;
    const pieceWidth = 100;
    const pieceHeight = 100;

    function createPuzzlePieces(image) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = document.createElement('div');
                piece.classList.add('puzzle-piece');
                piece.style.backgroundImage = `url(${image.src})`;
                piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
                piece.style.backgroundSize = '300px 300px';
                piece.dataset.row = row;
                piece.dataset.col = col;

                // Set random initial position
                piece.style.position = 'absolute';
                piece.style.left = Math.random() * (window.innerWidth - pieceWidth) + 'px';
                piece.style.top = Math.random() * (window.innerHeight - pieceHeight) + 'px';

                // Add mouse event listeners for dragging
                piece.addEventListener('mousedown', dragStart);
                puzzleContainer.appendChild(piece);
            }
        }
    }

    let draggedPiece = null;
    let offsetX = 0;
    let offsetY = 0;

    function dragStart(e) {
        draggedPiece = this;

        // Calculate the cursor's offset relative to the puzzle piece
        const rect = draggedPiece.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // Move the piece during drag
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }

    function dragMove(e) {
        if (!draggedPiece) return;

        // Prevent default text selection
        e.preventDefault();

        // Update the piece's position as the cursor moves
        draggedPiece.style.left = (e.clientX - offsetX) + 'px';
        draggedPiece.style.top = (e.clientY - offsetY) + 'px';
    }

    function dragEnd(e) {
        if (!draggedPiece) return;

        // Snap the piece to the grid
        const rect = puzzleContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridX = Math.floor(x / pieceWidth);
        const gridY = Math.floor(y / pieceHeight);

        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
            draggedPiece.style.left = gridX * pieceWidth + 'px';
            draggedPiece.style.top = gridY * pieceHeight + 'px';

            if (gridX == draggedPiece.dataset.col && gridY == draggedPiece.dataset.row) {
                draggedPiece.draggable = false; // Lock piece if correct
            }
        }

        // Remove event listeners when drag is finished
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        draggedPiece = null;
    }
};
