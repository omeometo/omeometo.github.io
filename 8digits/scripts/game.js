let d=new Array(8);
let pos;
const col=["#333","#363","#0F0"]

function judge(p, q, r, s){
    res = 0;
    if(p==Math.floor(r*s/10))res++;
    if(q==r*s%10)res++;
    return res;
}

function show(){
    for(let i=0;i<8;i++){
        $("#d"+i).text(d[i]);
        $("#d"+i).css("color", i==pos?"#F99":"white");
    }
    c0 = judge(d[0],d[1],d[2],d[3]);
    c1 = judge(d[2],d[3],d[4],d[5]);
    c2 = judge(d[4],d[5],d[6],d[7]);
    $("#l0").css("color", col[c0]);
    $("#l1").css("color", col[c1]);
    $("#l2").css("color", col[c2]);
    if(c0+c1+c2==6){
        $("#clear").text("Congratulations!");
    }
}

$(window).keydown(function(ev){
    key = ev.keyCode;
    if(key<37||key>40)return;
    if(key==37&&pos>0)pos--;
    if(key==39&&pos<7)pos++;
    if(key==38){
        d[pos]++;
        if(d[pos]==10)d[pos]=1;
    }
    if(key==40){
        d[pos]--;
        if(d[pos]==0)d[pos]=9;
    }
    show();
});
$(function(){
    for(let i=0;i<8;i++)d[i] = i+1;
    //for(let i=0;i<8;i++)d[i]=Math.floor(Math.random()*9)+1;
    pos = 0;
    show();
});