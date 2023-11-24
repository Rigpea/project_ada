def mystery(A):
    n = 5
    mystery = A[1]-A[0]
    minsofar = min(A[1],A[0])
    for j in range(2, n):
        if(A[j] - minsofar > mystery):
                mystery = A[j] - minsofar
        minsofar = min(A[j], minsofar)
    print(mystery)

f = [9,4,6,8,2,2]
mystery(f)
