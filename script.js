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

                // Randomize the initial position
                piece.style.left = Math.random() * (window.innerWidth - pieceWidth) + 'px';
                piece.style.top = Math.random() * (window.innerHeight - pieceHeight) + 'px';

                // Add mouse event listeners for dragging
                piece.addEventListener('mousedown', dragStart);
                document.addEventListener('mouseup', dragEnd);

                puzzleContainer.appendChild(piece);
            }
        }
    }

    let draggedPiece = null;
    let offsetX = 0;
    let offsetY = 0;

    function dragStart(e) {
        draggedPiece = this;
        
        // Get the initial offset of the cursor relative to the piece
        offsetX = e.clientX - draggedPiece.getBoundingClientRect().left;
        offsetY = e.clientY - draggedPiece.getBoundingClientRect().top;

        // Add mousemove listener to move the piece
        document.addEventListener('mousemove', dragMove);
    }

    function dragMove(e) {
        if (!draggedPiece) return;

        // Prevent text selection during drag
        e.preventDefault();

        // Set the new position of the piece relative to the mouse position
        draggedPiece.style.left = (e.clientX - offsetX) + 'px';
        draggedPiece.style.top = (e.clientY - offsetY) + 'px';
    }

    function dragEnd(e) {
        if (!draggedPiece) return;

        const rect = puzzleContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridX = Math.floor(x / pieceWidth);
        const gridY = Math.floor(y / pieceHeight);

        // Snap the piece to the grid if it's within bounds
        if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
            draggedPiece.style.left = gridX * pieceWidth + 'px';
            draggedPiece.style.top = gridY * pieceHeight + 'px';

            // Check if it's in the correct position
            if (gridX == draggedPiece.dataset.col && gridY == draggedPiece.dataset.row) {
                draggedPiece.draggable = false; // Disable further dragging if it's in place
            }
        }

        // Remove the mousemove listener to stop moving the piece
        document.removeEventListener('mousemove', dragMove);
        draggedPiece = null;
    }
};
