window.onload = function() {
    const puzzleContainer = document.getElementById('puzzle-container');
    const imageSrc = './images/Postcard Photo.jpg'; // Update the correct image path

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
                piece.style.backgroundSize = '300px 300px'; // Ensure image is scaled correctly
                piece.dataset.row = row;
                piece.dataset.col = col;

                piece.style.left = Math.random() * (window.innerWidth - pieceWidth) + 'px';
                piece.style.top = Math.random() * (window.innerHeight - pieceHeight) + 'px';

                piece.draggable = true;
                piece.addEventListener('dragstart', dragStart);
                piece.addEventListener('dragend', dragEnd);

                puzzleContainer.appendChild(piece);
            }
        }
    }

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

        if (
            gridX >= 0 && gridX < cols &&
            gridY >= 0 && gridY < rows
        ) {
            this.style.left = gridX * pieceWidth + 'px';
            this.style.top = gridY * pieceHeight + 'px';

            if (gridX == this.dataset.col && gridY == this.dataset.row) {
                this.draggable = false;
            }
        }
    }
};

