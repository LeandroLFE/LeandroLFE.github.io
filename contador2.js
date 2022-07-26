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

function esconde_exibe_min_seg(){
    if(exibe_apenas_min_e_seg){
        qtde_formato_hora = 2;
        hora_atual.style.display = "none"
        separador_hora_atual.style.display = "none"
        hora_total.style.display = "none"
        separador_hora_total.style.display = "none"
        hora_atual.value = "00";
        hora_total.value = "00";
        dateTime_tempo_atual.setHours(0);
        dateTime_tempo_total.setHours(0);
        tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora)
        tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);
        resp_atual.innerHTML = tempo_atual
        resp_total.innerHTML = tempo_total
    } else{
        qtde_formato_hora = 3;
        hora_atual.style.display = "inline-block"
        separador_hora_atual.style.display = "inline-block"
        hora_total.style.display = "inline-block"
        separador_hora_total.style.display = "inline-block"
        tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora)
        tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);
        resp_atual.innerHTML = tempo_atual
        resp_total.innerHTML = tempo_total
    }
    espaco_resultado_interno.style.width = parseInt(tamanho_fonte_resp_num.value*1+2)*(qtde_formato_hora==3?8:6) + "px" 
}

function reset_contador(){
    tempo_atual_array = tempo_inicial
    dateTime_tempo_atual = atribui_hora_min_seg(tempo_atual_array);
    diff_dates = (dateTime_tempo_total - dateTime_tempo_atual) / intervalo_loop;
    tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora);
    tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);
    resp_atual.innerHTML = tempo_atual;
    resp_total.innerHTML = tempo_total
}

function comunica_worker(){
    worker.postMessage({
        play_pause,
        dateTime_tempo_atual,
        dateTime_tempo_total,
        qtde_formato_hora,
        intervalo_loop
    })
}

function pausa_loop_execucao(){
    play_pause = false
    btn_play_pause.innerHTML = "Play";
    cor_atual = cor_vermelha
    btn_play_pause.style.backgroundColor = cor_atual
    comunica_worker()
} 

function atribui_hora_min_seg(tempo_array){
    let dateTime_tempo = new Date("July 4 1776 00:00:00.0");
    dateTime_tempo.setHours(tempo_array[0]);
    dateTime_tempo.setMinutes(tempo_array[1]);
    dateTime_tempo.setSeconds(tempo_array[2]);
    return dateTime_tempo
}

function inicia_loop_execucao(){
    play_pause = true
    btn_play_pause.innerHTML = "Pause";
    cor_atual = cor_verde
    btn_play_pause.style.backgroundColor = cor_atual
    comunica_worker()
}

/*

config = {
    hour_current: str,
    min_current : str,
    sec_current: str,
    hour_amount: str,
    min_amount: str,
    sec_amount: str,
    selectVelocidadeVideo: float,
    cor_de_fundo_resp : str,
    cor_da_fonte_resp : str,
    tamanho_fonte_resp: int,
    apenas_minuto_segundo: bool
}

*/

function getConfig(){
    let config;
    if(localStorage.getItem('config') === null){
        config = {};
    }else {
        config = JSON.parse(localStorage.getItem('config'));
        hora_atual.value = config.hour_current;
        min_atual.value = config.min_current;
        seg_atual.value = config.sec_current;
        hora_total.value = config.hour_amount;
        min_total.value = config.min_amount;
        seg_total.value = config.sec_amount;
        select_vel_video.value = config.select_vel_video; 
        espaco_resultado_interno.style.backgroundColor = config.cor_de_fundo_resp
        cor_fundo_resp.value = config.cor_de_fundo_resp
        espaco_resultado_interno.style.color = config.cor_da_fonte_resp
        cor_fonte_resp.value = config.cor_da_fonte_resp
        espaco_resultado_interno.style.fontSize = config.tamanho_fonte_resp+" px"
        tamanho_fonte_resp_range.value = config.tamanho_fonte_resp
        tamanho_fonte_resp_num.value = config.tamanho_fonte_resp
        espaco_resultado_interno.style.width = parseInt(tamanho_fonte_resp_num.value*1+2)*(qtde_formato_hora==3?8:6) + "px"  
        resp_atual.style.fontSize = tamanho_fonte_resp_num.value + "px"
        resp_total.style.fontSize = tamanho_fonte_resp_num.value + "px"
        chk_contador_automatico.checked = config.contador_automatico
        chk_apenas_minuto_segundo.checked = config.apenas_minuto_segundo
    }
    return config;
}

function setConfig(){
    config.hour_current = hora_atual.value;
    config.min_current = min_atual.value;
    config.sec_current = seg_atual.value;
    config.hour_amount = hora_total.value;
    config.min_amount = min_total.value;
    config.sec_amount = seg_total.value;
    config.select_vel_video = select_vel_video.value;
    config.cor_de_fundo_resp = cor_fundo_resp.value;
    config.cor_da_fonte_resp = cor_fonte_resp.value;
    config.tamanho_fonte_resp = tamanho_fonte_resp_num.value;
    config.apenas_minuto_segundo = chk_apenas_minuto_segundo.checked;
    config.contador_automatico = chk_contador_automatico.checked;
    localStorage.setItem('config', JSON.stringify(config));
}

function testa_valor_caixa(element, limite){ 
    if(element.value<0){
        element.value = 0;
    }
    if(element.value>=limite){
        element.value = limite-1;
    }    
    element.value = String(element.value).length > 2 ? parseInt(element.value) : element.value
}

let select_vel_video;
let hora_atual; 
let separador_hora_atual; 
let min_atual; 
let seg_atual;
let hora_total; 
let separador_hora_total; 
let min_total; 
let seg_total;
let elementos_tempo;

let resp_atual;
let resp_total;
let espaco_resultado_interno;

let btn_play_pause;
let btn_reset;
let btn_update;
let btn_save;
let btn_options;

let div_options;
let exibe_div_options;

let div_info_automatico;
let chk_contador_automatico;
let chk_apenas_minuto_segundo;
let cor_fundo_resp;
let cor_fonte_resp;
let tamanho_fonte_resp_range;
let tamanho_fonte_resp_num;

let cor_verde = '#00AA00';
let cor_vermelha = '#DF0000';
let cor_atual = cor_vermelha;
let cor_hover = '#C0C0C0';

let play_pause = false;
let loop_execucao;
let config = {}

let modo_contador_automatico;

let exibe_apenas_min_e_seg;

let vel_video;

let tempo_inicial;

let tempo_atual_array;

let tempo_total_array;

let dateTime_tempo_atual;
let dateTime_tempo_total;

let intervalo_loop;
let diff_dates;

let qtde_formato_hora;

let tempo_atual;
let tempo_total;

let worker;

function testa_valor_caixa(element, limite){ 
    if(element.value<0){
        element.value = 0;
    }
    if(element.value>=limite){
        element.value = limite-1;
    }    
    element.value = String(element.value).length > 2 ? parseInt(element.value) : element.value
}

try{
    window.onload = ()=>{
        worker = new Worker('worker.js');
        select_vel_video = document.querySelector('#selectVelocidadeVideo');
        hora_atual = document.querySelector('#hour-current'); 
        separador_hora_atual = document.querySelector('#hour-current-separator'); 
        min_atual = document.querySelector('#min-current'); 
        seg_atual = document.querySelector('#sec-current');
        hora_total = document.querySelector('#hour-amount'); 
        separador_hora_total = document.querySelector('#hour-amount-separator'); 
        min_total = document.querySelector('#min-amount'); 
        seg_total = document.querySelector('#sec-amount');
        elementos_tempo = document.getElementsByClassName('time');

        resp_atual = document.querySelector('#resp-atual');
        resp_total = document.querySelector('#resp-total');
        espaco_resultado_interno = document.querySelector('.espaco-result-interno');

        btn_play_pause = document.getElementById('btn-play-pause');
        btn_reset = document.getElementById('btn-reset')
        btn_update = document.getElementById('btn-update')
        btn_save = document.getElementById('btn-save')
        btn_options = document.getElementById('btn-options')

        div_options = document.querySelector('#div-opcoes')
        exibe_div_options = false
        div_options.style.display = "none"

        div_info_automatico = document.querySelector('#info-automatico');
        chk_contador_automatico = document.querySelector('#contador-automatico');
        chk_apenas_minuto_segundo = document.querySelector('#apenas-minuto-segundo');
        cor_fundo_resp = document.querySelector('#cor-fundo')
        cor_fonte_resp = document.querySelector('#cor-fonte')
        tamanho_fonte_resp_range = document.querySelector('#tamanho-fonte-range')
        tamanho_fonte_resp_num  = document.querySelector('#tamanho-fonte-num')

        cor_verde = '#00AA00';
        cor_vermelha = '#DF0000';
        cor_atual = cor_vermelha;
        cor_hover = '#C0C0C0';

        play_pause = false;
        config = {}
        config=getConfig()

        modo_contador_automatico = chk_contador_automatico.checked;
        if(modo_contador_automatico){
            div_info_automatico.style.display="block"
            // btn_play_pause.style.display="none"
            // btn_reset.style.display="none"
        } else{
            div_info_automatico.style.display="none"
            // btn_play_pause.style.display="inline-block"
            // btn_reset.style.display="inline-block"
        }

        exibe_apenas_min_e_seg = chk_apenas_minuto_segundo.checked;

        tamanho_fonte_resp_num.value = tamanho_fonte_resp_range.value

        btn_play_pause.style.backgroundColor = cor_vermelha

        vel_video = parseFloat(select_vel_video.value)

        tempo_inicial = [hora_atual.value ? hora_atual.value : 0, 
                            min_atual.value ? min_atual.value : 0,
                            seg_atual.value ? seg_atual.value : 0];

        tempo_atual_array = tempo_inicial;

        tempo_total_array = [hora_total.value ? hora_total.value : 0, 
                                min_total.value ? min_total.value : 0,
                                seg_total.value ? seg_total.value : 0];

        dateTime_tempo_atual = atribui_hora_min_seg(tempo_atual_array);
        dateTime_tempo_total = atribui_hora_min_seg(tempo_total_array);

        intervalo_loop = 1000.0 / vel_video;
        diff_dates = (dateTime_tempo_total - dateTime_tempo_atual) / intervalo_loop;

        qtde_formato_hora = 3;

        tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora);
        tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);

        esconde_exibe_min_seg()

        resp_atual.innerHTML = tempo_atual;
        resp_total.innerHTML = tempo_total;

        select_vel_video.addEventListener('input', () => {
            vel_video = parseFloat(select_vel_video.value)
            intervalo_loop = 1000.0 / vel_video;
            diff_dates = (dateTime_tempo_total - dateTime_tempo_atual) / intervalo_loop;
            resp_atual.innerHTML = tempo_atual;
            resp_total.innerHTML = tempo_total;
        })
        
        btn_play_pause.addEventListener("mouseenter", function( event ) {   
            btn_play_pause.style.backgroundColor = cor_hover;
        }, false);
        
        btn_play_pause.addEventListener("mouseleave", function( event ) {   
            btn_play_pause.style.backgroundColor = cor_atual;
        }, false);
        
        btn_play_pause.addEventListener('click', () => {
            if(!play_pause) inicia_loop_execucao()
            else pausa_loop_execucao()
        })  
        
        btn_reset.addEventListener('click', reset_contador)
        
        btn_update.addEventListener('click', ()=>{
            tempo_atual_array = [hora_atual.value ? hora_atual.value : 0, 
                min_atual.value ? min_atual.value : 0,
                seg_atual.value ? seg_atual.value : 0];
            tempo_total_array = [hora_total.value ? hora_total.value : 0, 
                min_total.value ? min_total.value : 0,
                seg_total.value ? seg_total.value : 0]; 
            dateTime_tempo_atual = atribui_hora_min_seg(tempo_atual_array);
            dateTime_tempo_total = atribui_hora_min_seg(tempo_total_array);
            tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora);
            tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);
            resp_atual.innerHTML = tempo_atual;
            resp_total.innerHTML = tempo_total;
        })
        
        btn_options.addEventListener('click', ()=>{
            exibe_div_options = !exibe_div_options
            div_options.style.display = exibe_div_options? 'block' : 'none' 
        })
        
        btn_save.addEventListener('click', () => {
            setConfig()
        })
        
        hora_atual.addEventListener("change", ()=>{
            testa_valor_caixa(this, 24)
        });
        
        min_atual.addEventListener("change", ()=>{
            testa_valor_caixa(this, 60)
        })
        
        seg_atual.addEventListener("change", ()=>{
            testa_valor_caixa(this, 60)
        })
        
        hora_total.addEventListener("change", ()=>{
            testa_valor_caixa(this, 24)
        });
        
        min_total.addEventListener("change", ()=>{
            testa_valor_caixa(this, 60)
        })
        
        seg_total.addEventListener("change", ()=>{
            testa_valor_caixa(this, 60)
        })

        chk_apenas_minuto_segundo.addEventListener('input', ()=>{
            if(chk_apenas_minuto_segundo.checked){
                exibe_apenas_min_e_seg = true
            } else{
                exibe_apenas_min_e_seg = false
            }
            esconde_exibe_min_seg()
        })
        
        chk_contador_automatico.addEventListener('input', ()=>{
            modo_contador_automatico = chk_contador_automatico.checked
            if(modo_contador_automatico){
                div_info_automatico.style.display="block"
                // btn_play_pause.style.display="none"
                // btn_reset.style.display="none"
            } else{
                div_info_automatico.style.display="none"
                // btn_play_pause.style.display="inline-block"
                // btn_reset.style.display="inline-block"
            }
            reset_contador()
        })

        cor_fundo_resp.addEventListener('input', ()=>{
            espaco_resultado_interno.style.backgroundColor = cor_fundo_resp.value;
        })
        
        cor_fonte_resp.addEventListener('input', () =>{
            espaco_resultado_interno.style.color = cor_fonte_resp.value;
        })
        
        tamanho_fonte_resp_range.addEventListener('input', ()=>{    
            tamanho_fonte_resp_num.value = tamanho_fonte_resp_range.value
            espaco_resultado_interno.style.fontSize = tamanho_fonte_resp_num.value + "px"
            espaco_resultado_interno.style.width = parseInt(tamanho_fonte_resp_num.value*1+2)*(qtde_formato_hora==3?8:6) + "px"  
            resp_atual.style.fontSize = tamanho_fonte_resp_num.value + "px"
            resp_total.style.fontSize = tamanho_fonte_resp_num.value + "px"
        
        })
        
        tamanho_fonte_resp_num.addEventListener('input', () => {
            espaco_resultado_interno.style.width = parseInt(tamanho_fonte_resp_num.value*1+2)*(qtde_formato_hora==3?8:6) + "px" 
            tamanho_fonte_resp_range.value = tamanho_fonte_resp_num.value
            resp_atual.style.fontSize = tamanho_fonte_resp_num.value + "px"
            resp_total.style.fontSize = tamanho_fonte_resp_num.value + "px"
        })
        
        worker.onmessage = function(e){
            console.log(e.data);
            play_pause = e.data.play_pause
            tempo_atual = e.data.tempo_atual
            dateTime_tempo_atual = e.data.dateTime_tempo_atual      
            if (!play_pause){
                pausa_loop_execucao()
            } else{
                resp_atual.innerHTML = tempo_atual;
                resp_total.innerHTML = tempo_total;
            }
        }
    }
} catch(err){
    console.log(err);
}