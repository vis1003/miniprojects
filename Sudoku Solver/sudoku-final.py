import tkinter as tk

def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False

    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for i in range(3):
        for j in range(3):
            if board[start_row + i][start_col + j] == num:
                return False

    return True

def find_empty_cell(board):
    for i in range(9):
        for j in range(9):
            if board[i][j] == 0:
                return i, j
    return None

def solve_sudoku(board):
    empty_cell = find_empty_cell(board)
    if not empty_cell:
        return True

    row, col = empty_cell
    for num in range(1, 10):
        if is_valid(board, row, col, num):
            board[row][col] = num
            if solve_sudoku(board):
                return True
            board[row][col] = 0

    return False

def constraint_propagation(board):
    changed = True
    while changed:
        changed = False
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    possibilities = set(range(1, 10))
                    possibilities -= set(board[row][j] for j in range(9))
                    possibilities -= set(board[i][col] for i in range(9))
                    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
                    possibilities -= set(board[start_row + i][start_col + j] for i in range(3) for j in range(3))
                    if len(possibilities) == 1:
                        board[row][col] = possibilities.pop()
                        changed = True
    return board

def solve_button_handler():
    input_board = []
    for i in range(9):
        row = []
        for j in range(9):
            cell_value = int(cell_entries[i][j].get())
            row.append(cell_value)
        input_board.append(row)

    constraint_propagation(input_board)
    if solve_sudoku(input_board):
        for i in range(9):
            for j in range(9):
                cell_entries[i][j].delete(0, tk.END)
                cell_entries[i][j].insert(0, str(input_board[i][j]))

def create_entry_cells(root):
    cell_entries = []
    for i in range(9):
        row_entries = []
        for j in range(9):
            entry = tk.Entry(root, width=2, font=("Arial", 16), justify="center")
            entry.grid(row=i, column=j, padx=2, pady=2)
            row_entries.append(entry)
        cell_entries.append(row_entries)
    return cell_entries

def highlight_boxes(cell_entries):
    for i in range(9):
        for j in range(9):
            entry = cell_entries[i][j]
            entry_row, entry_col = i // 3, j // 3
            if entry_row % 2 == entry_col % 2:
                entry.config(bg="#DDDDDD")
            else:
                entry.config(bg="white")

if __name__ == "__main__":
    root = tk.Tk()
    root.title("Sudoku Solver")

    cell_entries = create_entry_cells(root)
    highlight_boxes(cell_entries)

    solve_button = tk.Button(root, text="Solve Sudoku", command=solve_button_handler)
    solve_button.grid(row=9, column=0, columnspan=9, padx=10, pady=10)

    root.mainloop()
