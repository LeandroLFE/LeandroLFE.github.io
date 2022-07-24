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

function pausa_loop_execucao(){
    btn_play_pause.innerHTML = "Play";
    cor_atual = cor_vermelha
    btn_play_pause.style.backgroundColor = cor_atual
    if(loop_execucao){
        clearTimeout(loop_execucao);
    }
} 

function gera_loop_execucao(){
    return setTimeout(function interna() {
        if(play_pause){
            dateTime_tempo_atual = add_um_segundo(dateTime_tempo_atual)
            diff_dates = (dateTime_tempo_total - dateTime_tempo_atual) / intervalo_loop;
            tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora);
            tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);
            resp_atual.innerHTML = tempo_atual;
            resp_total.innerHTML = tempo_total;
            if (diff_dates<0){
                resp_atual.innerHTML = tempo_total;
                resp_total.innerHTML = tempo_total;
                play_pause = false
                pausa_loop_execucao()
            } else{
                setTimeout(interna, intervalo_loop)
            }
        } else{
            pausa_loop_execucao()
        }
    }, intervalo_loop);
}

function atribui_hora_min_seg(tempo_array){
    let dateTime_tempo = new Date("July 4 1776 00:00:00.0");
    dateTime_tempo.setHours(tempo_array[0]);
    dateTime_tempo.setMinutes(tempo_array[1]);
    dateTime_tempo.setSeconds(tempo_array[2]);
    return dateTime_tempo
}

function inicia_loop_execucao(){
    btn_play_pause.innerHTML = "Pause";
    cor_atual = cor_verde
    btn_play_pause.style.backgroundColor = cor_atual
    loop_execucao = gera_loop_execucao()
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
        espaco_resultado_interno.style.fontSize = config.tamanho_fonte_resp+"px"
        tamanho_fonte_resp_range.value = config.tamanho_fonte_resp
        tamanho_fonte_resp_num.value = config.tamanho_fonte_resp
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
    config.tamanho_fonte_resp = espaco_resultado_interno.style.fontSize?espaco_resultado_interno.style.fontSize.replace("px", ""):tamanho_fonte_resp_num.value;
    config.apenas_minuto_segundo = chk_apenas_minuto_segundo.checked;
    config.contador_automatico = chk_contador_automatico.checked;
    localStorage.setItem('config', JSON.stringify(config));
}

const select_vel_video = document.querySelector('#selectVelocidadeVideo');
const hora_atual = document.querySelector('#hour-current'); 
const separador_hora_atual = document.querySelector('#hour-current-separator'); 
const min_atual = document.querySelector('#min-current'); 
const seg_atual = document.querySelector('#sec-current');
const hora_total = document.querySelector('#hour-amount'); 
const separador_hora_total = document.querySelector('#hour-amount-separator'); 
const min_total = document.querySelector('#min-amount'); 
const seg_total = document.querySelector('#sec-amount');
const elementos_tempo = document.getElementsByClassName('time');

const resp_atual = document.querySelector('#resp-atual');
const resp_total = document.querySelector('#resp-total');
const espaco_resultado_interno = document.querySelector('.espaco-result-interno');

const btn_play_pause = document.getElementById('btn-play-pause');
const btn_reset = document.getElementById('btn-reset')
const btn_update = document.getElementById('btn-update')
const btn_save = document.getElementById('btn-save')
const btn_options = document.getElementById('btn-options')

const div_options = document.querySelector('#div-opcoes')
let exibe_div_options = false
div_options.style.display = "none"

const div_info_automatico = document.querySelector('#info-automatico');
const chk_contador_automatico = document.querySelector('#contador-automatico');
const chk_apenas_minuto_segundo = document.querySelector('#apenas-minuto-segundo');
const cor_fundo_resp = document.querySelector('#cor-fundo')
const cor_fonte_resp = document.querySelector('#cor-fonte')
const tamanho_fonte_resp_range = document.querySelector('#tamanho-fonte-range')
const tamanho_fonte_resp_num  = document.querySelector('#tamanho-fonte-num')

let cor_verde = '#00AA00';
let cor_vermelha = '#DF0000';
let cor_atual = cor_vermelha;
let cor_hover = '#C0C0C0';

let play_pause = false;
let loop_execucao;
let config = getConfig()

let modo_contador_automatico = chk_contador_automatico.checked;
if(modo_contador_automatico){
    div_info_automatico.style.display="block"
    // btn_play_pause.style.display="none"
    // btn_reset.style.display="none"
} else{
    div_info_automatico.style.display="none"
    // btn_play_pause.style.display="inline-block"
    // btn_reset.style.display="inline-block"
}

let exibe_apenas_min_e_seg = chk_apenas_minuto_segundo.checked;

tamanho_fonte_resp_num.value = tamanho_fonte_resp_range.value

btn_play_pause.style.backgroundColor = cor_vermelha

let vel_video = parseFloat(select_vel_video.value)

let tempo_inicial = [hora_atual.value ? hora_atual.value : 0, 
                    min_atual.value ? min_atual.value : 0,
                    seg_atual.value ? seg_atual.value : 0];

let tempo_atual_array = tempo_inicial;

let tempo_total_array = [hora_total.value ? hora_total.value : 0, 
                        min_total.value ? min_total.value : 0,
                        seg_total.value ? seg_total.value : 0];

let dateTime_tempo_atual = atribui_hora_min_seg(tempo_atual_array);
let dateTime_tempo_total = atribui_hora_min_seg(tempo_total_array);

let intervalo_loop = 1000.0 / vel_video;
let diff_dates = (dateTime_tempo_total - dateTime_tempo_atual) / intervalo_loop;

let qtde_formato_hora = 3;

let tempo_atual = monta_hora_min_seg(dateTime_tempo_atual, qtde_formato_hora);
let tempo_total = monta_hora_min_seg(dateTime_tempo_total, qtde_formato_hora);

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
    play_pause = !play_pause;
    if(play_pause)
        inicia_loop_execucao()
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

function testa_valor_caixa(element, limite){ 
    if(element.value<0){
        element.value = 0;
    }
    if(element.value>=limite){
        element.value = limite-1;
    }    
    element.value = String(element.value).length > 2 ? parseInt(element.value) : element.value
}

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

chk_apenas_minuto_segundo.addEventListener('input', ()=>{
    if(chk_apenas_minuto_segundo.checked){
        exibe_apenas_min_e_seg = true
    } else{
        exibe_apenas_min_e_seg = false
    }
    esconde_exibe_min_seg()
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

