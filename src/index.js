module.exports = function solveSudoku(matrix) {
    // your solution
    var masG=new Array (9);
    var countZero=81;
    var k=10;
    //while(countZero>0){
    while(k>0){   
        countZero=osnSelection(matrix,masG,countZero);
        k--;
    }    
    return matrix;
}
function osnSelection(matrix,masG,countZero){
    var countInd=9;
    while(countInd>0){
        countInd=0;
        check(matrix,masG);
        var countS=SquareSelection(matrix,masG,countInd);
        addInMatrix(matrix,masG);
        check(matrix,masG);
        var countV=VerticalSelection(matrix,masG,countInd);
        addInMatrix(matrix,masG);
        check(matrix,masG);
        var countG=GorizontSelection(matrix,masG,countInd);
        addInMatrix(matrix,masG);
        countInd=countS+countV+countG;
    }
    check(matrix,masG);  
    unknownsNumber(matrix,masG);  
   countZero=0;
   for(var i=0;i<9;i++){
       for(var j=0;j<9;j++){
           if(matrix[i][j]==0){
               countZero++;
           }
       }
   }  
   return countZero;  
}
function unknownsNumber(matrix,masG){
    var min=9,minCount=81,im=0,jm=0,fl="gorizont",d1=3;d2=3,i1=0,j1=0,p=0;
    check(matrix,masG);
    for(var i=0;i<9;i++){
        var minG=0;
        for(var j=0;j<9;j++){
            if(matrix[i][j]==0){
                minG++;
            }
        }
        if(minG<min&&minG>0){
            min=minG;
            im=i; jm=0;
            fl="gorizont"
        }
    }
    for(var j=0;j<9;j++){
        var minV=0;
        for(var i=0;i<9;i++){
            if(matrix[i][j]==0){
                minV++;
            }
        }
        if(minV<min&&minV>0){
            min=minV;
            jm=j; im=0;
            fl="vertical"
        }
    } 
    for(var k=0;k<9;k++){
        var minQ=0;
        for(var i=i1;i<d1;i++){ 
            for(var j=j1;j<d2;j++){
                if(matrix[i][j]==0){
                    minQ++;
                }
            }         
        }
        if(minQ<min&&minQ>0){
            min=minQ
            im=k;
            jm=k;
            fl="square"
        }   
        d2+=3;
        j1+=3;
        if(d2>9){
            i1+=3;d1+=3;
            d2=3; j1=0;
        }
    }
    stopS:if(fl=="square"){
        for(var i=im;i<3*im;i++){
            for(var j=jm;j<3*jm;j++){
                if(matrix[i][j]==0){
                    masG[i][j].splice(1,masG[i][j].length);
                    addInMatrix(matrix,masG);
                    break stopS;
                }
            }
        }
    }
    stopG:if(fl=="gorizont"){
        for(var j=0;j<9;j++){
            if(matrix[im][j]==0){
                masG[im][j].splice(1,masG[im][j].length);
                addInMatrix(matrix,masG);
                break stopG;
            }
        }
    }  
    stopV:if(fl=="vertical"){
        for(var i=0;i<9;i++){
            if(matrix[i][jm]==0){
                masG[i][jm].splice(1,masG[i][jm].length);
                addInMatrix(matrix,masG);
                break stopV;
            }
        }
    }  
}
function check(matrix,masG){
    for(var i=0;i<9;i++){
        masG[i]=new Array (9);
        for(var j=0;j<9;j++){
           masG[i][j]=new Array (9);
        }  
    }
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
        if(matrix[i][j]==0){
            masG[i][j]=[1,2,3,4,5,6,7,8,9];
            GorizontPotential(matrix,masG,i,j);
            VerticalPotential(matrix,masG,i,j);
            SquarePotential(matrix,masG,i,j);
        }
        else{
            masG[i][j][0]=matrix[i][j];
            masG[i][j].splice(1, 8);
        }
      }
    }
}
function GorizontPotential(matrix,masG,i,j){ 
    for(var j1=0;j1<9;j1++){     
        if(matrix[i][j1]!=0){
            var ind=masG[i][j].indexOf(matrix[i][j1]);
            if(ind>=0){
                masG[i][j].splice(ind, 1);
            }
        } 
    }  
}    
function VerticalPotential(matrix,masG,i,j){
    for(var i1=0;i1<9;i1++){     
        if(matrix[i1][j]!=0){
            var ind=masG[i][j].indexOf(matrix[i1][j]);
            if(ind>=0){
                masG[i][j].splice(ind, 1);
            }
        } 
    }     
}  
function SquarePotential(matrix,masG,i,j){
    var p2=3,j2=0,p1=3,i2=0;
    if(0<=j&&j<3){
       p2=3; j2=0;
    }
    else{
        if(3<=j&&j<6){
            p2=6; j2=3;
        }
        else{
            p2=9; j2=6;
        } 
    }
    if(0<=i&&i<3){
        p1=3; i2=0;
    }
    else{
        if(3<=i&&i<6){
            p1=6; i2=3;
        }
        else{
            p1=9; i2=6;
        }
    }
    for(var i1=i2 ;i1<p1;i1++){
        for(var j1=j2 ;j1<p2;j1++){
            var ind=masG[i][j].indexOf(matrix[i1][j1]);
            if(ind>=0){     
                masG[i][j].splice(ind, 1);
            } 
        }
    }
}
function SquareSelection(matrix,masG){
    var d1=3;d2=3,i1=0,j1=0,p=0,count=0;
    for(var k=0;k<9;k++){
        var masP=[];
        var masCount=[0,0,0,0,0,0,0,0,0,0];
        for(var i=i1;i<d1;i++){ 
            for(var j=j1;j<d2;j++){
               HelperSelection(matrix,masG,masP,i,j);
            }
        }
        var ind=posIndividual(masP,masCount);
        for(var i=i1;i<d1;i++){ 
            for(var j=j1;j<d2;j++){
                var pos=masG[i][j].indexOf(ind);
                if(pos!=-1){
                    masG[i][j][0]=ind;
                    var len=masG[i][j].length;
                    masG[i][j].splice(1,len);
                    count++;
                }
            }
        }
        d2+=3;
        j1+=3;
        if(d2>9){
            i1+=3;d1+=3;
            d2=3; j1=0;
        }
    } 
    return count;
}
function GorizontSelection(matrix,masG){
    var count=0;
    for(var i=0;i<9;i++){
        var masP=[];
        var masCount=[0,0,0,0,0,0,0,0,0,0];
        for(var j=0;j<9;j++){
            HelperSelection(matrix,masG,masP,i,j);
        }
        var ind=posIndividual(masP,masCount);
        for(var j=0;j<9;j++){
                var pos=masG[i][j].indexOf(ind);         
                if(pos!=-1){  
                    count++;          
                    masG[i][j][0]=ind;
                    var len=masG[i][j].length;
                    masG[i][j].splice(1,len);
                }
        }
    }
    return count;
}
function VerticalSelection(matrix,masG){
    var count=0;
    for(var j=0;j<9;j++){
        var masP=[];
        var masCount=[0,0,0,0,0,0,0,0,0,0];
        for(var i=0;i<9;i++){
            HelperSelection(matrix,masG,masP,i,j);
        }
        var ind=posIndividual(masP,masCount);
        for(var i=0;i<9;i++){
                var pos=masG[i][j].indexOf(ind);         
                if(pos!=-1){    
                    count++;        
                    masG[i][j][0]=ind;
                    var len=masG[i][j].length;
                    masG[i][j].splice(1,len);
                }
        }
    } 
    return count;
} 
function posIndividual(masP,masCount){
    for(var l=0;l<masP.length;l++){
        var n=masP[l]
        masCount[n]++;
    }
    for(var l=0;l<masCount.length;l++){
        var ind=masCount.indexOf(1);        
    } 
    return ind;
}
function HelperSelection(matrix,masG,masP,i,j){
    if(matrix[i][j]==0){
        for(var k=0;k<masG[i][j].length;k++){
            masP.push(masG[i][j][k]);
        }
    }
}
function addInMatrix(matrix,masG){
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if(masG[i][j].length==1){
                matrix[i][j]=masG[i][j][0];
            }
        }
    }     
}