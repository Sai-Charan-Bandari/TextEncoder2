
//caesar cipher
let arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
function caesarCipherEncode(s,k){
    s = s.toLowerCase()
    let temp = ''
    for (let i = 0; i < s.length; i++) {
        let y = (arr.indexOf(s[i]) + k) % 26
        if (y < 0)
            temp += arr[26 + y]
        else
            temp += arr[y]
    }
    console.log('encoded : ',temp)
    return temp
}
function caesarCipherDecode(temp,k){
    let temp1=''
    for (let i = 0; i < temp.length; i++) {
        let y = (arr.indexOf(temp[i]) - k) % 26
        if (y < 0)
            temp1 += arr[26 + y]
        else
            temp1 += arr[y]
    }
    console.log('decoded : ',temp1)
    return temp1
}
function caesarCipherBruteDecode(temp){
    for(let test=0;test<26;test++){
        let temp1=''
        for (let i = 0; i < temp.length; i++) {
            let y = (arr.indexOf(temp[i]) - test) % 26
            if (y < 0)
                temp1 += arr[26 + y]
            else
                temp1 += arr[y]
        }
        console.log('decoded : ',temp1)
    }
}

//hill cipher
function findKmat(k){ 
    let n=Math.sqrt(k.length)
    let kMat=[]
    //finding kMat
    //checking if n^2 is exactly length of k...bcoz we may get decimal values for n
    if(n*n == k.length){
        let i=0
        while(i<k.length){
            let sub=k.substring(i,i+n)
            // console.log('sub is ',sub)
            i+=n
            let temp=[]
            for(let j=0;j<sub.length;j++){
                temp.push(arr.indexOf(sub[j]))
            }
            // console.log('temp is ',temp)
            kMat.push(temp)
        }
        console.log('kMat is ',kMat)
        return kMat
    }else return 'NULL'
}

function hillCipherEncode(s,k){
    s=s.toLowerCase()
    k=k.toLowerCase()
    let n=Math.sqrt(k.length)
    let kMat=findKmat(k)
    if(kMat=='NULL')
    return 'NULL'

    //finding sArr arr
    let sArr=[]
    let i=0
        while(i<s.length){
            let sub=s.substring(i,i+n)
            i+=n
            let temp=[]
            for(let j=0;j<sub.length;j++){
                temp.push(arr.indexOf(sub[j]))
            }
            sArr.push(temp)
        }
    console.log('sArr is ',sArr)
    //multiplying each ele of sArr with kMat
    let ansArr='' //contains concatenation of all encoded substrings of length n
    for(let i=0;i<sArr.length;i++){
       let temp= sArr[i]
       let temp2='' //contains encoded substring 
        for(let j=0;j<n;j++){
            let sum=0
            for(let t=0;t<n;t++){
                sum+=temp[t]*kMat[t][j]
            }
            temp2+=arr[sum%26]
        }
        ansArr+=temp2
    }
    console.log('ansArr is ',ansArr)
    return ansArr
}

function hillCipherDecode(s,k){
    s=s.toLowerCase()
    k=k.toLowerCase()
    let n=Math.sqrt(k.length)
    let kMat=findKmat(k)
    if(kMat=='NULL')
    return 'NULL'

    //find invers of kMat


}

//run
// caesarCipherDecode(caesarCipherEncode('Xerox',10),10)
// hillCipherEncode('paymoremoney','rrfvsvcct')

export {caesarCipherEncode,caesarCipherDecode,caesarCipherBruteDecode,hillCipherEncode}