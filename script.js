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

        // Get the position of the mouse relative to the piece
        const rect = draggedPiece.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        // Set up the move and release event listeners
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);

        // Prevent text selection
        e.preventDefault();
    }

    function dragMove(e) {
        if (!draggedPiece) return;

        // Calculate new position based on mouse position and offset
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
                draggedPiece.draggable = false; // Lock piece if in place
            }
        }

        // Clean up event listeners
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        draggedPiece = null;
    }
};
