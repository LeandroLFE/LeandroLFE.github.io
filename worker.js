let dateTime_tempo_atual;
let dateTime_tempo_total;
let diff_dates;
let tempo_atual;
let tempo_total;
let qtde_formato_hora;
let intervalo_loop;
let play_pause;

function converteNumeroDeUmDigitoEmNumeroComDoisDigitos(numero){
    return numero>9 ? numero : '0' + numero;
}

function add_um_segundo(dateTime_tempo){
    dateTime_tempo.setSeconds(dateTime_tempo.getSeconds() + 1)
    return dateTime_tempo
}

function monta_hora_min_seg(dateTime_tempo, tempo_array_length){
    switch(tempo_array_length){
        case 1:
            return converteNumeroDeUmDigitoEmNumeroComDoisDigitos(dateTime_tempo.getSeconds());
        case 2:
            return converteNumeroDeUmDigitoEmNumeroComDoisDigitos(dateTime_tempo.getMinutes()) + 
            ':' + 
            converteNumeroDeUmDigitoEmNumeroComDoisDigitos(dateTime_tempo.getSeconds());
        case 3:
            return converteNumeroDeUmDigitoEmNumeroComDoisDigitos(dateTime_tempo.getHours()) + 
            ':' +
            converteNumeroDeUmDigitoEmNumeroComDoisDigitos(dateTime_tempo.getMinutes()) + 
            ':' + 
            converteNumeroDeUmDigitoEmNumeroComDoisDigitos(dateTime_tempo.getSeconds());
    }
}

function interna() {
    dateTime_tempo_atual = add_um_segundo(dateTime_tempo_atual)
    diff_dates = (dateTime_tempo_total - dateTime_tempo_atual) / intervalo_loop;
    tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora);
    tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);
    postMessage({
        play_pause,
        dateTime_tempo_atual,
        tempo_atual,
        tempo_total
    })
    if (diff_dates<0){
        play_pause=false
    } else if(play_pause){
        setTimeout(function(){
            interna();
        }, intervalo_loop) 
    }
}

self.onmessage = (e) =>{
    console.log(e.data);
    play_pause = e.data.play_pause;
    dateTime_tempo_atual = e.data.dateTime_tempo_atual;
    dateTime_tempo_total = e.data.dateTime_tempo_total;
    qtde_formato_hora = e.data.qtde_formato_hora;
    intervalo_loop = e.data.intervalo_loop;
    if(play_pause){
        setTimeout(function(){
            interna();
        }, e.data.intervalo_loop);
    }    
}
