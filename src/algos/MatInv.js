
// JavaScript program to find adjoint and
// inverse of a matrix

let N = 4;
// Function to get cofactor of
// A[p][q] in temp[][]. n is current
// dimension of A[][]
function getCofactor(A,temp,p,q,n)
{
	let i = 0, j = 0;

	// Looping for each element of the matrix
	for (let row = 0; row < n; row++)
	{
		for (let col = 0; col < n; col++)
		{
			// Copying into temporary matrix only those element
			// which are not in given row and column
			if (row != p && col != q)
			{
				temp[i][j++] = A[row][col];

				// Row is filled, so increase row index and
				// reset col index
				if (j == n - 1)
				{
					j = 0;
					i++;
				}
			}
		}
	}
}

/* Recursive function for finding determinant of matrix.
n is current dimension of A[][]. */
function determinant(A,n)
{
	let D = 0; // Initialize result

	// Base case : if matrix contains single element
	if (n == 1)
		return A[0][0];

	let temp = new Array(N);// To store cofactors
	for(let i=0;i<N;i++)
	{
		temp[i]=new Array(N);
	}

	let sign = 1; // To store sign multiplier

	// Iterate for each element of first row
	for (let f = 0; f < n; f++)
	{
		// Getting Cofactor of A[0][f]
		getCofactor(A, temp, 0, f, n);
		D += sign * A[0][f] * determinant(temp, n - 1);

		// terms are to be added with alternate sign
		sign = -sign;
	}

	return D;
}

// Function to get adjoint of A[N][N] in adj[N][N].
function adjoint(A,adj)
{
	if (N == 1)
	{
		adj[0][0] = 1;
		return;
	}

	// temp is used to store cofactors of A[][]
	let sign = 1;
	let temp = new Array(N);
	for(let i=0;i<N;i++)
	{
		temp[i]=new Array(N);
	}

	for (let i = 0; i < N; i++)
	{
		for (let j = 0; j < N; j++)
		{
			// Get cofactor of A[i][j]
			getCofactor(A, temp, i, j, N);

			// sign of adj[j][i] positive if sum of row
			// and column indexes is even.
			sign = ((i + j) % 2 == 0)? 1: -1;

			// Interchanging rows and columns to get the
			// transpose of the cofactor matrix
			adj[j][i] = (sign)*(determinant(temp, N-1));
		}
	}
}

// Function to calculate and store inverse, returns false if
// matrix is singular
function inverse(A,inverse)
{
	// Find determinant of A[][]
	let det = determinant(A, N);
	if (det == 0)
	{
		document.write("Singular matrix, can't find its inverse");
		return false;
	}

	// Find adjoint
	let adj = new Array(N);
	for(let i=0;i<N;i++)
	{
		adj[i]=new Array(N);
	}
	adjoint(A, adj);

	// Find Inverse using formula "inverse(A) = adj(A)/det(A)"
	for (let i = 0; i < N; i++)
		for (let j = 0; j < N; j++)
			inverse[i][j] = adj[i][j]/det;

	return true;
}

// Generic function to display the
// matrix. We use it to display
// both adjoin and inverse. adjoin
// is integer matrix and inverse
// is a float.
function display(A)
{
	for (let i = 0; i < N; i++)
	{
		for (let j = 0; j < N; j++)
			console.log(A[i][j]," ")
	}
}


function displays(A)
{
	for (let i = 0; i < N; i++)
	{
		for (let j = 0; j < N; j++)
			console.log(A[i][j].toFixed(6)+" ");
	}
}

// Driver program
let A=[[5, -2, 2, 7],
					[1, 0, 0, 3],
					[-3, 1, 5, 0],
					[3, -1, -9, 4]];
let adj = new Array(N);
let inv = new Array(N);

for(let i=0;i<N;i++)
{
	adj[i]=new Array(N);
	inv[i]=new Array(N);
}

// document.write("Input matrix is :<br>");
console.log('input mat is ')
display(A);

console.log('adjoint mat is ')
// document.write("<br>The Adjoint is :<br>");
adjoint(A, adj);
display(adj);

console.log('inv mat is ')
// document.write("<br>The Inverse is :<br>");
if (inverse(A, inv))
	displays(inv);

