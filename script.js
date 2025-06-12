document.addEventListener('DOMContentLoaded', function() {
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        // Formata como (00) 00000-0000
        if (value.length > 2) {
            value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
            value = `${value.substring(0, 10)}-${value.substring(10)}`;
        }
        
        e.target.value = value;
    });

    // Formulário de agendamento
    document.getElementById('agendamentoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter valores do formulário
        const nome = document.getElementById('nome').value.trim();
        const servico = document.getElementById('servico').value;
        const datahora = document.getElementById('datahora').value;
        let telefone = document.getElementById('telefone').value;
        const mensagemAdicional = document.getElementById('mensagem').value.trim();
        
        // Validar telefone (pelo menos 11 dígitos)
        const apenasNumeros = telefone.replace(/\D/g, '');
        if (apenasNumeros.length < 11) {
            alert('Por favor, insira um número de WhatsApp válido com DDD');
            return;
        }
        
        // Formatar data e hora
        const dataFormatada = formatarDataHora(datahora);
        
        // Criar mensagem para WhatsApp
        let mensagem = `Olá, meu nome é ${nome}.\n`;
        mensagem += `Gostaria de agendar ${servico} para ${dataFormatada}.\n`;
        
        if (mensagemAdicional) {
            mensagem += `\nMensagem adicional: ${mensagemAdicional}\n`;
        }
        
        mensagem += `\n*Este agendamento foi feito através do site*`;
        
        // Número do contratado (substitua pelo número real)
        // Formato: 55DDDNUMERO (sem espaços, parênteses ou traço)
        const numeroContratado = '+5521993776791'; // Substitua pelo número real
        
        // Codificar mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Abrir WhatsApp
        window.open(`https://wa.me/${+5521993776791}?text=${mensagemCodificada}`, '_blank');
        
        // Opcional: Limpar formulário após envio
        // e.target.reset();
    });
    
    // Função para formatar data e hora
    function formatarDataHora(datahora) {
        if (!datahora) return '';
        
        const [data, hora] = datahora.split('T');
        const [ano, mes, dia] = data.split('-');
        const [horas, minutos] = hora.split(':');
        
        return `${dia}/${mes}/${ano} às ${horas}h${minutos}`;
    }
});
