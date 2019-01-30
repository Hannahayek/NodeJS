/* function LinkedList(){
    this.head=null;
}

LinkedList.prototype.push=function(val){
    var node={
        value:val,
        next:null
    }
    if(!this.head){
     this.head=node;
    }else {
        current=this.head
        while(current.next){
            current=current.next
        }
        current.next=node;
    }
}

let li=new LinkedList();
li.push(123);
li.push(456);
li.push(789);
console.log(li.head); */

function LinkedList(){
this.head=null;
}

LinkedList.prototype.isEmpty=function(){
 return this.head===null;
};

LinkedList.prototype.size=function(){
   let current=this.head;
   let count=0;
   while(current!==null){
    count++;
    current=current.next;
   }
   return count;
};

//add node in the begining of the list

LinkedList.prototype.prepend=function(val){
    //first create new node with val
    //make the new node to point to current head
    //update this.head to point to new node

    let newNode={
        data:val,
        next:this.head
    };
    this.head=newNode;
};
//add in the end of the list
LinkedList.prototype.append=function(val){
//create new node using val
//traverse to the end of the list
//make the last next value point to the new node
var newNode={
    data:val,
    next:null
};
if(this.isEmpty()){
 this.head=newNode; 
 return;  //return this function  
}
let current=this.head;
while(current.next!==null){
    //keep going until last node
    current=current.next;
}
current.next=newNode;

};


LinkedList.prototype.contains=function(val){
var current=this.head;
while(current!==null){
    if(current.data===val){
        return true;
    }
  //otherwise next node
  current=current.next;
}
 return false;
};

LinkedList.prototype.remove=function(val){
    if(this.contains(val)){
        return;
    }
    //here the node is first node
    //we remove the head for it, so removed
   if(this.head.data===val){
       this.head=this.head.next;
       return;
   }
   
   let prev=null;
   let curr=this.head;
   while(curr.data!==val){
       prev=curr;
       curr=curr.next;
   }
   prev.next=curr.next;


};

LinkedList.prototype.print=function(){
    let output='[';
    let current=this.head;
    while(current!==null){
        output+=current.data;
        if(current.next!==null){
            output+=',';
        }
        current=current.next;
    }
    output+=']';
    return output;
};

var list=new LinkedList();
list.append(8);
list.append(10);
list.append(11);
list.append(12);
list.prepend(13);
console.log(list.contains(1));
list.remove(10);

console.log(list.print());
console.log(list.size());