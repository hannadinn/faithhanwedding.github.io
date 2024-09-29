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

                // Enable draggable attribute for HTML5 drag-and-drop
                piece.setAttribute('draggable', true);

                // Add event listeners for drag-and-drop behavior
                piece.addEventListener('dragstart', handleDragStart);
                piece.addEventListener('dragend', handleDragEnd);
                piece.addEventListener('dragover', handleDragOver);
                piece.addEventListener('dragenter', handleDragEnter);
                piece.addEventListener('dragleave', handleDragLeave);
                piece.addEventListener('drop', handleDrop);

                puzzleContainer.appendChild(piece);
            }
        }
    }

    function handleDragStart(e) {
        this.style.opacity = '0.4'; // Make the piece semi-transparent while dragging
        e.dataTransfer.setData('text/plain', this.dataset.row + ',' + this.dataset.col); // Pass row and column as data
    }

    function handleDragEnd(e) {
        this.style.opacity = '1'; // Reset the piece's opacity after drag

        // Reset highlighting on all pieces
        const items = document.querySelectorAll('.puzzle-piece');
        items.forEach(item => item.classList.remove('over'));
    }

    function handleDragOver(e) {
        e.preventDefault(); // Necessary for the drop to be allowed
        return false;
    }

    function handleDragEnter(e) {
        this.classList.add('over'); // Optional: Add a highlight to show drag-over status
    }

    function handleDragLeave(e) {
        this.classList.remove('over'); // Remove the highlight when leaving a drop zone
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        const [draggedRow, draggedCol] = e.dataTransfer.getData('text/plain').split(',');

        // Reposition the dragged piece to the drop zone location
        const draggedPiece = document.querySelector(
            `.puzzle-piece[data-row='${draggedRow}'][data-col='${draggedCol}']`
        );

        draggedPiece.style.left = e.clientX - (pieceWidth / 2) + 'px';
        draggedPiece.style.top = e.clientY - (pieceHeight / 2) + 'px';

        return false;
    }
};
