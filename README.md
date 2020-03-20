 
# NotifyMe API
 
Serviço hospedado no Heroku para teste => https://web-page-notify-api-2.herokuapp.com/
 
### O que é o NotifyMe?
 
O NotifyMe é um serviço de notificação de páginas da internet disponibilizado por meio de uma API REST, que permite que você monitore um site por atualizações e receba uma notificação sempre que o site tiver uma nova atualização.
 
O serviço é customizável a ponto de você configurar quais informações você deseja extrair do site, o template que você deseja receber a notificação e até mesmo os canais que você deseja ser notificado.
 
Possíveis canais para receber a notificação (* - pendente de criação):
* Email
* SMS *
* Facebook Messenger *
* Whatsapp *
* Telegram
* Webhook
* Web Push *
* Websocket
* PubSub *
 
### Como posso utilizar o NotifyMe?
 
O serviço permite que você monitore o conteúdo de uma página Web apenas informando a Url dessa página e sempre o serviço identificar uma mudança de conteúdo. Normalmente as páginas da web mudam com muita frequência, algumas delas, chegam a ser diferente a cada acesso (propagandas e datas)
 
Além de receber simples notificações é possível receber o conteúdo extraído da página. Caso você conheça algum pouco de Javascript, é possível executar scripts para extração e manipulação do conteúdo da página antes da obtenção das informações, desta maneira você pode extrair apenas uma parte da página se desejar.
 
A verificação do site é feita de uma forma cíclica, ou seja, de tempos em tempos o serviço acesse o site desejado para obter o conteúdo dele, é possível configurar este tempo de verificação. Assim, você pode receber o conteúdo sempre que esse ciclo ocorra, dependendo do seu propósito. Também é possível configurar o monitoramento para que você receba apenas conteúdos quando forem diferentes do conteúdo encontrado anteriormente (change) ou até mesmo conteúdos únicos.
 
### (Ideias/Exemplos)

Algumas Idéias e Exemplos de utilização:

#### Exemplo de Utilização 1
 
* Desejo monitorar uma pagina de noticias, para receber uma notificação sempre que uma nova notícia for lançada.
 
#### Exemplo de Utilização 2
 
* Desejo receber por e-mail sempre que houver uma mudança no meu site empresarial.
 
#### Exemplo de Utilização 3
 
* Sempre que houver uma lançamento de um site (Filme, Séries ...) quero que meu sistema receba uma notificação do conteúdo para que eu possa centralizar o conteúdo de diversos sites.
 
#### Exemplo de Utilização 4
 
* Gostaria de receber uma notificação no telegram sempre que surgir uma notícia ou um artigo sobre um determinado assunto.
 
#### Idéias
 
* Criar um sistema de monitoramento que verifica se o seu site ou API está em funcionamento (Health Check)
* Criar uma aplicação que sempre que você fizer uma postagem em seu site, automaticamente essa postagem é distribuída para um grupo no Telegram ou Whatsapp automatizando o processo.
* Criar uma aplicação para criar históricos de sites como se fosse um backup, basta apenas apontar para a url do site e os backup começaram a ser gerados em forma de HTML... ou Imagens...
* Criar uma API centralizadora de lançamento de Filmes
* O mesmo descrito acima para Séries
* O mesmo descrito acima para Animes
* Sempre que algo novo for publicado no site ou blog, efetua o disparo de notificações para as pessoas assinantes podendo ser por e-mail, sms, rede social, ou até mesmo notificação push
* Criar uma API centralizadora de conteúdos de Notícias
* Criar uma API centralizadora de conteúdos de Pessoas famosas
* Criar uma aplicação onde é possível cadastrar o valor desejado de um papel do mercado de ações e quando o papel atingir determinado valor, receber um aviso, executar uma compra/venda ou até mesmo um comando desejado
* Criar um sistema que sempre que lançar os animes que você assiste em um site de sua escolha, efetuar o download do anime automaticamente
 
 
 
### API

Serviço hospedado no Heroku para teste => https://web-page-notify-api-2.herokuapp.com/api/v1/

A API permite que você cadastre intenções de monitoramento, o que na documentação é chamado de requisição ou `request`, a request determina como o monitoramento será executado, qual a periodicidade, qual o alvo (Url do site), quais os scripts que serão executados no alvo, e como será efetuada a notificação após obter as informações do alvo.

Após cadastrar a intenção de monitoramento (request), quando chegar a hora de executar, será criado uma `execution`, essa execution é a operação de fato, ou seja, a aplicação irá acessar o site informado, executar os scrips informados, obter o conteudo de resposta. No futuro essa execution será utilizada para efetuar os disparos das notificações.

Existe a possibilidade de criar um usuario na aplicação, para que o usuario possa gerencias as suas próprias requests, mas tambem é possivel criar uma request anônima. Para identificação do usuário é necessário informar no header `Authentication` o Token JWT fornecido no momento da authenticação. Com a utilização de um usuario é possivel centralizar algumas operações como por exemplo, notificações e filtros. Ao cadastrar um filtro para o usuario, todas suas request irão respeitar esse filtro, exceto quando ela tiver um filtro próprio. Também é possivel cadastrar notificações para o usuario, e quando a request não tiver uma notificação própria ele utilizará a cadastrada para o usuario. 

Existe um endpoint para testar os scripts antes de cadatrar uma request, porem o endpoint é apenas para teste, ele pode demorar a responder e enfileirar as execuções.

##### Endpoints
 
    GET  -  /notify                     - Lista todas as requisições de monitoramento cadastradas
    
    POST -  /notify                     - Cadastrar uma requisição de monitoramentos
    
    POST -  /notify/:id/execute         - Executa uma requisição previamente cadastrada
    
    POST -  /execute                    - Executa uma requisição com a intenção de pré-visualizar a execução dos scripts
    
    GET  -  /execute                    - Executa uma requisição com a intenção de pré-visualizar a execução dos scripts
    
    POST -  /user                       - Efetua a criação de um usuário
    
    GET  -  /user/current               - Recupera o usuário baseado no JWT
    
    POST -  /user/login                 - Efetua a autenticação(login) do usuário
    
    POST -  /user/:id/notifications     - Adiciona uma nova notificação geral para o usuário que será utilizada para todas as requisições que não possui nenhuma notificação informada

[Documentação da API - Swagger](https://web-page-notify-api-2.herokuapp.com/api/v1/docs)
 
#### Funcionamento
 


Explicar a utilização do puppetieer, dos workers, do falback da api, das options, sobre o o filtro de similaridade, sobre a linguagem do projeto.... Sobre as integrações, sobre o usuario