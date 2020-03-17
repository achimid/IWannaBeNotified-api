
# NotifyMe API

Serviço hospedado no Heroku para teste => https://web-page-notify-api-2.herokuapp.com/

#### O que é o NotifyMe ?

O NotifyMe é um serviço de notificação de páginas da internet disponibilizado por meio de uma API REST, que permite que você monitore um site por atualizações e receba uma notificação sempre que o site for tiver uma nova atualização.

O serviço é customizável a ponto de você configurar quais informações você deseja extrair do site, o template que você deseja receber a notificação e até mesmo os canais que você deseja ser notificado. 

Possíveis canais para receber a notificação (* - pendente de criação):
* Email
* SMS *
* Facebook Menssager *
* Whatsapp *
* Telegram
* Webhook 
* Web Push *
* Websocket
* PubSub *

#### Como posso utilizar o NotifyMe (Ideias/Exemplos)?

O serviço permite que você monitore o conteudo de uma página Web apenas informando a Url dessa página e sempre o serviço identificar uma mudança de conteudo. Normalmente as páginas da web mudam com muita frequência, algumas delas, chegam a ser diferênte a cada acesso (propagandas e datas)

Além de receber simples notificações é possivel receber o conteudo extraido da página. Caso você conheça algum pouco de Javacript, é possivel executar scripts para extração e manipulação do conteudo da página antes da obtenção das informações, desta maneira você pode extrair apenas uma parte da página se desejar. 

A verificação do site é feita de uma forma ciclica, ou seja, de tempos em tempos o serviço acessa o site desejado para obter o conteúdo dele, é possível configurar este tempo de verificação. Assim, você pode receber o conteúdo sempre que esse ciclo ocorra, dependendo do seu propósido. Também é possivel configurar o monitoramente para que você receba apenas conteudos quando forem diferêntes do conteudo encontrado anteriomente (change) ou até mesmo conteudos unicos.

##### Exemplo de Utilização 1

* Desejo monitorar uma pagina de noticias, para receber uma notificação sempre que uma nova notícia for lançada.

##### Exemplo de Utilização 2

* Desejo receber por e-mail sempre que houver uma mudança no meu site empresarial.

##### Exemplo de Utilização 3

* Sempre que houver uma lançamento de um site (Filme, Séries ...) quero que meu sistema receba uma notificação do conteudo, para que eu possa centralizar o conteudo de diversos sites.

##### Exemplo de Utilização 4

* Gostaria der receber uma notificação no telegram sempre que surgir uma notícia ou um artigo sobre um determinado assunto.

##### Idéias


#### Funcionamento



#### Endpoints

