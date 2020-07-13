const $form = $('#monitor-form')
const $url = $('#url')
const $name = $('#name')
const $hitTime = $('#hitTime')
const $useJquery = $('#useJquery')
const $onlyChanged = $('#onlyChanged')
const $onlyUnique = $('#onlyUnique')
const $printscreen = $('#printscreen')
const $printscreenFullPage = $('#printscreenFullPage')
const $scriptTarget = $('#scriptTarget')
const $scriptContentList = $('.scriptContent')

const $btnAdicionarContent = $('#btnAdicionarContent')
const $btnTestar = $('#btnTestar')
const $iframePage = $('#iframe-page')

const API = 'http://iwannabenotified.ddns.net/api/v1'
// const API = 'http://localhost:9002/api/v1'

$url.blur(setUrlOnIframe)
$btnAdicionarContent.click(addNewScriptContent)
$btnTestar.click(testExecution)

function setUrlOnIframe() {
    $iframePage.attr('src', $url.val())
}

function addNewScriptContent() {
    const cloneFirst = $($scriptContentList[0]).parent().clone(true)
    cloneFirst.children().val('')
    $('.div-scriptContent').append(cloneFirst)
}

function testExecution() {
    const monit = createMonitoramento()
    sendTesteExecution(monit)
}

const sendTesteExecution = (monit) => fetch(`${API}/execute`,
		{
			method: 'POST',
			body: JSON.stringify(monit),
			headers: { 'content-type': 'application/json' }
		}
	)
	.catch(err => console.error('Erro ao executar monitoramento', err))

const createMonitoramento = () => {
    return {
        url: $url.val(),
        name: $name.val(),
        scriptTarget: $scriptTarget.val(),
        scriptContent: $scriptContentList.map((i, v) => v.value).toArray().filter(v => v),
        options: {
            hitTime: parseInt($hitTime.val().replace(/\D/g, '')),
            useJquery: $useJquery.is('checked'),
            onlyChanged: $onlyChanged.is('checked'),
            onlyUnique: $onlyUnique.is('checked'),
            printscreen: $printscreen.is('checked'),
            printscreenFullPage: $printscreenFullPage.is('checked')            
        }
    }
}