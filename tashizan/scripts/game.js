const dur_pre=3, dur_last=10;
const n_q=3;
let dur_game=30;
let gamemode;
let timer;
let time;
let score;

let ans=new Array(n_q);
let inp;

function is_valid(num, pos){
    switch(gamemode){
        case 1:
            return num>=1;
        case 2:
            return num>=1 || pos%2==1;
        default:
            throw new Error("invalid gamemode" + gamemode);
    }
}

function to_eqn(s, ans){
    s_pad = s.padEnd(len_ans(), "_");
    switch(gamemode){
        case 1:
            return s_pad[0] + " + " + s_pad[1] + " = " + ans;
        case 2:
            return s_pad[0] + s_pad[1] + " + " + s_pad[2] + s_pad[3] + " = " + ans;
        default:
            throw new Error("invalid gamemode" + gamemode);
    }
}

function len_ans(){
    switch(gamemode){
        case 1:
            return 2;
        case 2:
            return 4;
        default:
            throw new Error("invalid gamemode" + gamemode);
    }
}

function random_ans(){
    switch(gamemode){
        case 1:
            return Math.floor(Math.random()*17)+2;
        case 2:
            return Math.floor(Math.random()*179)+20;
        default:
            throw new Error("invalid gamemode" + gamemode);
    }
}

function show_time(){
    if(time<=dur_game){
        $("#countdown").css("color", time<=dur_last?"#C99":"#CCC");
        $("#countdown").text(time)
    }else{
        $("#countdown").css("color", "#C99");
        $("#countdown").text(time-dur_game);
    }
}

function hide_gameinfo(){
    $("#cur_equation").text("");
    $("#prev_equation").text("");
    $("#score").text("");
}

function show_eqn(){
    let txt="";
    for(let i=0;i<n_q;i++){
        txt += to_eqn(i==0?inp:"", ans[i])+"<br>";
    }
    $("#cur_equation").html(txt);
}

function show_score(){
    $("#score").text(score+" pt")
}

function start_game(){
    for(let i=0;i<n_q;i++){
        for(;;){
            ans[i] = random_ans();
            if(i==0 || ans[i]!=ans[i-1])break;
        }
    }
    inp = "";
    
    show_eqn();
    show_score();
}

function game_initialize(mode){
    gamemode=mode;
    if(mode==1){$("#equations").css("font-size", "32px"); dur_game=30;}
    if(mode==2){$("#equations").css("font-size", "24px"); dur_game=40;}

    clearInterval(timer);
    score = 0;
    time = dur_pre + dur_game;
    hide_gameinfo();
    show_time();
    timer = setInterval(function(){
        if(time<=0){
            clearInterval(timer);
        }else{
            time--;
            if(time==dur_game)start_game();
            show_time();
        }
    }, 1000);
}

function push_number(num){
    if(time==0 || time>dur_game)return;
    if(is_valid(num, inp.length))inp += num;
    if(inp.length==len_ans()){
        eqn = to_eqn(inp, ans[0]);
        ok = eval(eqn.replace("=", "=="));
        if(ok){
            score++;
        }else{
            score--;
        }
        show_score();

        for(let i=0;i<n_q-1;i++)ans[i] = ans[i+1];
        for(;;){
            ans[n_q-1] = random_ans();
            if(ans[n_q-1]!=ans[n_q-2])break;
        }
        inp = "";
        $("#prev_equation").css("color", ok?"#666":"#600");
        $("#prev_equation").text(eqn);
    }
    show_eqn();
}

$(window).keydown(function(ev){
    key = ev.keyCode;
    if(key==13){ // Enter
        game_initialize(1);
    }
    if(key==90){ // Z
        game_initialize(2);
    }
    if(key>=48 && key<58)push_number(key-48);
    if(key>=96 && key<106)push_number(key-96);
});

