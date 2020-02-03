
# WebPageNotify API

## Objetivo
	Esta aplicação tem como objetivo monitorar paginas web de uma maneira configuravel e efetuar notificações referente a pagina. 

## Cadatro
	Inicialmente você deve informar o site que será monitorado (url) e o que nessa pagina será o alvo do monitoramento. (Ex: Monitore a sessão de noticias da página)
	Para o monitoramento de uma pagina, é possivel informar um script para obter o html da pagina ou extrair qualquer outra informação por meio de scripts.

## Notificação


heroku URL: https://scraper-jquery-api.herokuapp.com/api/evaluate (POST)
heroku URL: https://scraper-jquery-api.herokuapp.com/api/hash (POST)

{
	"url": "https://horriblesubs.info",
	"options": {
		"script": "const links = []; $('.latest-releases a').each(function() { links.push($(this)[0].href) }); links;",
		"waitTime": 500,
		"importJquery": true
	}
	
}

{
	"url": "http://www.google.com"
}