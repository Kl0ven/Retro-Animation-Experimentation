// eslint-disable-next-line no-unused-vars
class RecursiveBacktracker {
    constructor (map) {
        this.map = map;
        this.currentCell = null;
        this.stack = [];
    }

    init () {
        this.map.draw();
        this.setCurrentCell(this.map.getCellAt(20, 5));
    }

    run () {
        if (! this.map.isAllCellsVisited()) {
            this.step();
            setTimeout(this.run.bind(this), 50);
        }
    }

    step () {
        const next = this.map.getRandomNotVisitedNeigbors(this.currentCell);
        if (next) {
            this.setCurrentCell(next);
            this.stack.push(this.currentCell);
            // for (const n of this.map.getNeigbors(next)) {
            //     this.setCurrentCell(n)
            //     n.draw();
            // }
        } else if ( this.stack.length > 0) {
            const cell = this.stack.pop();
            this.setCurrentCell(cell);
        }
    }

    setCurrentCell (c) {
        if (this.currentCell) {
            this.map.removeWall(this.currentCell, c);
            this.currentCell.leave();
        }

        this.currentCell = c;
        c.visit();
    }
}
