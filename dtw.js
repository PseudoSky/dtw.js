
if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, "fill", {
        enumerable: false,
        value: function(value) {

            // Steps 1-2.
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ?
              Math.max(len + relativeStart, 0) :
              Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ?
              len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ?
              Math.max(len + relativeEnd, 0) :
              Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
              O[k] = value;
              k++;
            }

            // Step 13.
            return O;
        }
    });
}
if (!Array.prototype.copy) {
    Object.defineProperty(Array.prototype, "copy", {
        enumerable: false,
        value:function(){
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }
            var O =new Object(this);
            return O.slice();
            // print([1,2,3].copy())
        }
    });
}
if (!Array.prototype.flatten) {
    Object.defineProperty(Array.prototype, "flatten", {
        enumerable: false,
        value:function(){
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }
            var O =new Object(this);
            return O.reduce(function(a, b) {
              return a.concat(b);
            }, []);
        }
    });
}

var inf = Infinity;
var min = Math.min;

function range(shape){
    return Array.prototype.concat([0],Object.keys(new Int8Array(shape)).map(Number).slice(1));
    // print(typeof range(5)[0])
}
function len(a){
    return (a.constructor && a.constructor.name=="Array") ? a.length : -1;
}

function zeros(shape){
    if(shape.length==0) return [];
    if(shape.length==1) shape=shape[0];
    var a=new Array(),i=0;
    if(typeof(shape)=='number' ){
        a=new Array(shape).fill(0);
        return a;
    }else {
        for(var j=0;j<shape[0];j++){
            a[j]=zeros(shape.slice(1));
        }
        return a;
    }
    return -1;
}

function array(shape){
    if(typeof shape=='number'){
        return new Array(shape||0)
    }else{
        var matrix = [];
        for(var i=0; i<shape[0]; i++) {
            matrix[i] = new Array(shape[1]);
        }
        return matrix;
    }
}

function print(){
    for (i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

function format(formatString, replacementArray) {
    return formatString.replace(
        /\{(\d+)\}/g, // Matches placeholders, e.g. '{1}'
        function formatStringReplacer(match, placeholderIndex) {
            // Convert String to Number
            placeholderIndex = Number(placeholderIndex);
            // Make sure that index is within array bounds
            if (
                placeholderIndex < 0 ||
                    placeholderIndex > replacementArray.length - 1
            ) {
                return placeholderIndex;
            }
            // Replace placeholder with value from replacement array
            return replacementArray[placeholderIndex];
        }
    );
    // print(zeros([10,2]))
}

function levenshtein(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};



/**
* FUNCTION: argmin( arr )
*   Computes the minimum value of a numeric array and returns the corresponding array indices.
*
* @param {Array} arr - array of values
* @returns {Array} array indices
*/
function argmin( arr ) {
    if ( !Array.isArray( arr ) ) {
        throw new TypeError( 'argmin()::invalid input argument. Must provide an array.' );
    }
    var len = arr.length,
        min = arr[ 0 ],
        idx = [ 0 ],
        val;

    for ( var i = 1; i < len; i++ ) {
        val = arr[ i ];
        if ( val < min ) {
            min = val;
            idx.length = 0;
            idx.push( i );
        }
        else if ( val === min ) {
            idx.push( i );
        }
    }
    return idx;  
} 
function argmax( arr ) {
    if ( !Array.isArray( arr ) ) {
        throw new TypeError( 'argmin()::invalid input argument. Must provide an array.' );
    }
    var len = arr.length,
        min = arr[ 0 ],
        idx = [ 0 ],
        val;

    for ( var i = 1; i < len; i++ ) {
        val = arr[ i ];
        if ( val > min ) {
            min = val;
            idx.length = 0;
            idx.push( i );
        }
        else if ( val === min ) {
            idx.push( i );
        }
    }
    return idx;  
} 

var sum = function(a){
    return a.flatten().reduce(function(a, b) {
        return a + b;
    }) || 0;
}

function d2(a, b) {
  var sum = 0
  var n
  for (n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2)
  }
  return sum
}

function euclidean_pdist(a,b){
    return Math.sqrt(Math.pow(a - b, 2));
}

function euclidean_norm(a,b){
    return Math.sqrt(Math.pow(a - b, 2))*(1/((a + b)/2));
}

function euclidean_distance(a, b) {
    return Math.sqrt(d2(a,b))
    // print("euclidean_distance "+euclidean_pdist(19, 1))
}



 function dtw(x, y, dist){

    // Computes Dynamic Time Warping (DTW) of two sequences.
    // :param array x: N1*M array
    // :param array y: N2*M array
    // :param func dist: distance used as cost measure
    // Returns the minimum distance, the cost matrix, the accumulated cost matrix, and the wrap path.

    var c = len(x);
    var r = len(y);

    if(c==0 || r==0) return -1;

    
    var D0   = zeros([c + 1, r + 1]);

    D0[0]    = D0[0].fill(inf);
    D0[0][0] = 0

    for(var i=1; i < D0.length;) D0[i++][0]=inf;

    var D1 = [];

    // EXAMPLE 1
    // [[ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]]
    // EXAMPLE 3
    // [[ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]]

    for(var row=1; row < c;row++){
        D1[row]=[]
        for(var col=1; col<r;col++){
            D1[row].push(D0[row][col]);
        }
    }


    // EXAMPLE 1
    // [[ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]
    //  [ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]
    //  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
    //  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
    //  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
    //  [ 3.  3.  3.  2.  2.  2.  2.  1.  2.  4.]
    //  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
    //  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
    //  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
    //  [ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]]
    // EXAMPLE 3
    // [[ 3.  5.  6.]
    //  [ 3.  3.  6.]
    //  [ 5.  4.  7.]
    //  [ 4.  6.  3.]
    //  [ 8.  8.  8.]
    //  [ 3.  4.  7.]
    //  [ 2.  5.  6.]
    //  [ 5.  5.  6.]]
    x.forEach(function(x_d,i){
        y.forEach(function(y_d,j){
            if(!D1[i])D1[i]=[];
            // print(format("i,j  {2},{3} of {4},{5}  x,y {0},{1} ",[x_d,y_d,i+1,j+1,len(D0),len(D0[0])]))
            d=dist(x_d,y_d)
            D1[i][j] = d
            a=(i+1)
            b=(j+1)
            D0[a][b] = d
        });
    });



    var C = D1.copy()
    // EXAMPLE 1
    // [[  1.   2.   3.   5.   7.   9.  11.  14.  16.  16.]
    //  [  2.   2.   3.   5.   7.   9.  11.  14.  16.  16.]
    //  [  2.   2.   2.   3.   4.   5.   6.   8.   9.  10.]
    //  [  2.   2.   2.   3.   4.   5.   6.   8.   9.  10.]
    //  [  3.   3.   3.   2.   2.   2.   2.   3.   3.   5.]
    //  [  6.   6.   6.   4.   4.   4.   4.   3.   5.   7.]
    //  [  7.   7.   7.   4.   4.   4.   4.   4.   3.   5.]
    //  [  7.   7.   7.   5.   5.   5.   5.   6.   4.   4.]
    //  [  8.   8.   8.   5.   5.   5.   5.   6.   4.   6.]
    //  [  9.   9.   9.   7.   7.   7.   7.   8.   6.   4.]]
    // EXAMPLE 3
    // [[  3.   8.  14.]
    //  [  6.   6.  12.]
    //  [ 11.  10.  13.]
    //  [ 15.  16.  13.]
    //  [ 23.  23.  21.]
    //  [ 26.  27.  28.]
    //  [ 28.  31.  33.]
    //  [ 33.  33.  37.]]
    range(c).forEach(function(x_d,i){
        range(r).forEach(function(y_d,j){

            D1[i][j]         += min(D0[i][j], D0[i][(j+1)], D0[(i+1)][j])
            D0[(i+1)][(j+1)] += min(D0[i][j], D0[i][(j+1)], D0[(i+1)][j])

        });
    });


    if(len(x)==1){
        path = zeros(len(y)), range(len(y))
    }else if(len(y) == 1){
        path = range(len(x)), zeros(len(x))
    }
    else{
        path = _traceback(D0)
    }
    dl=D1.length-1
    return [1-(D1[dl][D1[dl].length-1] / (dl+1+D1[dl].length)), C, D1, path]
}


function _traceback(D){
    var i =D.length-2;
    var j=D[0].length-2//, j = array([D.length,D[0].length]) - 2
    var p= [i], q = [j]

    while ((i > 0) || (j > 0)){
        tb = argmin([D[i][j], D[i][j+1], D[i+1][j]])[0]

        if((tb == 0)){
            i -= 1
            j -= 1
        } else if((tb == 1)){
            i -= 1
        }
        else{ // (tb == 2):
            j -= 1
        }

        p.push(i)
        q.push(j)
    }
    return [ p.reverse(),q.reverse()]
}
function test2(){
    if(0){ 
        // 1-D numeric
        // from sklearn.metrics.pairwise import manhattan_distances
        x = [0, 0, 1, 1, 2, 4, 2, 1, 2, 0]
        y = [1, 1, 1, 2, 2, 2, 2, 3, 2, 0]
        dist_fun = manhattan_distances
    }else if(0){
        // 2-D numeric
        // from sklearn.metrics.pairwise import euclidean_distances
        x = [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [4, 3], [2, 3], [1, 1], [2, 2], [0, 1]]
        y = [[1, 0], [1, 1], [1, 1], [2, 1], [4, 3], [4, 3], [2, 3], [3, 1], [1, 2], [1, 0]]
        dist_fun = euclidean_distances
    }else{
        // 1-D list of strings
        // from nltk.metrics.distance import edit_distance
        //x = ['we', 'shelled', 'clams', 'for', 'the', 'chowder']
        //y = ['class', 'too']
        x = ['i', 'soon', 'found', 'myself', 'muttering', 'to', 'the', 'walls']
        y = ['see', 'drown', 'himself']
        //x = 'we talked about the situation'.split()
        //y = 'we talked about the situation'.split()
        dist_fun = edit_distance
    }
    // dist, cost, acc, path = dtw(x, y, dist_fun);

    // vizualize
    // from matplotlib import pyplot as plt
    // plt.imshow(cost.T, origin='lower', cmap=plt.cm.Reds, interpolation='nearest')
    // plt.plot(path[0], path[1], '-o') // relation
    // plt.xticks(range(len(x)), x)
    // plt.yticks(range(len(y)), y)
    // plt.xlabel('x')
    // plt.ylabel('y')
    // plt.axis('tight')
    // plt.title('Minimum distance: {}'.format(dist))
    // plt.show()
}



function test(type){
    var dist,x,y;
    if(type=="series"){
        dist  = euclidean_pdist
        x     = [0, 0, 1, 1, 2, 4, 2, 1, 2, 0];
        y     = [1, 1, 1, 2, 2, 2, 2, 3, 2, 0];
    }else if(type=="string"){
        dist  = levenshtein;
        x     = ['i', 'soon', 'found', 'myself', 'muttering', 'to', 'the', 'walls'];
        y     = ['see', 'drown', 'himself'];
    }else{
        dist  = euclidean_pdist
        x     = [0, 0, 1, 1, 2, 4, 2, 1, 2, 0];
        y     = [1, 1, 1, 2, 2, 2, 2, 3, 2, 0];
    }
    print(dtw(x, y, dist));
}

// test("string")
// test()
// var incoming=[ 3, 8, 14 ,1,2,3,7];
// var temper=[ 3, 8, 14 ,1,2,3 ];
// print(dtw(incoming,temper,euclidean_norm));
// print(dtw([1,2,3,4,55,8,89,22,1],[1,2,3,4,55,6,89,22,0],euclidean_norm))
// print(dtw(['i','he', 'himself'],['see', 'drown', 'himself'],levenshtein))
// print(euclidean_norm(80,90))
/************************************ EXPECTED OUTPUT ************************************/


// [ 3.3636363636363638,
//   [ [ 3, 8, 14 ],
//     [ 6, 6, 12 ],
//     [ 11, 10, 13 ],
//     [ 15, 16, 13 ],
//     [ 23, 23, 21 ],
//     [ 26, 27, 28 ],
//     [ 28, 31, 33 ],
//     [ 33, 33, 37 ] ],
//   [ [ 3, 8, 14 ],
//     [ 6, 6, 12 ],
//     [ 11, 10, 13 ],
//     [ 15, 16, 13 ],
//     [ 23, 23, 21 ],
//     [ 26, 27, 28 ],
//     [ 28, 31, 33 ],
//     [ 33, 33, 37 ] ],
//   [ [ 0, 1, 2, 3, 4, 5, 6, 7 ], [ 0, 0, 0, 0, 0, 0, 1, 2 ] ] ]
// [ 0.2,
//   [ [ 1, 2, 3, 5, 7, 9, 11, 14, 16, 16 ],
//     [ 2, 2, 3, 5, 7, 9, 11, 14, 16, 16 ],
//     [ 2, 2, 2, 3, 4, 5, 6, 8, 9, 10 ],
//     [ 2, 2, 2, 3, 4, 5, 6, 8, 9, 10 ],
//     [ 3, 3, 3, 2, 2, 2, 2, 3, 3, 5 ],
//     [ 6, 6, 6, 4, 4, 4, 4, 3, 5, 7 ],
//     [ 7, 7, 7, 4, 4, 4, 4, 4, 3, 5 ],
//     [ 7, 7, 7, 5, 5, 5, 5, 6, 4, 4 ],
//     [ 8, 8, 8, 5, 5, 5, 5, 6, 4, 6 ],
//     [ 9, 9, 9, 7, 7, 7, 7, 8, 6, 4 ] ],
//   [ [ 1, 2, 3, 5, 7, 9, 11, 14, 16, 16 ],
//     [ 2, 2, 3, 5, 7, 9, 11, 14, 16, 16 ],
//     [ 2, 2, 2, 3, 4, 5, 6, 8, 9, 10 ],
//     [ 2, 2, 2, 3, 4, 5, 6, 8, 9, 10 ],
//     [ 3, 3, 3, 2, 2, 2, 2, 3, 3, 5 ],
//     [ 6, 6, 6, 4, 4, 4, 4, 3, 5, 7 ],
//     [ 7, 7, 7, 4, 4, 4, 4, 4, 3, 5 ],
//     [ 7, 7, 7, 5, 5, 5, 5, 6, 4, 4 ],
//     [ 8, 8, 8, 5, 5, 5, 5, 6, 4, 6 ],
//     [ 9, 9, 9, 7, 7, 7, 7, 8, 6, 4 ] ],
//   [ [ 0, 1, 2, 3, 4, 4, 4, 4, 5, 6, 7, 8, 9 ],
//     [ 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9 ] ] ]



// 0.2 

// [[ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]
//  [ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]
//  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
//  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
//  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
//  [ 3.  3.  3.  2.  2.  2.  2.  1.  2.  4.]
//  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
//  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
//  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
//  [ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]] 

// [[  1.   2.   3.   5.   7.   9.  11.  14.  16.  16.]
//  [  2.   2.   3.   5.   7.   9.  11.  14.  16.  16.]
//  [  2.   2.   2.   3.   4.   5.   6.   8.   9.  10.]
//  [  2.   2.   2.   3.   4.   5.   6.   8.   9.  10.]
//  [  3.   3.   3.   2.   2.   2.   2.   3.   3.   5.]
//  [  6.   6.   6.   4.   4.   4.   4.   3.   5.   7.]
//  [  7.   7.   7.   4.   4.   4.   4.   4.   3.   5.]
//  [  7.   7.   7.   5.   5.   5.   5.   6.   4.   4.]
//  [  8.   8.   8.   5.   5.   5.   5.   6.   4.   6.]
//  [  9.   9.   9.   7.   7.   7.   7.   8.   6.   4.]]

// [[0, 1, 2, 3, 4, 4, 4, 4, 5, 6, 7, 8, 9]
//  [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 9]]



// 3.36363636364 

// [[ 3.  5.  6.]
//  [ 3.  3.  6.]
//  [ 5.  4.  7.]
//  [ 4.  6.  3.]
//  [ 8.  8.  8.]
//  [ 3.  4.  7.]
//  [ 2.  5.  6.]
//  [ 5.  5.  6.]] 

// [[  3.   8.  14.]
//  [  6.   6.  12.]
//  [ 11.  10.  13.]
//  [ 15.  16.  13.]
//  [ 23.  23.  21.]
//  [ 26.  27.  28.]
//  [ 28.  31.  33.]
//  [ 33.  33.  37.]] 
//  [[0, 1, 2, 3, 4, 5, 6, 7],
//   [0, 0, 0, 0, 0, 0, 1, 2]]


// [ 3.3636363636363638,

//   [ [ 3,  8,  14 ],
//     [ 6,  6,  12 ],
//     [ 11, 10, 13 ],
//     [ 15, 16, 13 ],
//     [ 23, 23, 21 ],
//     [ 26, 27, 28 ],
//     [ 28, 31, 33 ],
//     [ 33, 33, 37 ] ],

//   [ [ 3,  8,  14 ],
//     [ 6,  6,  12 ],
//     [ 11, 10, 13 ],
//     [ 15, 16, 13 ],
//     [ 23, 23, 21 ],
//     [ 26, 27, 28 ],
//     [ 28, 31, 33 ],
//     [ 33, 33, 37 ] ],

//   [ [ 0, 1, 2, 3, 4, 5, 6, 7 ], 
//     [ 0, 0, 0, 0, 0, 0, 1, 2 ] ] ]











function Classifier(alg,templates,dist,gap){

    var self=this;
    self.algo=alg;
    self.dist=dist;
    self.tmp=templates;
    self.stream=[];
    self.odds={};
    self.win=self.tmp[0].length+100;
    self.gap=gap || 1;
    self.gap_counter=0;
    self.sample = function(el){

        if((self.stream.length)&&(self.stream.length!=0)&&(self.win==self.stream.length)){
            self.stream.shift();

        };
        self.stream.push(el);
        self.gap_counter=self.gap_counter+1;

        if(self.gap_counter==self.gap && (self.win>=self.stream.length)){
            self.odds=new Object({});
            for(var ex=0; ex<self.tmp.length; ex++){
                self.odds[ex]=self.algo(self.tmp[ex], self.stream, self.dist)[0];
            }
            max = argmax(Object.keys(self.odds).map(function ( key ) { return self.odds[key] }));
            console.log("Most Likely: "+max+", "+self.odds[max]);
            self.gap_counter=0;
        }

    }

    return this;
}




function test_classifier(count){
    var cur_time = Date.now();
    var templates=[
        [ 0, 0.9090909090909092, 2.2032085561497325, 3.2032085561497325, 3.6032085561497325, 3.6032085561497325 ],
        [ 2.9, 0.9090909090909092, 2.2032085561497325, 3.2032085561497325, 3.6032085561497325, 3.6032085561497325 ],
        [ 0, 0.9090909090909092, 2.2032085561497325, 3.2032085561497325, 3.6032085561497325, 3.6032085597325 ],
        [0.9090909090909092,2.2032085561497325,3.2032085561497325,1.6032085561497325,3.6032085561497325],
        [.7397169237358767,2.1315094660917784,2.0771225947577925,2.1173824118549893,1.8916483026964062]];
    var c=new Classifier(dtw,templates,euclidean_norm);
    // console.log('C',C);
    for ( var sky = 1; sky < count; sky++ ) {
        next=Math.random()*2.2032085561497325+1
        c.sample(next);
    }
    var end_time = Date.now();

    var timeDifference = end_time - cur_time;
    var differenceDate = new Date(timeDifference * 100);
    var diffHours = differenceDate.getUTCHours()+ ':' +differenceDate.getUTCMinutes()+ ':' +differenceDate.getUTCSeconds();
    console.log('Elapsed',diffHours);


}
// test_classifier(50000)