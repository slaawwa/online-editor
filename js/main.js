(() => {

    let MODE = 'html'
    let LS_KEY = null
    let editor = null
    
    const _destroy = () => {
        editor.off('change', update)
        editor.destroy()
    }
    
    const update = () => {
        if (editor && editor.destroy) {
            console.log(' -> UPDATE', LS_KEY)
            localStorage[LS_KEY] = editor.getValue()
            const idoc = document.getElementById('iframe').contentWindow.document
            idoc.open()
            idoc.write(localStorage[LS_KEY])
            idoc.close()
        }
    }

    const setupEditor = () => {
        
        editor = ace.edit('editor')
        window.editor = editor
        // editor.setTheme('ace/theme/monokai')
        console.log('MODE::', MODE, 'ace/theme/'+ (MODE === 'json'? 'pastel_on_dark': 'monokai'))
        editor.setTheme('ace/theme/'+ (MODE === 'html'? 'pastel_on_dark': 'monokai'))
        // editor.getSession().setMode('ace/mode/html')
        editor.getSession().setMode('ace/mode/'+MODE)
        editor.setValue(localStorage[LS_KEY] || '', 1) // 1 - moves cursor to end

        editor.getSession().on('change', update)

        editor.focus()
        editor.setOptions({
            fontFamily: 'Monaco',
            fontSize: '10pt',
            // showLineNumber: true,
            showGutter: true,
            vScrollBarAlwaysVisible: true,
            // enableBasicAutocompletion: true,
            // enableLiveAutocompletion: true,
        })
        // editor.setShowPrintMargin(false)
        // editor.setBehaviorsEnabled(false)
    }

    const _ready = (mode='html') => {

        MODE = mode

        console.log(' -> MODE:', MODE)

        LS_KEY = `ideSrc_${mode}`

        setupEditor();
        update();
    }

    document.querySelector('#htmlJsonBtn').addEventListener('click', () => {
        _destroy()
        _ready(MODE === 'html'? 'json': 'html')
    })

    window.ready = _ready
})()
