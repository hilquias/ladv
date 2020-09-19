// ===================================================================

const term = new Terminal({
    cols: 80,
    fontSize: 16,
    fontFamily: 'fixedsys, monospace',
    cursorBlink: true,
    convertEol: true,
    rendererType: 'dom',
});

// ===================================================================

const fitAddon = new FitAddon.FitAddon();

term.loadAddon(fitAddon);

window.onresize = () => {
    fitAddon.fit();
};

// ===================================================================

term.loadAddon(new WebLinksAddon.WebLinksAddon());

// ===================================================================

const echo = new LocalEchoController();

term.loadAddon(echo);

// ===================================================================

const containerElement = document.getElementById('terminal');

term.open(containerElement);

fitAddon.fit();

// ===================================================================

window.termApi = {};

window.termApi.getCols = function () {
    return new Promise((resolve, reject) => {
	resolve(term.cols);
    });
}

window.termApi.getRows = function () {
    return new Promise((resolve, reject) => {
	resolve(term.rows);
    });
}

window.termApi.prompt = function (text) {
    return echo.read(text);
};

window.termApi.write = function (text) {
    return new Promise((resolve, reject) => {
	term.write(text);
	resolve();		
    });
};

// ===================================================================
