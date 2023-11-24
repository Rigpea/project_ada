def mystery(A):
    n = 3
    mystery = A[1]-A[0]
    for j in range(1, n):
        for i in range(0, j):
            if(A[j] - A[i] > mystery):
                mystery = A[j] - A[i]
            print(mystery)
    

f = [2,7,9]
mystery(f)